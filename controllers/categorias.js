const { response, request } = require("express");
const { Categoria } = require("../models");


//Obtener catgeorias - paginado - total - populate
const obtenerCategorias = async (req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true }

    const [ total, categoria ] = await Promise.all([
        Categoria.countDocuments( query ),
        Categoria.find( query )
            .populate('usuario', 'name')
            .skip( Number(desde) )
            .limit( Number(limite) )
    ])

    res.status(200).json({
        total,
        categoria
    })

}


//obtenerCategoria - populate
const obtenerCategoria = async (req, res = response) =>{

    const { id } = req.params;

    const categoria = await Categoria.findById( id )
        .populate('usuario','name');

    res.json({
        ok: true,
        categoria
    })

}



const crearCategoria = async (req, res = response) =>{

    const nombre = req.body.nombre.toUpperCase();

    const categoriaBD = await Categoria.findOne({ nombre });
    if( categoriaBD ){
        return res.status(400).json({
            ok: false,
            msg: `La Categoria ${ categoriaBD.nombre }, ya existe`
        });
    }

    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = await new Categoria( data );

    await categoria.save();

    res.status(201).json(categoria);
}

const actualizarCategoria = async (req, res = response) => {
    
    
    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id

    const categoria = await Categoria.findByIdAndUpdate( id, data, { new: true })

    res.json({
        ok: true,
        categoria
    })

}

//borrar categorias state false
const borrarCategoria = async (req, res) => {

    const { id } = req.params;

    const categoriaBorrada = await Categoria.findByIdAndUpdate( id, { estado: false }, { new: true })

    res.json({
        ok: true,
        categoriaBorrada
    })

}


module.exports = {
    obtenerCategorias,
    obtenerCategoria,
    crearCategoria,
    actualizarCategoria,
    borrarCategoria
}