from rest_framework import serializers
from .models import HODCoordinator

class HODCoordinatorSerializer(serializers.ModelSerializer):
    class Meta:
        model = HODCoordinator
        fields = '__all__'
