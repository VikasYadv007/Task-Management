from django.db import models

# Create your models here.

class Task(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    effort_days = models.IntegerField(default=1)
    due_date = models.DateField()
    user_id = models.IntegerField()  # To link with Node.js auth system
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
