from django.db import models

class OTPModel(models.Model):
    username = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=15)
    otp = models.CharField(max_length=6)
    