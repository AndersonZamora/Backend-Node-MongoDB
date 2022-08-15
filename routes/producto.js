/*  Producto Routes
    api/producto
*/
const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { crearProducto, actualizarProducto, eliminarProducto, getProductos, getProductosTodos } = require('../controllers/producto');

const router = Router();

router.use(validarJWT);

// TODO: Obtener productos por usuario
router.get('/', getProductos);

// TODO: Obtener productos todos
router.get('/todos', getProductosTodos);

// TODO: Crear producto
router.post('/',
    [
        check('nombre', 'El nombre es obligatoria').not().isEmpty(),
        check('precio', 'El precio es obligatorio').not().isEmpty(),
        check('stock', 'El estock es obligatoria').not().isEmpty(),
        check('proveedor', 'El proveedor es obligatorio').not().isEmpty(),
        check('estado', 'El estado es obligatoria').not().isEmpty(),
        validarCampos
    ],
    crearProducto
);

// TODO: Actulaizar producto
router.put('/',
    [
        check('nombre', 'El nombre es obligatoria').not().isEmpty(),
        check('precio', 'El precio es obligatorio').not().isEmpty(),
        check('stock', 'El estock es obligatoria').not().isEmpty(),
        check('proveedor', 'El proveedor es obligatorio').not().isEmpty(),
        check('estado', 'El estado es obligatoria').not().isEmpty(),
        validarCampos
    ],
    actualizarProducto
);

// TODO: Eliminar convenio
router.delete('/:id', eliminarProducto);

module.exports = router;
