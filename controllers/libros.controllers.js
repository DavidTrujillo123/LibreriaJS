const { db } = require('../cnn')

//Consulta tabla book
const getBooks = async (req, res) =>{
    try{
        const consultas = 'SELECT * FROM book'
        const response = await db.query(consultas)
        res.status(200).json(response)
    }catch(e){
        res.status(400).json({
            code: e.code,
            message: 'No se ha enconstrado ningún libro'
        })
    }
}

//Consulta tabla book por book_id
const getBooksByID = async (req,res) =>{
    const consulta = 'SELECT * FROM book WHERE book_id = $1'
    try {
        const book_id = req.params.book_id
        const response = await db.one(consulta, [book_id])
        res.status(200).json(response)
    } catch (e) {
        res.status(400).json({
            code: e.code,
            message: 'No se ha enconstrado ningún libro con el ID: ' + req.params.book_id
        })
    }
}

//Consulta de libros general con: book_id, book_name, book_year, autor y editorial
const getBooksByName = async (req, res) =>{
    try{
        const consultas = 'SELECT * from vw_libreria ORDER BY concant;'
        const response = await db.query(consultas)
        res.status(200).json(response)
    }catch(e){
        res.status(400).json({
            code: e.code,
            message: e.message
        })
    }
}

//Consulta de libros por su titulo
const getBooksByTitle = async (req,res) =>{
        const title = req.params.title    
        const consultas = "SELECT * from vw_libreria WHERE book_name like '%"+title+"%';"
    try{
        const response = await db.query(consultas, [title])
        res.status(200).json(response)
     }catch(e){
         res.status(400).json({
             code: e.code,
             message: e.message
         })
    }
}

//Ingresar libros
const postBook = async (req, res) =>{
    const consulta = 'INSERT INTO public.book(book_name, book_year, book_id_author, book_id_editorial)'
        +'VALUES ($1, $2, $3, $4) RETURNING *;'
    try {
        const book = req.body
        
        const response = await db.one(consulta, [
            book.name, 
            book.year,
            book.id_author,
            book.id_editorial
        ])
        res.status(201).json({
            message: 'Libro ingresado correctamente',
            body: response
        })
    } catch (e) {
        res.status(400).json({
            code: e.code,
            message: e.message
        })
    }
}

//Delete by id
const deleteBook = async (req, res) => {
    const consulta = "DELETE FROM book WHERE book_id = $1;"
    const id = req.params.id
    try {
        const response = await db.query(consulta,[id])
        res.status(200).json({
            message: "El libro : "+ id +" se ha eliminado correctamente"
        })
    } catch (e) {
        res.status(400).json({
            code: e.code,
            message: "No se ha encontrado el libro ("+id+")"
        })
    }
}

const putBook = async(req, res) => {
    const consulta = "UPDATE book SET book_name = $2, book_year = $3, book_id_author = $4, book_id_editorial = $5"+
        "WHERE book_id = $1 RETURNING *;"
    try {
        const book = req.body
        const response = await db.one(consulta, [
            book.id,
            book.name,
            book.year,
            book.id_author,
            book.id_editorial
        ])
        res.status(200).json({
            message: "Libro actualizado correctamente",
            body: response
        })
    } catch (e) {
        res.status(400).json({
            code: e.code,
            message: e.message
        })
    } 
}

module.exports = {
    getBooks,
    getBooksByID,
    getBooksByName,
    getBooksByTitle,
    postBook,
    deleteBook,
    putBook
}