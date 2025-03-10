from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.utils.crypto import get_random_string
from django.conf import settings
from twilio.rest import Client
from rest_framework.parsers import JSONParser
from .models import OTPModel

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
