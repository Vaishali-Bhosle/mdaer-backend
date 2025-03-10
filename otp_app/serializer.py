from rest_framework import serializers
from .models import OTP

class SendOTPSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=100)

class VerifyOTPSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=100)
    otp_code = serializers.CharField(max_length=6)
