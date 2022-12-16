from django.shortcuts import render
from users.models import CustomUser, Wishlist
from .serializers import WishlistSerializer
from rest_framework import generics, viewsets, permissions

class PostWishlistSet(viewsets.ModelViewSet):
    queryset = Wishlist.objects.all()
    serializer_class = WishlistSerializer

# class MovieAPIView(generics.ListAPIView):
#     queryset = Movie.objects.all()
#     serializer_class = MovieSerializer

