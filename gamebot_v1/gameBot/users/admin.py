from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .forms import CustomUserCreationForm, CustomUserChangeForm, WishlistCreationForm, WishlistChangeForm
from .models import CustomUser, Wishlist

class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = CustomUser
    list_display = ['username', 'first_name', 'last_name', 'email', 'country', 'has_steam', 'has_epic']

class WishlistAdmin(UserAdmin):
    add_form = WishlistCreationForm
    form = WishlistChangeForm
    model = Wishlist
    list_display = ['user', 'wishlist_name', 'wishlist_steamID']

admin.site.register(CustomUser, CustomUserAdmin)
# admin.site.register(Wishlist, WishlistAdmin)