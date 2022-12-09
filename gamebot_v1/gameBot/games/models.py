from django.db import models
from users.models import CustomUser

class Game(models.Model):
    name = models.CharField(max_length=200, blank=False)
    apiId = models.CharField(max_length= 50, blank=False)
    description = models.TextField(null=True)

    def __str__(self):
        return self.title
    
    
    # addedBy = models.ForeignKey(CustomUser, related_name="games", on_delete=models.CASCADE)
# year = models.CharField(max_length=4)
# cover = models.ImageField(upload_to ='covers', blank=True, null=True)