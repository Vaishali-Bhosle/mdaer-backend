from rest_framework import serializers
from .models import UserUserDetails

class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserUserDetails
        fields = ["username", "email", "organization"]  # Ensure username is included for updates

    def validate(self, data):
        """
        Ensure non-Patients provide an organization.
        """
        user = self.instance  # The user object being updated
        role = getattr(user, "role", "").lower()  # Ensure role exists & compare case-insensitively

        if role != "patient" and not data.get("organization"):
            raise serializers.ValidationError({"organization": "Organization is required for non-patients."})

        return data
