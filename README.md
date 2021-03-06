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

Method: **DELETE**;

Route: `/profile/delete/profile_id`

Response for `/profile/delete/5ee8b70338f5070004b3b42a`:

```json
{
    "message": "successfully delete user with id 5ee8b70338f5070004b3b42a"
}
```

### Edit profile by id

Method: **PUT**;

Route: `/profile/edit/profile_id`;

Body:
```json
{
    "Name": "John",
    "LastName": "Carpenter",
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

Response for `/profile/edit/5ee8b70338f5070004b3b42a`:

```json
{
    "message": "successfully update user with id 5ee8b70338f5070004b3b42a"
}
```

### Get profile details by id

Method: **GET**;

Route: `/profile/details/profile_id`

Response for `/profile/details/5ee8b70338f5070004b3b42a`:

```json
{
    "UserId": "5ee8b70338f5070004b3b42a",
    "FullName": "John Carpenter",
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

### Check if profile exists by email

Method: **GET**;

Route: `/profile/exists/profile_email`

Response for `/profile/exists/anothermail@gmail.com`:

```json
true
```

## <a name="TASKS"></a>  Tasks features

### Create new task

Method: **POST**;

Route: `/task/create`

### Get all tasks

Method: **GET**;

Route: `/tasks`

### Get task by id

Method: **GET**;

Route: `/task/task_id`

### Delete task by id

Method: **DELETE**;

Route: `/task/delete/task_id`

### Edit task

Method: **PUT**;

Route: `/task/edit`

## <a name="USER_TASKS"></a>  User tasks features

### Get user task by profile id

Method: **GET**;

Route: `/user/tasks/profile_id`

### Set task status

Method: **PUT**;

Route: `/user/task`

### Add task to users

Method: **POST**;

Route: `/user/task/add/task_id`

### Get task's assigned users

Method: **GET**;

Route: `/task/users/task_id`

## <a name="USER_TRACKS"></a>  User tracks features

### Create user track

Method: **POST**;

Route: `/track/create`

### Get users's tracks by profile id

Method: **GET**;

Route: `/user/tracks/profile_id`

### Edit users's track

Method: **PUT**;

Route: `/user/tracks`

### Delete users's track by track id

Method: **DELETE**;

Route: `/user/tracks/delete/track_id`

## <a name="MAIL"></a> Sending mail feature

Method: **POST**;

Route: `/intouch`

Body:
```json
{
	  "fullName": "John Woods",
	  "email": "mahseeen@gmail.com",
    "message": "HEY! WE WANT TO HIRE YOU!"
}
```
