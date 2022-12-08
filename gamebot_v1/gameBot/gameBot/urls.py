from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from games import views
from rest_framework.routers import DefaultRouter

app_name = 'gameBot'

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('games.urls')),
    path('users/', include('django.contrib.auth.urls')),
    path('users/', include('users.urls')),
    path('', TemplateView.as_view(template_name='home.html'), name='home'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
