const { response } = require('express');
const bcryptj = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        let usuario = await Usuario.findOne({ email });
        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Un usuario ya existe con ese correo'
            });
        }

        usuario = new Usuario(req.body);

        // TODO: Incriptar contraseña
        const salt = bcryptj.genSaltSync();
        usuario.password = bcryptj.hashSync(password, salt);

        await usuario.save();

        // TODO: Generar jwt
        const token = await generarJWT(usuario.id, usuario.name)

        res.status(201).json({
            "ok": true,
            uid: usuario.id,
            name: usuario.name,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }
};

const loginUsuario = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Un usuario no existe con ese email'
            });
        }

        // TODO: Confirmar los passwords

        const validPassword = bcryptj.compareSync(password, usuario.password)
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            });
        };

        // TODO: Generar jwt
        const token = await generarJWT(usuario.id, usuario.name)

        res.status(201).json({
            "ok": true,
            uid: usuario.id,
            name: usuario.name,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }
};

const revalidarToken = async (req, res = response) => {

    const { uid, name } = req;

    try {
        // TODO: Generar jwt
        const token = await generarJWT(uid, name);
        
        return res.json({
            "ok": true,
            uid,
            name,
            token
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Token no valido'
        })
    }

};

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}
