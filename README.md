# DIMS-api

**DIMS-api** was made for educational purposes for Dev-icubator managment system([DIMS](https://github.com/Dev-incubator/DIMS.UI-5))

This project was made using such technologies as:
 - **NodeJS**;
 - **ExpressJS**;
 - **Mongodb** (including **Mongoose**);
 - **Nodemailer**;

It's deployed on Heroku and availiable on http://dims-5.herokuapp.com/api/

There are 5 main parts of this API such as:

 + [Profiles features](#PROFILES);
 + [Tasks features](#TASKS);
 + [User tasks features](#USER_TASKS);
 + [User tracks features](#USER_TRACKS);
 + [Sending mail feature](#MAIL);

## <a name="PROFILES"></a>  Profiles features

### Create profile

Method: **POST**;

Route: `/create`;

Body:
```json
{
	"Name": "John",
	"LastName":"Doe",
	"Email":"anothermail@gmail.com",
	"DirectionId":2,
	"Sex":"M",
	"Education":"BSU",
	"BirthDate":"1920-01-02",
	"UniversityAverageScore":10.0,
	"MathScore":10.0,
	"Address":"Another address",
	"MobilePhone":"+375335783285",
	"Skype":"johndoe1940",
	"StartDate":"1940-03-25"
}
```

Response:
```json
{
    "UserId": "5ee8b70338f5070004b3b42a",
    "FullName": "John Doe",
    "Direction": ".Net",
    "Email": "anothermail@gmail.com",
    "Sex": "M",
    "Education": "BSU",
    "BirthDate": "1920-01-02",
    "UniversityAverageScore": 10,
    "MathScore": 10,
    "Address": "Another address",
    "MobilePhone": "+375335783285",
    "Skype": "johndoe1940",
    "StartDate": "1940-03-25"
}
```

> Sex is 'M' for 'Male' or 'F' for 'Female'

> Direction ID's are: 1 for 'Frontend', 2 for '.Net', 3 for 'Salesforce', 4 for 'Java'

### Get all profiles

Method: **GET**;

Route: `/profiles`;

Response:
```json
[
    {
        "UserId": "5ee8b70338f5070004b3b42a",
        "FullName": "John Doe",
        "Direction": ".Net",
        "Email": "anothermail@gmail.com",
        "Sex": "M",
        "Education": "BSU",
        "BirthDate": "1920-01-02",
        "UniversityAverageScore": 10,
        "MathScore": 10,
        "Address": "Another address",
        "MobilePhone": "+375335783285",
        "Skype": "johndoe1940",
        "StartDate": "1940-03-25"
    }
]
```

### Get profile by id

Method: **GET**;

Route: `/profile/profile_id`;

Response for `/profile/5ee8b70338f5070004b3b42a`:
```json
{
    "UserId": "5ee8b70338f5070004b3b42a",
    "Name": "John",
    "LastName": "Doe",
    "Email": "anothermail@gmail.com",
    "DirectionId": 2,
    "Sex": "M",
    "Education": "BSU",
    "BirthDate": "1920-01-02",
    "UniversityAverageScore": 10,
    "MathScore": 10,
    "Address": "Another address",
    "MobilePhone": "+375335783285",
    "Skype": "johndoe1940",
    "StartDate": "1940-03-25"
}
```

### Delete profile by id

`/profile/delete/profile_id`

### Edit profile by id

`/profile/edit/profile_id`

### Get profile details by id

`/profile/details/profile_id`

### Check if profile exists by email

`/profile/exists/profile_email`

## <a name="TASKS"></a>  Tasks features



## <a name="USER_TASKS"></a>  User tasks features



## <a name="USER_TRACKS"></a>  User tracks features



## <a name="MAIL"></a> Sending mail feature


