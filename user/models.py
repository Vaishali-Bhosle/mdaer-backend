from django.db import models

class UserUserDetails(models.Model):
    ROLE_CHOICES = [
        ('Patient', 'Patient'),
        ('Coordinator', 'Coordinator'),
        ('HCP', 'HCP'),
    ]

    role = models.CharField(max_length=50, choices=ROLE_CHOICES)
    username = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=255)
    phone_no = models.CharField(max_length=15, unique=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    gender = models.CharField(max_length=10)
    email = models.EmailField(unique=True, null=True, blank=True)
    organization = models.CharField(max_length=255, null=True, blank=True)  # Optional for Patients

    def __str__(self):
        return self.username
