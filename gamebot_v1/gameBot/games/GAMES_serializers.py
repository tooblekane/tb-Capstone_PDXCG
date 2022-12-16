from rest_framework import serializers
# from movies.models import Movie
from users.models import CustomUser

# class NestedMovieSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Movie
#         fields = ('id', 'title', 'genre', 'year', 'addedBy', 'onNetflix', 'onHulu', 'onAmazon', 'onMAX', 'cover',)

class NestedUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('username', 'first_name', 'last_name', 'email', 'country', 'has_steam', 'has_epic')

# class MovieSerializer(serializers.ModelSerializer):
#     addedBy_detail = NestedUserSerializer(read_only=True, source='addedBy')
#     class Meta:
#         model = Movie
#         fields = ('id', 'title', 'genre', 'year', 'addedBy', 'addedBy_detail', 'onNetflix', 'onHulu', 'onAmazon', 'onMAX', 'cover',)

class UserSerializer(serializers.ModelSerializer):
    # movie_detail = NestedMovieSerializer(many=True, source='movies', read_only=True)
    class Meta:
        model = CustomUser
        fields = ('username', 'first_name', 'last_name', 'email', 'country', 'has_steam', 'has_epic')