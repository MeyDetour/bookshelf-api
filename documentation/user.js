const data = [
    {
        'title': 'Register',
        'methode': 'POST',
        'url': '/register',
        'description': 'This request allows a user to register by providing an email and a password. The user must provide a valid email address and a password that meets the specified requirements. Upon successful registration, the user will be added to the system, and an account will be created for them.',
        'needToken': true,
        'bodyJson': {
            "email": "string (NOT NULL) (UNIQUE)",
            "password": "string (NOT NULL)",

        },
        "responseJson": {
            "token": "string (NOT NULL)",
        }
    }, {
        'title': 'Login',
        'methode': 'POST',
        'url': '/login',
        'description': 'This request allows a user to login by providing an email and a password. ',
        'needToken': true,
        'bodyJson': {
            "email": "string (NOT NULL) (UNIQUE)",
            "password": "string (NOT NULL)",
        },
        "responseJson": {
            "token": "string (NOT NULL)",
        }
    }, {
        'title': 'Delete user',
        'methode': 'DELETE',
        'url': '/api/delete',
        'description': 'This request delete the current user by providing token ',
        'needToken': true,
        'bodyJson':null,
        "responseJson": null
    }, {
        'title': 'Get current user',
        'methode': 'GET',
        'url': '/api/get/user',
        'description': 'This request get the current user by providing an email and a password. ',
        'needToken': true,
        'bodyJson': {
            "email": "string (NOT NULL) (UNIQUE)",
            "id": "string (AI) (NOT NULL)",

        },
        "responseJson": {
            "token": "string (NOT NULL)",
        }
    }


]

module.exports = data