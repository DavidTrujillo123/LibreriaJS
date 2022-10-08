const { db } = require('../cnn')

//Consulta editoriales
const getEditorial = async (req, res) =>{
    try {
        const consultas = 'SELECT * FROM editorial'
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

//Consulta de editoriales por nombre
const getEditorialByName = async (req, res) =>{
    try {
        const name = req.params.name
        const consultas = "SELECT * FROM editorial WHERE edi_name like '%"+name+"%';"
        const response = await db.query(consultas, [name])
        res.status(200).json(response)
    }
    catch(e){
        res.status(400).json({
            code: e.code,
            message: e.message
        })
    }
}

//Consulta de libros que ha publicado la editorial
const getEditorialBooks = async (req, res) =>{
    try {
        const name = req.params.name
        const consultas = "SELECT * FROM vw_editorial WHERE edi_name like '%"+name+"%';"
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

//Insercion de editoriales
const postEditorial = async (req, res) =>{
    const consulta = 'INSERT INTO editorial(edi_name, edi_country, edi_city)'
        +'VALUES ($1, $2, $3) RETURNING *;'
    try {
        const editorial = req.body
        const response = await db.one(consulta, [
            editorial.name, 
            editorial.country,
            editorial.city
        ])
        res.status(201).json({
            message: 'Editorial ingresada correctamente',
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
const deleteEditorial = async (req, res) => {
    const consulta = "DELETE FROM editorial WHERE edi_id = $1;"
    const id = req.params.id
    try {
        const response = await db.query(consulta,[id])
        res.status(200).json({
            message: "La editorial : "+ id +" se ha eliminado correctamente"
        })
    } catch (e) {
        res.status(400).json({
            code: e.code,
            message: "No se ha encontrado la editorial ("+id+")"
        })
    }
}

//put
const putEditorial = async(req, res) => {
    const consulta = "UPDATE editorial SET edi_name = $2, edi_country = $3, edi_city = $4"+
        "WHERE edi_id = $1 RETURNING *;"
    try {
        const editorial = req.body
        const response = await db.one(consulta, [
            editorial.id,
            editorial.name,
            editorial.country,
            editorial.city
        ])
        res.status(200).json({
            message: "Editorial actualizado correctamente",
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
    getEditorial,
    getEditorialByName,
    getEditorialBooks,
    postEditorial,
    deleteEditorial,
    putEditorial
}