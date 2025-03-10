import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone


class UserRole(models.TextChoices):
    ADMIN = 'admin', 'Admin'
    REGULATOR = 'regulator', 'Regulator'
    MANUFACTURER = 'manufacturer', 'Manufacturer'
    COORDINATOR = 'coordinator', 'Coordinator'
    HOD = 'hod', 'HOD'
    HEALTHCARE_PROFESSIONAL = 'healthcare_professional', 'Healthcare Professional'
    PATIENT = 'patient', 'Patient'
    CONSUMER = 'consumer', 'Consumer'
    
class Organization(models.Model):
    """Organization model for healthcare facilities, manufacturers, etc."""
    uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    name = models.CharField(max_length=100)
    org_type = models.CharField(max_length=50)  # hospital, manufacturer, regulatory body
    license_number = models.CharField(max_length=50, blank=True, null=True, unique=True)
    street_address = models.TextField(blank=True, null=True)
    city = models.CharField(max_length=50, blank=True, null=True)
    state = models.CharField(max_length=50, blank=True, null=True)
    country = models.CharField(max_length=50)
    postal_code = models.CharField(max_length=20, blank=True, null=True)
    contact_email = models.EmailField(max_length=120, blank=True, null=True)
    contact_phone = models.CharField(max_length=20, blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'organizations'

class User(models.Model):
    """Extended User model with role-based access control"""
    uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    role = models.CharField(max_length=50, choices=UserRole.choices, default=UserRole.CONSUMER)
    username = models.CharField(max_length=50, unique=True)
    email = models.EmailField(max_length=120, unique=True,blank=True, null=True)
    password = models.CharField(max_length=255)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50,blank=True, null=True)
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE, null=True, blank=True, related_name='users')
    gender = models.CharField(max_length=20)
    phone_number = models.CharField(max_length=20)
    last_login = models.JSONField(blank=True, null=True) 
    created_at = models.DateTimeField(default=timezone.now)
    is_verified = models.BooleanField(default=False)

    class Meta:
        db_table = 'users'

