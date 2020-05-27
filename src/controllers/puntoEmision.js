const mysqlConnection = require('../database.js');
const obtenerJsonRes = require('./respuestaJSON.js');

const obtenerPtoEmision = async (req, res) => {
    const {user_id} = req.params;
    mysqlConnection.query('select user_id,establecimiento_id,nombre,codigo,secuencialFactura,activo from ptoemision where user_id=?', user_id, (err, rows, fields) => {
        if (!err) {
            if (rows.length) {
                estado = 200;
                mensaje = 'Punto de emision encontrado satisfactoriamente.';
                autorizacion=""
                res.status(estado).json(obtenerJsonRes(mensaje, autorizacion, rows[0]));
            } else {
                estado = 200;
                mensaje = 'No se encontro ningún punto de emision.';
                autorizacion=""
                res.status(estado).json(obtenerJsonRes(mensaje, autorizacion, rows));
            }
        } else {
            estado = 401;
            mensaje = 'No se pudo conectar con el servidor.';
            res.status(estado).json(obtenerJsonRes(mensaje, autorizacion, rows));
        }
    });
}


exports.obtenerPtoEmision = obtenerPtoEmision;