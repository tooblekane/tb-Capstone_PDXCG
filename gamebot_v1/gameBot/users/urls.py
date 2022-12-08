from . import views
from .views import SignUpView, UserProfileView
from django.urls import path
from rest_framework.routers import DefaultRouter

app_name = 'users'

router = DefaultRouter()
router.register('users', views.UserViewSet, basename='users')

urlpatterns = [
    path('signup/', SignUpView.as_view(), name='signup'),
    path('currentuser/', views.CurrentUserView.as_view()),
    path('<str:username>/', UserProfileView.as_view(), name='profile')
]