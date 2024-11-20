const data = [
    {
        'title': 'Create Book',
        'methode': 'POST',
        'url': '/book/new',
        'description': 'This request allows you to create a book. The created book is not directly linked to a bookshelf; use the "add book to bookshelf" request to associate it with a specific bookshelf.',
        'needToken': true,
        'bodyJson': {
            "title": "string",
            "description": "string",
            "publishedYear": "int",
            "author": "string",
            "ine": "string"
        },
        "responseJson": {
            "message": "ok",
        }
    }


]

module.exports = data