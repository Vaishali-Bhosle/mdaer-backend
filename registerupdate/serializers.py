from rest_framework import serializers
from .models import User, Organization

class UserSerializer(serializers.ModelSerializer):
    organization = serializers.CharField(required=False, allow_null=True)  # Changed to CharField

    class Meta:
        model = User
        fields = '__all__'

    def validate_organization(self, value):
        """Ensure the provided organization name exists in the database."""
        if value:
            try:
                return Organization.objects.get(name=value)  # Fetch by name
            except Organization.DoesNotExist:
                raise serializers.ValidationError(f"Organization '{value}' does not exist.")
        return None  # Allow null values

    def create(self, validated_data):
        """Assign organization as an object instead of a string."""
        organization_name = validated_data.pop('organization', None)
        if organization_name:
            validated_data['organization'] = Organization.objects.get(name=organization_name)
        return super().create(validated_data)

    def update(self, instance, validated_data):
        """Update organization as an object instead of a string."""
        organization_name = validated_data.get('organization')
        if organization_name:
            try:
                instance.organization = Organization.objects.get(name=organization_name)
            except Organization.DoesNotExist:
                raise serializers.ValidationError(f"Organization '{organization_name}' does not exist.")

        return super().update(instance, validated_data)


class UserUpdateSerializer(serializers.ModelSerializer):
    """Serializer for updating user details"""
    organization = serializers.CharField(required=False, allow_null=True)  # Changed to CharField

    class Meta:
        model = User
        fields = ['email', 'organization']  # Allow updating email and organization only

    def validate_organization(self, value):
        """Ensure the provided organization name exists in the database."""
        if value:
            try:
                return Organization.objects.get(name=value)  # Fetch by name
            except Organization.DoesNotExist:
                raise serializers.ValidationError(f"Organization '{value}' does not exist.")
        return None  # Allow null values
