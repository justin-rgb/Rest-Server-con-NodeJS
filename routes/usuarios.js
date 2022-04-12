const { Router } = require('express');
const { check } = require('express-validator');
const { usuariosGet, usuariosPost, usuariosDelete, usuariosPut } = require('../controllers/usuariosController');
const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db_validators');

const { validarCampos, validarJWT, tieneRole, esAdminRole } = require('../middlewares')

const router = Router();

router.get('/', usuariosGet)

router.post('/',[
    check('name','El Nombre es obligatorio').not().isEmpty(),
    check('password','La Contraseña debe contener más de 6 letras').isLength({ min: 6 }),
    check('email', 'El Correo no es válido').isEmail(),
    check('email').custom( emailExiste ),   
    check('role').custom( esRoleValido ),
    validarCampos
], usuariosPost)

router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    check('role').custom( esRoleValido ),
    validarCampos
], usuariosPut)

router.delete('/:id',[
    validarJWT,
    //esAdminRole,
    tieneRole('ADMIN_ROLE', 'VENTAS_ROLE'),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
], usuariosDelete)

module.exports=router;