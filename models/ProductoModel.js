const { Schema, model } = require('mongoose');

const ProductoSchema = Schema({
    nombre: {
        type: String,
        required: true,
    },
    precio: {
        type: String,
        required: true,
    },
    stock: {
        type: String,
        required: true,
    },
    proveedor: {
        type: String,
        required: true,
    },
    estado: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
    }
});

ProductoSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model('Producto', ProductoSchema);
