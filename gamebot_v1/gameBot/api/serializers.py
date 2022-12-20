from rest_framework import serializers
from users.models import CustomUser, Wishlist

class NestedWishlistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wishlist
        fields = ('wishlist_item_id', 'wishlist_owner', 'wishlist_game_name', 'wishlist_game_steamID')

class NestedUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'first_name', 'last_name', 'email', 'country', 'has_steam', 'has_epic')

class WishlistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wishlist
        fields = ('wishlist_item_id', 'wishlist_owner', 'wishlist_game_name', 'wishlist_game_steamID')

class UserSerializer(serializers.ModelSerializer):
    # movie_detail = NestedMovieSerializer(many=True, source='movies', read_only=True)
    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'first_name', 'last_name', 'email', 'country', 'has_steam', 'has_epic')