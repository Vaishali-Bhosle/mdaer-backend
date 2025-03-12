from django.urls import path
from .views import *

urlpatterns=[
    path('register/', RegisterUserView.as_view(), name='register'),
    path('login/',UserLogin.as_view(), name='user-login'),
    path('update/<str:username>/', UpdateUserView.as_view(), name='update-user'),
    path('send-otp/', SendOTP.as_view(), name='send-otp'),
    path('verify-otp/', VerifyOTP.as_view(), name='verify-otp'),
]