from django.contrib.auth import authenticate
from django.contrib.auth.models import update_last_login
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics, status
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from .models import CustomUser
from .serializers import CustomUserSerializer
from .permissions import IsAdminEntreprise, IsSuperAdmin
from rest_framework.response import Response

@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def custom_user_login_view(request):
    email = request.data.get('email')
    password = request.data.get('password')
    remember_me = request.data.get('rememberMe', False)

    user = authenticate(request, email=email, password=password)

    if user:
        token, created = Token.objects.get_or_create(user=user)
        update_last_login(None, user)

        if not remember_me:
            # La session expirera lorsque le navigateur est fermé
            request.session.set_expiry(0)

            return Response({'token': token.key, 'user_id': user.id}, status=status.HTTP_200_OK)
        
    return Response({'detail': 'Données incorrectes ou inexistantes'}, status=status.HTTP_401_UNAUTHORIZED)