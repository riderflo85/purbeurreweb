from django.shortcuts import render, redirect, get_object_or_404
from django.urls import reverse
from django.http import HttpResponseRedirect, JsonResponse
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
import json
from .models import Aliment
from .forms import SearchForm

# Create your views here.
def index(request):
    context = {}
    form = SearchForm()  
    context['form'] = form

    return render(request, 'search/index.html', context=context)

def result(request):
    context = {}

    if request.method == 'POST':

        form = SearchForm(request.POST)
        if form.is_valid():
            food_search = form.cleaned_data['research']
            food = Aliment.objects.filter(name__contains=food_search)

            if food.exists():
                context['id'] = food[0].id
                context['name'] = food[0].name
                context['groupe_nova'] = food[0].nova_group
                context['nutrition_group'] = food[0].nutrition_group
                context['img'] = food[0].image
                context['list_food'] = food
        
        else:
            context['errors'] = form.errors.items()

        return render(request, 'search/result.html', context=context)
    
    else:
        return render(request, 'search/no_search.html', context=context)

def fooddetail(request, food_id):
    context = {}
    
    food = get_object_or_404(Aliment, pk=food_id)
    context['food'] = food

    context['nutriments'] = dict(eval(food.nutriments))

    return render(request, 'search/food_detail.html', context=context)

def savefood(request):
    req = request.POST['idFood']
    # data = json.loads(req)
    print(req)

    return JsonResponse({'ServerResponse': 'okay'})