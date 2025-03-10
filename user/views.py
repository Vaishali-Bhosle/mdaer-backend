from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import User
from .serializers import *

# Create your views here.

# def loginView(APIView):
#     def post(self, request):
#         username = request.data.get('username')
#         password = request.data.get('password')

#         if not username or not password:
#             return Response({"success": False, "message": "Username and password are required"}, status=status.HTTP_400_BAD_REQUEST)

#         user = User.objects.filter(username=username, password=password)
#         userSerializer = UserSerializer(user, many=True)



#         if user:
#             return Response({"success": True}, status=status.HTTP_200_OK)
#         else:
#             return Response({"success": False}, status=status.HTTP_401_UNAUTHORIZED)
        


class UserLogin(APIView):
     def post(self,request):
        try:
            username = request.data.get('username')
            password = request.data.get('password')
            #Validate
            try:
                user=User.objects.get(username=username, password=password)
            except User.DoesNotExist:
                return Response({"Message": "User does not exist"},status=status.HTTP_404_NOT_FOUND )
            user_Serializer=UserSerializer(user)
            print(user_Serializer)
            print("user", user)
            if user_Serializer.is_valid:
                # user_Serializer.save()
                return Response({"Message": 'User LOGGED IN Successfully'}, status=status.HTTP_200_OK)
            else:
                return Response({"Message": user_Serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"Message": str(e)}, status=status.HTTP_400_BAD_REQUEST)




class UserRegister(APIView):
     def post(self,request):
        try:
            data=request.data
             #Validate all required fields (field req, 400)
            username = data.get('username')
            password = data.get('password')
            first_name = data.get('first_name')
            last_name = data.get('last_name')
            email = data.get('email')
            #Bla
            #Bla
            try:
                user=User.objects.get(username=username, password=password)
                return Response({"Message": "User already exists"}, status=status.HTTP_400_BAD_REQUEST)
            except User.DoesNotExist:
                user_Serializer=UserSerializer(user)
                if user_Serializer.is_valid:
                    user_Serializer.save()
                    return Response({"Message": 'User registered Successfully'}, status=status.HTTP_201_CREATED)
                else:
                    return Response({"Message": user_Serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"Message": str(e)}, status=status.HTTP_400_BAD_REQUEST)
