from django.urls import path
from .views import UpdateUserDetails

urlpatterns = [
    path('update-details/', UpdateUserDetails.as_view(), name='update-details'),
]
