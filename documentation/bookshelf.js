const data = [
    {
        'title': 'Get bookshelves',
        'methode': 'GET',
        'url': '/bookshelves',
        'description': "Retrieve all bookshelves, including their name and the list of associated books. Each bookshelf contains a collection of books linked to it. The response provides detailed information about the bookshelf and its books.",
        'needToken': true,
        'bodyJson': {}
        ,
        "responseJson": [
            {
                "_id": "string (AI) (NOT NULL)",
                "name": "string (NOT NULL) (UNIQUE)",
                "books": [
                    {
                        "_id": "string (AI) (NOT NULL)",
                        "title": "string (NOT NULL)",
                        "description": "string (NULL)",
                        "publishedYear": "int (NULL)",
                        "image": "url (NULL)",
                        "author": "string (NULL)",
                        "ine": "string (NULL)"
                    }
                ]
            }
        ]


    }, {
        'title': 'Get bookshelf',
        'methode': 'GET',
        'url': '/bookshelf/get/:id',
        'description': "This request retrieves details of a specific bookshelf by its ID. The response includes the bookshelf's name and the books associated with it. ",
        'needToken': true,
        'bodyJson': {}
        ,
        "responseJson": {
            "_id": "string (AI) (NOT NULL)",
            "name": "string (NOT NULL) (UNIQUE)",
            "books": [
                {
                    "_id": "string (AI) (NOT NULL)",
                    "title": "string (NOT NULL)",
                    "description": "string (NULL)",
                    "publishedYear": "int (NULL)",
                    "image": "url (NULL)",
                    "author": "string (NULL)",
                    "ine": "string (NULL)"
                }
            ]
        }
    }, {
        'title': 'Create bookshelf',
        'methode': 'POST',
        'url': '/bookshelf/new',
        'description': "This request allows the creation of a new bookshelf. The request body must include the bookshelf's name. The newly created bookshelf will have an auto-generated ID.",
        'needToken': true,
        'bodyJson': {
            "name": "string (NOT NULL) (UNIQUE)"
        }

        ,
        "responseJson": {
            "message": "ok"
        }
    }, {
        'title': 'Edit bookshelf',
        'methode': 'PUT',
        'url': '/bookshelf/edit/:id',
        'description': "This request allows updating the name of an existing bookshelf by its ID. The request requires the bookshelf's new name to be provided in the request body.",
        'needToken': true,
        'bodyJson': {
            "name": "string (NOT NULL) (UNIQUE)"
        }
        ,
        "responseJson": {
            "message": "ok"
        }
    }
    , {
        'title': 'Remove bookshelf',
        'methode': 'DELETE',
        'url': '/bookshelf/remove/:id',
        'description': "This request removes a bookshelf by its ID. The bookshelf itself will be deleted, but any books associated with it will not be removed from the database. These books will simply no longer be linked to the deleted bookshelf.",
        'needToken': true,
        'bodyJson': null
        ,
        "responseJson": null
    }
 , {
        'title': 'Add book to bookshelf',
        'methode': 'PATCH',
        'url': '/bookshelf/:bookshelfId/add/book/:bookId',
        'description': "This request adds a book to a bookshelf by associating the book with the specified bookshelf. It does not modify or remove any existing books; it simply links the book to the bookshelf.",
        'needToken': true,
        'bodyJson': null
        ,
        "responseJson": null
    },{
        'title': 'Sort bookshelf',
        'methode': 'GET',
        'url': '/bookshelves/sort/:type',
        'description': "This request returns a list of bookshelves sorted according to the specified criteria. You can choose to sort the bookshelves by name or by the number of books associated with each bookshelf. The sorting can be done in ascending or descending order. \n" +
            "\n" +
            "For sorting by name, you can choose `name-asc` to sort from A to Z or `name-dsc` to sort from Z to A. For sorting by the number of books, you can use `books-asc` to sort from the fewest to the most books, or `books-dsc` to sort from the most to the fewest books. The response will return the bookshelves in the selected order.",
        'needToken': true,
        'bodyJson':null
        ,
        "responseJson": null
    }

]

module.exports = data