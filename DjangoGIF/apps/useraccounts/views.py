from .forms import SignupForm, AddGifForm, LoginForm
from django.contrib.auth import authenticate, login, logout
from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.utils import timezone
from taggit.models import Tag
from .models import Gif


# Create your views here.
def view_profile(request, username):
    can_edit = False
    if request.user.username == username:
        can_edit = True

    u = User.objects.get(username=username)
    gifs = Gif.objects.filter(owner=u)

    tags = list(set(Tag.objects.filter(gif__owner=u)))

    tagged_gifs = []
    for tag in tags:
        temp_gifs = gifs.filter(tags__name__in=[str(tag)])
        tagged_gifs.append([str(tag), temp_gifs])

    add_gif_form = AddGifForm(initial={
        'hidden_id': u.id
    })
    context = {
        'name': u.first_name,
        'add_form': add_gif_form,
        'gifs': gifs,
        'tagged_gifs': tagged_gifs,
        'can_edit': can_edit
    }
    return render(request,
                  'useraccounts/view.html',
                  context)


def login_view(request):
    context = {'form': LoginForm()}
    return render(request, 'useraccounts/login.html', context)


def logout_view(request):
    logout(request)
    context = {'message': 'You have been succesfully logged out!'}
    return render(request, 'home/home.html', context)


def authenticate_user(request):
    username = request.POST['username']
    password = request.POST['password']
    user = authenticate(username=username, password=password)
    if user is not None:
        if user.is_active:
            login(request, user)
            return redirect('/account/view/%s' % str(user.username))
        else:
            context = {
                'form': LoginForm(),
                'message': 'This account has been deactivated, please create a new one.'
            }
            return render(request, 'useraccounts/login.html', context)
    else:
        context = {
            'form': LoginForm(),
            'message': 'Invalid Login, please try again.'
        }
        return render(request, 'useraccounts/login.html', context)


def signup(request):
    print request.user.username
    if request.method == 'POST':
        form = SignupForm(request.POST)
        if form.is_valid():
            message = 'Account Created!'
            print message
    else:
        form = SignupForm()
    return render(request,
                  'useraccounts/signup.html',
                  {'form': form})


def create_account(request):
    if request.method == 'POST':
        form = SignupForm(request.POST)
        if form.is_valid():
            username = request.POST['username']
            password = request.POST['password']
            email = request.POST['email']
            firstname = request.POST['first_name']
            u = User.objects.create_user(username=username, password=password, email=email, first_name=firstname)
            u.save()
            request.user.username = username
            context = {
                'name': firstname,
                'username': username
            }
            return render(request, 'useraccounts/account_created.html', context)
    else:
        form = SignupForm()
        return render(request,
                      'useraccounts/signup.html',
                      {'form': form})


def add_gif(request):
    if request.method == 'POST':
        form = AddGifForm(request.POST)
        if form.is_valid():
            hidden_id = request.POST['hidden_id']
            url = request.POST['url']
            label = request.POST['label']
            tags = request.POST['tags']
            u = User.objects.get(id=hidden_id)
            g = Gif(owner=u, url=url, created=timezone.now(), label=label, tag_names=tags)
            g.save()
            g.tags.add(tags)
            return redirect('/account/view/%s' % str(u.username))
    else:
        form = AddGifForm()
    return render(request,
                  'useraccounts/view.html',
                  {'form': form})


def edit_gif(request):
    print 'Form submitted'
    return