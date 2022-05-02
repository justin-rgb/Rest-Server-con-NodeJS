const { Router } = require('express');
const { check } = require('express-validator');
const { obtenerProducto, obtenerProductos, crearProducto, actualizarProducto, borrarProducto } = require('../controllers/productosController');
const { existeProductoPorId, existeCategoriaPorId } = require('../helpers/db_validators');
const { validarJWT, esAdminRole } = require('../middlewares');
const { validarCampos } = require('../middlewares/validar_campos');

const router = Router();

/*
    {{url}}/api/productos
*/

router.get('/', obtenerProductos )

//Obtener una categoria - publico
router.get('/:id', [
    check('id','No es un ID valido').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos
], obtenerProducto )


//Crear categoria - privado
router.post('/', [
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('categoria','No es un ID valido').isMongoId(),
    check('categoria').custom( existeCategoriaPorId ),
    validarCampos
], crearProducto )

//Actualizar - privado - cualquiera con token valido
router.put('/:id', [
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('id').custom( existeProductoPorId ),
    validarCampos
], actualizarProducto )

//Borrar una categoria
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id','No es un ID valido').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos
], borrarProducto )



module.exports = router;