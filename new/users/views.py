from rest_framework import generics
from .models import User
from .serializers import UserSerializer


class UserCreateView(generics.CreateAPIView):
    """Create a new user"""
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserListView(generics.ListAPIView):
    """List all users"""
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserDetailView(generics.RetrieveAPIView):
    """Retrieve a specific user"""
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserUpdateView(generics.UpdateAPIView):
    """Update user details"""
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserDeleteView(generics.DestroyAPIView):
    """Delete a user"""
    queryset = User.objects.all()
    serializer_class = UserSerializer
