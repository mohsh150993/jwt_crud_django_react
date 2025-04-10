from django.urls import path
from .views import hello_world, RegisterView, LoginView, LogoutView, ProfileView
from rest_framework_simplejwt.views import TokenRefreshView,TokenObtainPairView

urlpatterns = [
    path('hello/', hello_world),

    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('me/', ProfileView.as_view(), name='profile'),

    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]

