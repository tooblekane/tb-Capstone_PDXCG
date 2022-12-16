from rest_framework import serializers
from users.models import CustomUser, Wishlist

class NestedWishlistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wishlist
        fields = ('user', 'wishlist_name', 'wishlist_steamID')

class WishlistSerializer(serializers.ModelSerializer):
    # movie_detail = NestedMovieSerializer(many=True, source='movies', read_only=True)
    class Meta:
        model = Wishlist
        fields = ('user', 'wishlist_name', 'wishlist_steamID')