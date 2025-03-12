# from .models import Member
# from .serializers import *
# from enum import Enum
# import hashlib
from keycloak import KeycloakOpenID, KeycloakOpenIDConnection, KeycloakAdmin
from django.conf import settings

# def verify_member_otp(aadhar_number, otp):
#     member = Member.objects.get(aadhar_number=aadhar_number)
#     member_serializer = MemberSerializers(member)
#     if(member.otp == otp):
#         return {"matched":True,"member":member_serializer}
#     else:
#         return {"matched":False}
    
# def memberinlist(member_id, memberlist):
#     for member in memberlist:
#         if(str(member['member_id']) == str(member_id)):
#             return True
    
#     return False

# def sumofarray(arraylist):
#     sum = 0
#     for i in arraylist:
#         sum += int(i)
#     return sum

# class Educational_qualification(Enum):
#     TENTH = 1
#     TWELTH = 2
#     UNDERGRADUATE = 3
#     GRADUATE = 4
#     POSTGRADUATE = 5



def getKeycloak():
    config = settings.KEYCLOAK_CONFIG
    keycloak_openid = KeycloakOpenID(server_url = config['KEYCLOAK_SERVER_URL'],
        client_id = config['KEYCLOAK_CLIENT_ID'],
        realm_name = config['KEYCLOAK_REALM'],
        client_secret_key = config['KEYCLOAK_CLIENT_SECRET_KEY'])
    return keycloak_openid

def getKeycloakAdmin():
    config = settings.KEYCLOAK_CONFIG
    print("1",config['KEYCLOAK_SERVER_URL'],"2",
        config['KEYCLOAK_REALM'],"3",
        config['KEYCLOAK_REALM'],"4",
        config['KEYCLOAK_CLIENT_ID'],"5",
        config['KEYCLOAK_CLIENT_SECRET_KEY']
        )
    
    keycloak_connection = KeycloakOpenIDConnection(
        server_url=config['KEYCLOAK_SERVER_URL'],
        realm_name=config['KEYCLOAK_REALM'],
        user_realm_name = config['KEYCLOAK_REALM'],
        client_id = config['KEYCLOAK_CLIENT_ID'],
        client_secret_key = config['KEYCLOAK_CLIENT_SECRET_KEY'],
        verify=True)
    keycloak_admin = KeycloakAdmin(connection=keycloak_connection)
    
    return keycloak_admin


# def hash_aadhar(aadhar_number):
#     aadhar_str = str(aadhar_number)
#     hashed_aadhar = hashlib.sha256(aadhar_str.encode()).hexdigest()

#     return hashed_aadhar