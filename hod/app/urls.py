from django.urls import path
from .views import HODCoordinatorListCreateView, HODCoordinatorDetailView

urlpatterns = [
    # List all HOD/Coordinators and create a new one
    path('hodcoordinators/', HODCoordinatorListCreateView.as_view()),

    # Retrieve, update, and delete a specific HOD/Coordinator
    path('hodcoordinators/<int:pk>/', HODCoordinatorDetailView.as_view()),
]
