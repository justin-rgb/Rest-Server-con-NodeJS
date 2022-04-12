const { response, request } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');

const usuariosGet = async (req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { state: true }

    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments( query ),
        Usuario.find( query )
            .skip( Number(desde) )
            .limit( Number(limite) )
    ])

    res.json({
        total,
        usuarios
    })
}

const usuariosPost = async (req, res = response) =>{
    
    const { name, email, password, role } = req.body;
    const usuario = new Usuario({ name, email, password, role });

    //Encriptar contrasna
    const salt = bcrypt.genSaltSync(10);
    usuario.password = bcrypt.hashSync( password, salt )

    //Guardar en BD
    await usuario.save();

    res.json({
        "ok": true,
        usuario
    })

}

const usuariosPut = async (req, res = response) =>{

    const { id } = req.params;
    const { _id, password, google, email, ...resto } = req.body;

    // Validar contra BD
    if (password){
        const salt = bcrypt.genSaltSync(10);
        resto.password = bcrypt.hashSync( password, salt )
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        "ok": true,
        usuario
    })
}

const usuariosDelete = async (req, res = response) =>{
    
    const { id } = req.params;  
    const usuario = await Usuario.findByIdAndUpdate( id, {state: false} );

    res.json({
        "ok": true,
        "msg": "El usuario " + usuario.email + " ha sido eliminado",
        usuario       
    })
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}