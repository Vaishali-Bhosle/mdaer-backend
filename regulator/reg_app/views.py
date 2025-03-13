from rest_framework import generics
from .models import MedicalDevice
from .serializers import MedicalDeviceSerializer

# List and Create Medical Devices
class MedicalDeviceListCreateView(generics.ListCreateAPIView):
    queryset = MedicalDevice.objects.all()
    serializer_class = MedicalDeviceSerializer

# Retrieve, Update, and Delete a Medical Device
class MedicalDeviceDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = MedicalDevice.objects.all()
    serializer_class = MedicalDeviceSerializer
