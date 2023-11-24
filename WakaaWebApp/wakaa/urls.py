 # urls.py

from django.urls import path
from .views import custom_user_login_view

urlpatterns = [
    # Login Urls
    path('users/login', custom_user_login_view, name="user-login"),
]

