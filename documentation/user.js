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
        'description': 'This request allows you to create a book. The created book is not directly linked to a bookshelf; use the "add book to bookshelf" request to associate it with a specific bookshelf.',
        'needToken': true,
        'bodyJson': {
            "email": "string (NOT NULL) (UNIQUE)",
            "password": "string (NOT NULL)",
        },
        "responseJson": {
            "token": "string (NOT NULL)",
        }
    },


]

module.exports = data