from rest_framework import serializers
from users.models import CustomUser, Wishlist

class NestedWishlistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wishlist
        fields = ('user', 'wishlist_name', 'wishlist_steamID')

class NestedUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('username', 'first_name', 'last_name', 'email', 'country', 'has_steam', 'has_epic')

class WishlistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wishlist
        fields = ('user', 'wishlist_name', 'wishlist_steamID')

class UserSerializer(serializers.ModelSerializer):
    # movie_detail = NestedMovieSerializer(many=True, source='movies', read_only=True)
    class Meta:
        model = CustomUser
        fields = ('username', 'first_name', 'last_name', 'email', 'country', 'has_steam', 'has_epic')