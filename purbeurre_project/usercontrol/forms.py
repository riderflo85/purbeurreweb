from django import forms

class LoginForm(forms.Form):
    user = forms.CharField(
        label='user',
        max_length=100,
        widget=forms.TextInput(
            attrs={'placeholder': 'Pseudo ou email', 'class': 'form-control'}
            ),
    )
    password = forms.CharField(
        label='password',
        widget=forms.PasswordInput(
            attrs={'placeholder': 'Mot de passe', 'class': 'form-control'}
            ),
    )