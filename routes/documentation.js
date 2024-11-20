const {Router} = require('express')
const router = Router()
const bookRoutes = require('../documentation/book')
const bookshelfRoutes = require('../documentation/bookshelf')
const userRoutes = require('../documentation/user')
const otherRoutes = require('../documentation/others')

router.get('/doc', async (req, res) => {
    const routes = bookRoutes.concat(bookshelfRoutes, userRoutes, otherRoutes)
    console.log(routes)
    res.render('base', {'routes': routes});

})

module.exports = router