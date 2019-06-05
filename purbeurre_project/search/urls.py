from django.urls import path

from . import views

app_name = 'search'
urlpatterns = [
    path('', views.index, name='index'),
    # path('nosearch', views.nosearch, name='no_search'),
    path('result', views.result, name='result'),
]
