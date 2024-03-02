'use strict'

import userModel from "../user/user.model.js"
import publicacionModel from '../publicaciones/publicacion.model.js'
import opinionModel from "./opinion.model.js"

export const saveComent = async(req, res)=>{
    try {
        //Capturar la data
        let data = req.body
        let { id } = req.user
        console.log(id)
        data.user = id
        //Validar que el keeper exista
        let Publicacion = await publicacionModel.findOne({_id: data.publicacion})
        let User = await userModel.findOne({_id: data.user})
        if(!Publicacion) return res.status(404).send({message: 'Publicación no encontrada'})
        if(!User) return res.status(404).send({message: 'Usuario no encontrado'})
        
        let opinion = new opinionModel(data)
        //Guardar
        await opinion.save()
        //Responder si todo sale bien
        return res.send({message: 'Se realizo el comentario'})
    } catch (error) {
        console.log(error)
        return res.status(500).send({message: 'No se pudo publicar pipipi'})
    }
}

export const deleteComent = async(req, res)=>{
    try{
        let { id } = req.params
        let deleteComent = await opinionModel.findOneAndDelete({_id: id})
        if(!deleteComent) return res.status(404).send({message: 'Comentario no encontrado'})
        return res.send({message: `Se elimino el comentario`})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error al borrar el comentario'})
    }
}