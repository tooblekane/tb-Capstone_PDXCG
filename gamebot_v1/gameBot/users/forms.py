from django import forms
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from .models import CustomUser, Wishlist

class CustomUserCreationForm(UserCreationForm):
    class Meta:
        model = CustomUser
        fields = ('username', 'first_name', 'last_name', 'email', 'country', 'has_steam', 'has_epic')

class CustomUserChangeForm(UserChangeForm):
    class Meta:
        model = CustomUser
        fields = ('username', 'first_name', 'last_name', 'email', 'country', 'has_steam', 'has_epic')

class WishlistCreationForm(UserCreationForm):
    class Meta:
        model = Wishlist
        fields = ('user', 'wishlist_name', 'wishlist_steamID')

class WishlistChangeForm(UserChangeForm):
    class Meta:
        model = Wishlist
        fields = ('user', 'wishlist_name', 'wishlist_steamID')