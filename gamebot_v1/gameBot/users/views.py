from django.shortcuts import render, get_object_or_404
from rest_framework import generics, viewsets
from django.views.generic.edit import CreateView
from django.views.generic import DetailView
from django.contrib.auth.models import User
from django.urls import reverse_lazy
from users.models import CustomUser, Wishlist
from api.serializers import UserSerializer, WishlistSerializer
from api.permissions import IsAuthorOrReadOnly
from .forms import CustomUserCreationForm, CustomUserChangeForm
from django.contrib.auth.decorators import login_required
from users.models import Wishlist
from django.http import HttpResponseRedirect


class SignUpView(CreateView):
    form_class = CustomUserCreationForm
    template_name = 'registration/signup.html'
    success_url = reverse_lazy('login')

class CurrentUserView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    def get_object(self):
        return self.request.user

class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = CustomUser
    serializer_class = UserSerializer
    permission_classes = [IsAuthorOrReadOnly]

class UserProfileView(DetailView):
    model = CustomUser
    template_name = 'user_profile.html'
    context_object_name = 'user_profile'
    
    def get_object(self):
        return get_object_or_404(CustomUser, username=self.kwargs['username'])

class CurrentUserWishlistView(generics.RetrieveUpdateAPIView):
    queryset = Wishlist
    serializer_class = WishlistSerializer
    def get_object(self):
        # return self.request.user
        return get_object_or_404(Wishlist, user=self.kwargs['wishlist_owner'])