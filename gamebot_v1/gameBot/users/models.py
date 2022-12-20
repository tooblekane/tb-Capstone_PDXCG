from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=50, unique=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField(max_length=254)
    country = models.CharField(max_length=50)
    has_steam = models.BooleanField(default=False)
    has_epic = models.BooleanField(default=False)
    # wishlist = models.ForeignKey(Wishlist, related_name="wishlist")
    
    def __str__(self):
        return self.username

class Wishlist(models.Model):
    # user = models.ManyToManyField(CustomUser, related_name="wishlist")
    wishlist_item_id = models.AutoField(primary_key=True)
    wishlist_owner = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="wishlist", null=True)
    wishlist_game_name = models.CharField(max_length=50, null=True)
    wishlist_game_steamID = models.CharField(max_length=50, null=True)

    def __str__(self):
        return f'{self.wishlist_owner} - {self.wishlist_game_name}'