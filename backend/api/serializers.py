from rest_framework import serializers
from .models import Module

class ModuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Module
        fields = ["id", "name", "title", "description", "topics", "examples", "key_points", "created_at"]
