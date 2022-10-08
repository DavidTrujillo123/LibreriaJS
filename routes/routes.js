const { Router } = require('express')
const { getBooks, getBooksByID, getBooksByName, postBook, deleteBook, putBook, getBooksByTitle } = require ('../controllers/libros.controllers')
const { getAuthor, getAuthorBooks, postAuthor, deleteAuthor, putAuthor, getAuthorByID } = require ('../controllers/author.controllers')
const { getEditorial, postEditorial, deleteEditorial, putEditorial, getEditorialByName, getEditorialBooks } = require('../controllers/editorial.controllers')
const router = Router()

const URLV1 = '/v1'

//rutas books
router.get(URLV1 + '/books', getBooks)
router.get(URLV1 + '/books/:book_id', getBooksByID)
router.get(URLV1 + '/name/books', getBooksByName)
router.get(URLV1 + '/name/books/:title', getBooksByTitle)
router.post(URLV1 + '/books', postBook)
router.delete(URLV1+'/books/:id',deleteBook)
router.put(URLV1+"/books",putBook)


//rutas authors
router.get( URLV1 + '/author', getAuthor),
router.get( URLV1 + '/ID/author/:aut_id', getAuthorByID),
router.get( URLV1 + '/author/:author', getAuthorBooks)
router.post( URLV1 + '/author', postAuthor)
router.delete(URLV1+'/author/:id',deleteAuthor)
router.put(URLV1+"/author",putAuthor)

//rutas editorial
router.get( URLV1 + '/editorial', getEditorial)
router.get ( URLV1 + '/editorial/:name', getEditorialByName)
router.get( URLV1 + '/name/editorial/:name', getEditorialBooks)
router.post( URLV1 + '/editorial', postEditorial)
router.delete(URLV1+'/editorial/:id',deleteEditorial)
router.put(URLV1+"/editorial",putEditorial)

//Producción
module.exports = router