'use strict'

import userModel from '../user/user.model.js'
import Publicacion from './publicacion.model.js'
import categoriaModelo from '../categoria/categoria.model.js'

export const test = (req, res)=>{
    return res.send({message: 'está funcionando'})
}

export const savePubli = async(req, res)=>{
    try {
        //Capturar la data
        let data = req.body
        let { id } = req.user
        console.log(id)
        data.user = id
        //Validar que el keeper exista
        let Categoria = await categoriaModelo.findOne({_id: data.categoria})
        let User = await userModel.findOne({_id: data.user})
        if(!Categoria) return res.status(404).send({message: 'categoria no encontrada'})
        if(!User) return res.status(404).send({message: 'Usuario no encontrado'})
        
        let publicacion = new Publicacion(data)
        //Guardar
        await publicacion.save()
        //Responder si todo sale bien
        return res.send({message: 'Publicación hecha'})
    } catch (error) {
        console.log(error)
        return res.status(500).send({message: 'No se pudo publicar pipipi'})
    }
}

export const updatePubli = async(req,res)=>{
    try {
        let { uid } = req.params
        let datos = req.body
        let { id }  = req.user
        datos.user = id
        let publicacion = await Publicacion.findOne({_id: uid})
        if(!publicacion) return res.status(404).send({message:'No se encontro una publicacion'})
        let categoria = await categoriaModelo.findOne({_id: datos.categoria})
        if(!categoria) return res.status(403).send({message: 'No se encontro la categoria'})
        if(publicacion.user == id){
             let actualizarPublicacion = await Publicacion.findOneAndUpdate(
            {_id: uid},
            datos,
            {new: true}
        )
        if(!actualizarPublicacion)return res.status(401).send({message: ' No se pudo realizar la actualización'})
            return res.send({message: 'Actualizado',actualizarPublicacion})
        }else {
            return res.status(401).send({message:'No se puede actualizar una publicacion que no es tuya'})
        }
          } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error al actualizar la publicacion'})
    }
}

