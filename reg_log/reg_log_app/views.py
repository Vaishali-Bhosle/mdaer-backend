from django.shortcuts import get_object_or_404, render
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.hashers import make_password
from django.utils.crypto import get_random_string
from django.conf import settings
from twilio.rest import Client
from rest_framework.parsers import JSONParser
from .models import *
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

class UserLogin(APIView):
     def post(self,request):
        try:
            username = request.data.get('username')
            password = request.data.get('password')
            #Validate
            try:
                user=authenticate(username=username, password=password)
            except User.DoesNotExist:
                return Response({"Message": "User does not exist"},status=status.HTTP_404_NOT_FOUND )
            user_Serializer=UserSerializer(user)
            print(user_Serializer)
            print("user", user)
            if user_Serializer.is_valid:
                # user_Serializer.save()
                return Response({"Message": 'User LOGGED IN Successfully'}, status=status.HTTP_200_OK)
            else:
                return Response({"Message": user_Serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"Message": str(e)}, status=status.HTTP_400_BAD_REQUEST)

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
    



# Twilio Setup
account_sid = 'AC33e077ce8a480e2b36b075fa54c443e4'
auth_token = '7bbc625c7fe2419212e74f50a3a1c139'
twilio_phone_number = '+18064244611'

client = Client(account_sid, auth_token)

class SendOTP(APIView):
    parser_classes = [JSONParser]

    def post(self, request):
        username = request.data.get('username')
        phone_number = request.data.get('phone_number')

        if not username:
            return Response({'error': 'Username is required'}, status=status.HTTP_400_BAD_REQUEST)

        if not phone_number:
            return Response({'error': 'Phone number is required'}, status=status.HTTP_400_BAD_REQUEST)

        otp = get_random_string(length=6, allowed_chars='1234567890')

        # Send OTP through Twilio
        message = client.messages.create(
            body=f'Your OTP is: {otp}',
            from_=twilio_phone_number,
            to=phone_number
        )

        # Save OTP in the database
        OTPModel.objects.create(username=username, phone_number=phone_number, otp=otp)

        return Response({'message': f'OTP sent successfully to {phone_number}'}, status=status.HTTP_200_OK)

class VerifyOTP(APIView):
    def post(self, request):
        username = request.data.get('username')
        otp = request.data.get('otp')

        if not username or not otp:
            return Response({'error': 'Username and OTP are required'}, status=status.HTTP_400_BAD_REQUEST)

        # ✅ First check if the username exists
        if not OTPModel.objects.filter(username=username).exists():
            return Response({'error': 'Invalid username'}, status=status.HTTP_400_BAD_REQUEST)

        # ✅ Now check if OTP matches
        try:
            otp_obj = OTPModel.objects.get(username=username, otp=otp)
            otp_obj.delete()  # ✅ Delete OTP after successful verification
            return Response({'message': 'Verified successfully'}, status=status.HTTP_200_OK)
        except OTPModel.DoesNotExist:
            return Response({'error': 'Incorrect OTP'}, status=status.HTTP_400_BAD_REQUEST)


# models.py

# urls.py