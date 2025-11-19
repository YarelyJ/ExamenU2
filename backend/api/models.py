from django.db import models

class Module(models.Model):
    MODULE_CHOICES = [
        ("division", "División de Datasets"),
        ("preparation", "Preparación de Datos"),
        ("pipelines", "Transformadores y Pipelines"),
    ]
    
    name = models.CharField(max_length=50, choices=MODULE_CHOICES, unique=True)
    title = models.CharField(max_length=200)
    description = models.TextField()
    topics = models.JSONField()
    examples = models.JSONField()
    key_points = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.title

    class Meta:
        ordering = ["name"]
