const mysqlConnection = require('../database.js');

const obtenerJsonRes = require('./respuestaJSON.js');

const obtenerClientes = async (req, res) => {
    const { emisor_id, autorizacion } = req.body;
    mysqlConnection.query('select id,nombre,identificacion,celular,correoElectronico from cliente where emisor_id=?', emisor_id, (err, rows, fields) => {
        if (!err) {
            if (rows.length) {
                estado = 200;
                mensaje = 'Clientes encontrados satisfactoriamente.';
                res.status(estado).json(obtenerJsonRes(mensaje, autorizacion, rows));
            } else {
                estado = 200;
                mensaje = 'No se encontro ningún cliente.';
                res.status(estado).json(obtenerJsonRes(mensaje, autorizacion, rows));
            }
        } else {
            estado = 401;
            mensaje = 'No se pudo conectar con el servidor.';
            res.status(estado).json(obtenerJsonRes(mensaje, autorizacion, rows));
        }
    });

}


module.exports = obtenerClientes;