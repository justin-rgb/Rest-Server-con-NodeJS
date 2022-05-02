const { Categoria, Producto } = require('../models');
const Role = require('../models/role');
const Usuario = require('../models/usuario')

const esRoleValido = async (role = '') =>{
    const existeRol = await Role.findOne({ role });
    if ( !existeRol ) {
        throw new Error(`El rol ${ role } no está registrado en la BD`);
    }
}

const emailExiste = async (email = '') =>{
    const existeEmail = await Usuario.findOne({ email })
    if( existeEmail ){
        throw new Error('El Correo registrado ya existe')
    }
}

const existeUsuarioPorId = async ( id ) =>{
    const existeUsuario = await Usuario.findById(id);
    if( !existeUsuario ){
        throw new Error(`El ID ${ id } no existe`);
    }

}


const existeCategoriaPorId = async ( id ) =>{
    const existeCategoria = await Categoria.findById(id);
    if( !existeCategoria ){
        throw new Error(`El ID ${ id } no existe`);
    }

}

const existeProductoPorId = async ( id ) =>{
    const existeProducto = await Producto.findById(id);
    if( !existeProducto ){
        throw new Error(`El ID ${ id } no existe`);
    }

}

const coleccionesPermitidas = async ( coleccion = '', colecciones = [] ) => {

    const incluida = coleccion.includes( coleccion );
    if( !incluida ){
        throw new Error(`La coleccion ${coleccion} no es permitida ${colecciones}`)
    }
    return true;
}

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId,
    coleccionesPermitidas
}