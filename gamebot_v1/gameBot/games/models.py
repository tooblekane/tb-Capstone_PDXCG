from django.db import models
from users.models import CustomUser

class Game(models.Model):
    title = models.CharField(max_length=200, blank=False)
    description = models.TextField(null=True)
    addedBy = models.ForeignKey(CustomUser, related_name="games", on_delete=models.CASCADE)

    def __str__(self):
        return self.title
    
    
# year = models.CharField(max_length=4)
# cover = models.ImageField(upload_to ='covers', blank=True, null=True)