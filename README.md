------------------------------- An assignment by causalFunnel team  --------------------------------

Insted of running app in local environment one can directly make an API call on render hosted server for testing
Link - https://blogbackend-ciko.onrender.com/

Demo video link - https://drive.google.com/file/d/1MCrp7Jlbk2O9u1f1D94EOspZjORgRmUA/view


run these commands in order to start this backend app in local environment

- npm install 
- npm run dev

After setting up in local environment 

For signup  - [POST] http://localhost:3000/api/user/signup
- req format 
{
    "name": "Sangam Choudhary",
    "email": "admin5@admin.com",
    "password": "admin5",
    "confirmPassword": "admin5"
}


For Login - [POST] http://localhost:3000/api/user/login
- req format {
    "email" : "admin2@admin.com",
    "password" : "admin2"
}


For logout - [GET] http://localhost:3000/api/user/logout

Reset password - [POST] http://localhost:3000/api/user/resetPassword
- req format
{
    "newPassword" : "admin222",
    "confirmNewPassword" : "admin222"
}

Create blog - [POST] http://localhost:3000/api/blog
- req format 
{
    "title" : "28",
    "description" : "hello"
}

update blog - [PATCH] http://localhost:3000/api/blog/63d51a71a91954e01e750bbc
- req format
{
    "title": "updated blog",
    "description": "update description"
}

delete blog - [DELETE] http://localhost:3000/api/blog/63d51a71a91954e01e750bbc

get blogs per page - [GET] http://localhost:3000?page=3
