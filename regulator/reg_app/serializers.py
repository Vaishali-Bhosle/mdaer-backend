from rest_framework import serializers
from .models import MedicalDevice  # Remove AdverseEvent

class MedicalDeviceSerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicalDevice
        fields = '__all__'
