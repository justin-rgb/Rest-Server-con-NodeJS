

const validarJWT = require('../middlewares/validar-jwt');
const validaRoles = require('../middlewares/validar-roles');
const validarCampos = require('../middlewares/validar_campos');
const validarArchivo = require('./validar-archivo')

module.exports = {
    ...validaRoles,
    ...validarCampos,
    ...validarJWT,
    ...validarArchivo
}
