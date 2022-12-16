from django.urls import path
from rest_framework.routers import DefaultRouter
from . import views
# from django.conf import settings
# from django.conf.urls.static import static

router = DefaultRouter()
router.register('wishlist', views.PostWishlistSet, basename='wishlist')

urlpatterns = router.urls + [
]