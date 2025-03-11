from django.urls import path
from .views import RegisterUserView, UpdateUserView

urlpatterns = [
    path('register/', RegisterUserView.as_view(), name='register'),
    path('update/<str:username>/', UpdateUserView.as_view(), name='update-user'),
]