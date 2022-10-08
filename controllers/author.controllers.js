const { db } = require('../cnn')

//Consulta de autores
const getAuthor = async (req, res) =>{
    try {
        const consultas = 'SELECT * FROM author'
        const response = await db.query(consultas)
        res.status(200).json(response)
    }
    catch(e){
        res.status(400).json({
            code: e.code,
            message: e.message
        })
    }
}

//Consulta de autores por id
const getAuthorByID = async (req, res) =>{
    try {
        const consultas = 'SELECT * FROM author WHERE aut_id = $1;'
        const aut_id = req.params.aut_id
        const response = await db.query(consultas, [aut_id])
        res.status(200).json(response)
    }
    catch(e){
        res.status(400).json({
            code: e.code,
            message: e.message
        })
    }
}

//Consulta por nombre la lista de libros que el autor tiene
const getAuthorBooks = async (req, res) =>{
    try{
        const author = req.params.author
        const consulta = "SELECT * FROM vw_author WHERE concant like '%"+author+"%';"
        const response = await db.query(consulta, [author])
        res.status(200).json(response)
    } catch (e) {
        res.status(400).json({
            code: e.code,
            message: e.message
        })
    }
}

//Insertar authores
const postAuthor = async (req, res) =>{
    const consulta = "INSERT INTO author(aut_forename, aut_surname) VALUES ($1, $2) RETURNING *;"
    try {
        const author = req.body
        
        const response = await db.one(consulta, [
            author.forename, 
            author.surname,
        ])
        res.status(201).json({
            message: 'Autor ingresado correctamente',
            body: response
        })
    } catch (e) {
        res.status(400).json({
            code: e.code,
            message: e.message
        })
    }
}

//delete by id
const deleteAuthor = async (req, res) => {
    const consulta = "DELETE FROM author WHERE aut_id = $1;"
    try {
        const id = req.params.id
        const response = await db.query(consulta,[id])
        res.status(200).json({
            message: "El author con el ID: "+ id +" se ha eliminado correctamente"
        })
    } catch (e) {
        res.status(400).json({
            code: e.code,
            message: "No se ha encontrado un autor con el ID ("+ID+")"
        })
    }
}

//put
const putAuthor = async(req, res) => {
    const consulta = "UPDATE author SET aut_forename = $2, aut_surname = $3 "+
        "WHERE aut_id = $1 RETURNING *;"
    try {
        const author = req.body
        const response = await db.one(consulta, [
            author.id,
            author.forename,
            author.surname
        ])
        res.status(200).json({
            message: "Author actualizado correctamente",
            body: response
        })
    } catch (e) {
        res.status(400).json({
            code: e.code,
            message: e.message
        })
    }
    
}

module.exports ={
    getAuthor,
    getAuthorBooks,
    getAuthorByID,
    postAuthor,
    deleteAuthor,
    putAuthor
}
