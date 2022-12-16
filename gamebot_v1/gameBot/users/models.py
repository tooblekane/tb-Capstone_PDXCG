from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    username = models.CharField(max_length=50, unique=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField(max_length=254)
    country = models.CharField(max_length=50)
    has_steam = models.BooleanField(default=False)
    has_epic = models.BooleanField(default=False)
    # wishlist = models.ManyToManyField(CustomUser, related_name='wishlist', blank=True)
    
    def __str__(self):
        return self.username

class Wishlist(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="wishlist", null=True)
    wishlist_name = models.CharField(max_length=50, unique=True, null=True)
    wishlist_steamID = models.CharField(max_length=50, unique=True, null=True)

    def __str__(self):
        return self.wishlist_name