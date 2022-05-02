const { Producto } = require("../models");


const obtenerProductos = async (req = request, res = response) => {
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true }

    const [ total, producto ] = await Promise.all([
        Producto.countDocuments( query ),
        Producto.find( query )
            .populate('categoria', 'nombre')
            .populate('usuario', 'name')
            .skip( Number(desde) )
            .limit( Number(limite) )
    ])
    res.status(200).json({
        total,
        producto
    })
}


const obtenerProducto = async (req, res = response) =>{
    const { id } = req.params;

    const producto = await Producto.findById( id )
        .populate('categoria','name')
        .populate('usuario', 'name');

    res.json({
        ok: true,
        producto
    })
}


const crearProducto = async (req, res = response) =>{

    const { estado, usuario, ...body } = req.body;

    const productoBD = await Producto.findOne({ nombre: body.nombre });

    if( productoBD ){
        return res.status(400).json({
            ok: false,
            msg: `El producto ${ productoBD.nombre }, ya existe`
        });
    }

    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id
    }

    const producto = await new Producto( data );

    await producto.save();

    res.status(201).json({
        ok: true,
        producto
    });
}


const actualizarProducto = async (req, res = response) => {
    const { id } = req.params;
    const { estado, usuario, categoria, ...data } = req.body;

    if( data.nombre ){
        data.nombre = data.nombre.toUpperCase();
    }
    
    data.usuario = req.usuario._id

    const producto = await Producto.findByIdAndUpdate( id, data, { new: true })

    res.json({
        ok: true,
        producto
    })
}


const borrarProducto = async (req, res) => {

    const { id } = req.params;

    const productoBorrado = await Producto.findByIdAndUpdate( id, { estado: false }, { new: true })

    res.json({
        ok: true,
        productoBorrado
    })

}



module.exports = {
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    borrarProducto
}