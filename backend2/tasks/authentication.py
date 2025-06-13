from rest_framework import authentication, exceptions
import jwt
from django.conf import settings

class JWTAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        auth_header = request.META.get('HTTP_AUTHORIZATION')
        if not auth_header:
            return None
            
        try:
            # Get the token
            token = auth_header.split(' ')[1]
            # Decode the token
            payload = jwt.decode(token, settings.JWT_SECRET_KEY, algorithms=['HS256'])
            user_id = payload['id']
            
            # Create a simple user object with just the ID
            user = type('User', (object,), {'id': user_id, 'is_authenticated': True})
            
            return (user, token)
        except jwt.ExpiredSignatureError:
            raise exceptions.AuthenticationFailed('Token expired')
        except (jwt.DecodeError, jwt.InvalidTokenError):
            raise exceptions.AuthenticationFailed('Invalid token')
        except IndexError:
            raise exceptions.AuthenticationFailed('Token prefix missing') 