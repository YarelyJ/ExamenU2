from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r"modules", views.ModuleViewSet, basename="module")

urlpatterns = [
    path("", include(router.urls)),
    path("modules/", views.get_all_modules, name="all_modules"),
    path("modules/<str:name>/", views.get_module_by_name, name="module_detail"),
]
