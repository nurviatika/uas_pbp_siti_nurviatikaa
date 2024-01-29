# Contact_mahasiswa API SPec

## Create Contact_mahasiswa API

Endpoint : POST /api/contact_mahasiswa

Headers :
- Authorization : token

Request Body :

```json
{
    "first_name" : "siti",
    "last_name" : "nurviatika",
    "nim" : "20220040281",
    "program_studi" : " teknik_informatika",
    "email" : "sitinurviatika@gmail.com",
    "phone" : "085211903481"
}
```
Response Body Success :

```json
{
    "data" : {
        "id" : 1,
        "first_name" : "siti",
        "last_name" : "nurviatika",
        "nim" : "20220040281",
        "program_studi" : " teknik_informatika",
        "email" : "sitinurviatika@gmail.com","phone" : "085211903481"
    }
}
```

Response Body Error :

```json
{
    "error" : "Email is not valid format"
}
```

## Update Contact_mahasiswa API

Endpoint : PUT /api/contact_mahasiswa/:id

Headers :
- Authorization : token

Request Body :
```json
{
    "first_name" : "siti",
    "last_name" : "nurviatika",
    "nim" : "20220040281",
    "program_studi" : " teknik_informatika",
    "email" : "sitinurviatika@gmail.com",
    "phone" : "085211903481"
}

```

Response Body Success :

```json
{
    "data" : {
        "id" : 1,
        "first_name" : "siti",
        "last_name" : "nurviatika",
        "nim" : "20220040281",
        "program_studi" : " teknik_informatika",
        "email" : "sitinurviatika@gmail.com","phone" : "085211903481"
    }
}
```

Response Body Error :

```json
{
    "error" : "Email is not valid format"
}
```

## Get Contact API

Endpoint : GET /api/contact_mahasiswa/:id

Headers :
- Authorization : token

Response Body Success :

```json
{
    "data" : {
        "id" : 1,
        "first_name" : "siti",
        "last_name" : "nurviatika", 
        "program_studi" : " teknik_informatika",
        "email" : "sitinurviatika@gmail.com","phone" : "085211903481"
    }
}
```

Response Body Error :
```json
{
    "error" : "Contact_mahasiswa is not found"
}
```


## Search Contact_mahasiswa API

Endpoint : GET /api/contact_mahasiswa/:id

Headers :
- Authorization : token

Query params :
- name : Search by firsh_name or last_name, using like, optional
- nim : Search by nim using like, optional
- program_studi : Search by program-studi using like, optional
- email : Search by email using like, optional
- phone : Search by phone using like, optional
- page : number by page, default 1
- size : Size by page, default 10

Response Body Success :

```json
{
    "data" : [
        {
            "id" : 1,
            "first_name" : "siti",
            "last_name" : "nurviatika",
            "nim" : "20220040281",
            "program_studi" : " teknik_informatika",
            "email" : "sitinurviatika@gmail.com","phone" : "085211903481"
        },
        {
            "id" : 2,
            "first_name" : "siti",
            "last_name" : "nurviatika",
            "nim" : "20220040281",
            "program_studi" : " teknik_informatika",
            "email" : "sitinurviatika@gmail.com","phone" : "085211903481"
        }

    ],
    "paging" : {
        "page" : 1,
        "total_page" : 3,
        "total_item" : 30
    }

}
```

Response Body Error :


## Remove Contact_mahasiswa API

Endpoint : DELETE /api/contact_mahasiswa/:id

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
    "error" : "Contact_mahasiswa is not found"
}
```
