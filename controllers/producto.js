const ProductoModel = require('../models/ProductoModel');
const { response } = require('express');

const getProductosTodos = async (req, res = response) => {

    try {

        const productos = await ProductoModel.find().populate('user', 'name');

        res.json({
            ok: true,
            productos
        });

    } catch (error) {

        res.status(404).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};

const getProductos = async (req, res = response) => {

    try {

        const uid = req.uid;
        const productos = await ProductoModel.find({ user: uid }).populate('user', 'name')

        res.json({
            ok: true,
            productos
        });

    } catch (error) {
        res.status(404).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};

const crearProducto = async (req, res = response) => {

    const producto = new ProductoModel(req.body);

    try {

        producto.user = req.uid;
        const productoGuardado = await producto.save();

        res.json({
            ok: true,
            msg: 'crearProducto',
            productoGuardado
        });

    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};

const actualizarProducto = async (req, res = response) => {

    const { id: productoId } = req.body;
    const uid = req.uid;
    
    try {

        const producto = await ProductoModel.findById(productoId);

        if (!producto) {
            return res.status(404).json({
                ok: false,
                msg: 'Producto no existe'
            });
        }

        if (producto.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tine privilegios de editar este producto',
            });
        }

        const nuevoProducto = {
            ...req.body,
            user: uid,
        };


        const productoActualizado = await ProductoModel.findByIdAndUpdate(productoId, nuevoProducto, { new: true });

        res.json({
            ok: true,
            producto: productoActualizado
        });

    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};

const eliminarProducto = async (req, res = response) => {

    const productoId = req.params.id;
    const uid = req.uid;

    try {

        const producto = await ProductoModel.findById(productoId);

        if (!producto) {
            return res.status(404).json({
                ok: false,
                msg: 'Producto no existe con ese id'
            });
        }

        if (producto.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tine privilegios para eliminar este producto',
            });
        }

        await ProductoModel.findByIdAndDelete(productoId)

        res.json({ ok: true });

    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};

module.exports = {
    actualizarProducto,
    crearProducto,
    eliminarProducto,
    getProductos,
    getProductosTodos,
};
