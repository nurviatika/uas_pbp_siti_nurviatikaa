# User API Spec

## Register User API
Endpoint : POST /api/users

Request Body :

```json
{
    "username" : "siti nurviatika",
    "passwoard" : "rahasia",
    "name" : "Tugas Pemrograman"
}

```

Response Body Success :

```json
{
    "data" : {
        "username" : "siti nurviatika",
        "name" : "Tugas Pemrograman"
    }
}

```

Response Body Error:
```json
{
    "errors" : "Username already registered"
}

```

## Login User API

Endpoint : POST /api/users/login

Request Body :

```json

{
    "username" : "siti nurviatika",
    "password" : "rahasia"
}
```
Response Body Success :

```json
{
    "data" : {
        "token" : "unique-token"
    }
}

```

Response Body Error :

```json
{
    "errors" : "Username or password wrong"
}

```

## Update User API

Endpoint : PATCH /api/users/current

Headers :
- Authorization : token

Request Body :

```json
{
    "name" : "tugas pemrograman",
    "password" : "new password"
}
```

Response Body Success :

```json
{
    "data" : {
        "username" : "siti nurviatika",
        "name" : "tugas pemrograman"
    }
}

```

Response Body Error :

```json
{
    "errors" : "Name length max 100"
}

```

## Get User API

Endpoint : GET /api/users/current

Headers :
- Authorization : token

Response Body Success :

```json
{
    "data" :{
        "username" : "siti nurviatika",
        "name" : "tugas pemrograman"
    }
}
```

Response Body Error :
```json
{
    "errors" : "Unauthorized"
}
```

## Logout User API

Endpoint : DELETE /api/users/logout

Headers :
- Authorization : token

Response Body Success :

```json
{
    "data" : "OK"
}
```

Response Body Error :

```json
{
    "errors" : "Unauthorized"
}
```