from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.hashers import make_password
from .models import User, Organization
from .serializers import UserSerializer, UserUpdateSerializer

from django.shortcuts import get_object_or_404

class RegisterUserView(APIView):
    """
    API for user registration
    """

    def post(self, request):
        try:
            data = request.data
            if User.objects.filter(username=data.get('username')).exists():
                return Response({"error": "Username already exists"}, status=status.HTTP_400_BAD_REQUEST)

            if User.objects.filter(email=data.get('email')).exists():
                return Response({"error": "Email already exists"}, status=status.HTTP_400_BAD_REQUEST)

            data['password'] = make_password(data['password'])  # Hash password before saving
            serializer = UserSerializer(data=data)

            if serializer.is_valid():
                serializer.save()
                return Response({"message": "User registered successfully", "user": serializer.data}, status=status.HTTP_201_CREATED)
            
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response({"error": f"An error occurred: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class UpdateUserView(APIView):
    def put(self, request, username):
        user = get_object_or_404(User, username=username)
        serializer = UserUpdateSerializer(user, data=request.data, partial=True)
        
        if serializer.is_valid():
            serializer.save()
            
            updated_fields = {}
            for field in request.data:
                if field in serializer.validated_data and request.data[field] is not None:
                    updated_fields[field] = serializer.validated_data[field]

            return Response({
                "message": "User updated successfully",
                "user": updated_fields
            }, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Create your views here.
