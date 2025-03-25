from django.urls import path
from .views import *

urlpatterns=[
path('signin',SignIn.as_view(), name='user-login'),
path('signup',SignUp.as_view(), name='user-register'),
path('signout',Signout.as_view(), name='user-logout'),
path('profile',Profile.as_view(), name='user-profile'),
path('forgot-password',ForgotPassword.as_view(), name='user-forgot-password'),
path('send-otp',SendOTP.as_view(), name='user-send-otp'),
path('verify-otp',VerifyOTP.as_view(), name='user-verify-otp'),

]