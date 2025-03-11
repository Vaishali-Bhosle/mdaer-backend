from rest_framework.permissions import BasePermission

class IsUserOrReadOnly(BasePermission):
    """
    Custom permission to allow only users to update their own profile.
    """

    def has_object_permission(self, request, view, obj):
        return obj.username == request.user.username
