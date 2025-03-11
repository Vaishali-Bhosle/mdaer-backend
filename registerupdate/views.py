from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.hashers import make_password
from .models import User, Organization
from .serializers import UserSerializer, UserUpdateSerializer


class RegisterUserView(APIView):
    """
    API for user registration
    """

    def post(self, request):
        try:
            data = request.data
            username = data.get('username')
            email = data.get('email')

            if User.objects.filter(username=username).exists():
                return Response({"error": "Username already exists"}, status=status.HTTP_400_BAD_REQUEST)

            if User.objects.filter(email=email).exists():
                return Response({"error": "Email already exists"}, status=status.HTTP_400_BAD_REQUEST)

            # Convert organization UUID to object
            organization_uuid = data.get('organization')
            if organization_uuid:
                try:
                    organization = Organization.objects.get(uuid=organization_uuid)
                    data['organization'] = organization.uuid  # Store as a UUID
                except Organization.DoesNotExist:
                    return Response({"error": "Organization with this UUID does not exist."}, status=status.HTTP_400_BAD_REQUEST)

            data['password'] = make_password(data['password'])  # Hash password before saving
            serializer = UserSerializer(data=data)

            if serializer.is_valid():
                serializer.save()
                return Response({"message": "User registered successfully", "user": serializer.data}, status=status.HTTP_201_CREATED)

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response({"error": f"An error occurred: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class UpdateUserView(APIView):
    """
    API for updating user details
    """

    def put(self, request, username):
        user = get_object_or_404(User, username=username)
        data = request.data

        # Convert organization UUID to object if provided
        
        if 'organization' in data:
            organization_name = data['organization']
            if organization_name:  
                try:
                    org_instance = Organization.objects.get(name=organization_name)
                    data['organization'] = org_instance.name  # Keep it as a string
                except Organization.DoesNotExist:
                 return Response({"error": f"Organization '{organization_name}' does not exist."}, status=status.HTTP_400_BAD_REQUEST)

        serializer = UserUpdateSerializer(user, data=data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User updated successfully", "user": serializer.data}, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
