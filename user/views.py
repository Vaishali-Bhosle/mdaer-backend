from django.contrib.auth import authenticate 
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import User
from .serializers import *
from .utils import send_otp, verify_otp

class SignIn(APIView):
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



class SignUp(APIView):
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



class Profile(APIView):
    def get(self,request):

        return Response({"Message": 'User Profile'}, status=status.HTTP_200_OK)
        


class ForgotPassword(APIView):
    def post(self,request):

        return Response({"Message": 'User Forgot Password'}, status=status.HTTP_200_OK)
        


class Signout(APIView):
    def post(self,request):

        return Response({"Message": 'User Signout'}, status=status.HTTP_200_OK)



class SendOTP(APIView):
    def post(self, request):
        data = request.data
        email = data.get('email')
        phone = data.get('phone')

        if not email and not phone:
            return Response({"Message": "Email or Phone is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(email=email) if email else User.objects.get(username=data.get("username"), email=email)
            to = phone if phone else email

            status = send_otp(to, "sms" if phone else "email")
            return Response({"Message": "OTP sent successfully", "status": status}, status=status.HTTP_200_OK)

        except User.DoesNotExist:
            return Response({"Message": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"Message": f"Error: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



class VerifyOTP(APIView):
    def post(self, request):
        data = request.data
        email = data.get('email')
        phone = data.get('phone')
        otp = data.get('otp')

        if not (email or phone) or not otp:
            return Response({"Message": "Email/Phone and OTP are required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(email=email) if email else User.objects.get(username=data.get("username"), email=email)
            to = phone if phone else email

            status = verify_otp(to, otp)
            if status == "approved":
                return Response({"Message": "OTP verified successfully"}, status=status.HTTP_200_OK)
            else:
                return Response({"Message": "Invalid OTP"}, status=status.HTTP_400_BAD_REQUEST)

        except User.DoesNotExist:
            return Response({"Message": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"Message": f"Error: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)