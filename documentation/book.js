const data = [
    {
        'title': 'Search Book',
        'methode': 'GET',
        'url': '/api/book/search',
        'description': 'This request retrieves all books in the system. One book can be in multiple bookshelves, and each bookshelf can contain many books.',
        'needToken': true,
        'bodyJson': {
            "searchTerm":"string (NOT NULL)"
        }
        ,
        "responseJson":  [{
            "bookshelves": [
                {
                    "_id": "string (AI) (NOT NULL)",
                    "name": "string (NOT NULL)"
                }
            ],
            "_id": "string (AI) (NOT NULL)",
            "author": "string (NULL)",
            "ine": "string (NULL)",
            "image": "url (NULL)",
            "pdf": "url (NULL)",
            "description": "string (NULL)",
            "title": "string (NOT NULL)"
        }]
    },{
        'title': 'Get all books',
        'methode': 'GET',
        'url': '/api/book/new',
        'description': 'This request retrieves all books in the system. One book can be in multiple bookshelves, and each bookshelf can contain many books.',
        'needToken': true,
        'bodyJson': {}
        ,
        "responseJson":  [{
            "bookshelves": [
                {
                    "_id": "string (AI) (NOT NULL)",
                    "name": "string (NOT NULL)"
                }
            ],
            "_id": "string (AI) (NOT NULL)",
            "author": "string (NULL)",
            "ine": "string (NULL)",
            "image": "url (NULL)",
            "pdf": "url (NULL)",
            "description": "string (NULL)",
            "title": "string (NOT NULL)"
        }]
    },{
        'title': 'Get one book',
        'methode': 'GET',
        'url': '/api/book/get/{id}',
        'description': 'This request retrieves one book in the system. One book can be in multiple bookshelves, and each bookshelf can contain many books.',
        'needToken': true,
        'bodyJson': {}
        ,
        "responseJson":  {
            "bookshelves": [
                {
                    "_id": "string (AI) (NOT NULL)",
                    "name": "string (NOT NULL)"
                }
            ],
            "_id": "string (AI) (NOT NULL)",
            "author": "string (NULL)",
            "ine": "string (NULL)",
            "image": "url (NULL)",
            "pdf": "url (NULL)",
            "description": "string (NULL)",
            "title": "string (NOT NULL)"
        }
    }, {
        'title': 'Create Book',
        'methode': 'POST',
        'url': '/api/book/new',
        'description': "You can create a book without specifying an id, which will be automatically incremented. The image and associated bookshelves can be added in separate requests.",
        'needToken': true,
        'bodyJson':{
            "title": "string (NOT NULL)",
            "description": "string (NULL)",
            "publishedYear": "int (NULL)",
            "author": "string (NULL)",
            "ine": "string (NULL)"
        }
        ,
        "responseJson": {
            message: "ok",
        }
    }, {
        'title': 'Edit one Book',
        'methode': 'PUT',
        'url': '/api/book/edit/:id',
        'description': 'You can edit an existing book by specifying its id. You can update fields like title, description, author, and publishedYear. Fields like image and bookshelves can be modified separately using different requests.',
        'needToken': true,
        'bodyJson': {
            "title": "string (NULL)",
            "description": "string (NULL)",
            "publishedYear": "int (NULL)",
            "author": "string (NULL)",
            "ine": "string (NULL)"
        },
        "responseJson": {
            message: "ok",
        }
    },{
        'title': 'Remove one Book',
        'methode': 'DELETE',
        'url': '/api/book/remove/:id',
        'description': 'You can remove a book by specifying its id in the request. This will delete the book from the database. The response will return OK once the book has been successfully removed.',
        'needToken': true,
        'bodyJson': null,
        "responseJson":null,
    },{
        'title': 'Upload image to book',
        'methode': 'PATCH',
        'url': '/api/upload/image/to/book/:id',
        'description': 'You can add an image to a book by sending a PATCH request with FormData. The FormData should include the image field, with the image file as its value. The id of the book must also be provided in the request body. The response will return OK once the image has been successfully added to the book.',
        'needToken': true,
        'bodyJson': null,
        "responseJson": null
    },{
        'title': 'Upload pdf to book',
        'methode': 'PATCH',
        'url': '/api/upload/pdf/to/book/:id',
        'description': 'You can add an pdf to a book by sending a PATCH request with FormData. The FormData should include the pdf field, with the pdf file as its value. The id of the book must also be provided in the request body. The response will return OK once the image has been successfully added to the book.',
        'needToken': true,
        'bodyJson': null,
        "responseJson": null
    },{
        'title': 'Remove image of book',
        'methode': 'DELETE',
        'url': '/api/book/remove/image/:id',
        'description': 'You can remove the image associated with a book by specifying its id. This will clear the image field for the book. The response will return OK once the image has been successfully removed.',
        'needToken': true,
        'bodyJson': null,
        "responseJson": null
    },{
        'title': 'Remove pdf of book',
        'methode': 'DELETE',
        'url': '/api/book/remove/pdf/:id',
        'description': 'You can remove the pdf associated with a book by specifying its id. This will clear the image field for the book. The response will return OK once the image has been successfully removed.',
        'needToken': true,
        'bodyJson': null,
        "responseJson": null
    },


]

module.exports = data
