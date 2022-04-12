const { response } = require("express")

const esAdminRole = (req, res = response, next) =>{
    if( !req.usuario ){
        return res.status(500).json({
            msg: "Se require verificar el role sin validar el token primero"
        })
    }

    const { role, name } = req.usuario;

    if( role !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: `${name} no es administrador`
        })
    }
    next();
}


const tieneRole = ( ...roles  ) => {   
    return (req, res = response, next) => {
        
        if( !req.usuario ){
            return res.status(500).json({
                msg: "Se require verificar el role sin validar el token primero"
            })
        }

        if( !roles.includes(req.usuario.role ) ){
            return res.status(401).json({
                msg: `El servicio require uno de estos roles ${ roles }`
            })
        }    
        next();
    }
}


module.exports = {
    esAdminRole,
    tieneRole
}