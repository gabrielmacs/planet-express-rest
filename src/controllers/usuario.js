var crypto = require('crypto');
require('dotenv');
var jwt = require('jsonwebtoken');

const mysqlConnection = require('../database.js');



const loginUsuario = async (req, res) => {
  const { username, password } = req.body;
  mysqlConnection.query('SELECT user.id, user.emisor_id, user.rol_id,user.username,user.password,user.email,user.nombre,user.apellidos,user.salt,user.is_active,emisor.ruc,emisor.razonSocial,emisor.nombreComercial,emisor.direccionMatriz from user  INNER JOIN role on user.emisor_id = role.id INNER JOIN emisor on user.emisor_id = emisor.id where username=?', username.trim(), (err, rows, fields) => {
    if (!err) {
      try {
        if (encryptPassword(password.trim(), rows[0].salt) == rows[0].password) {
          const token = jwt.sign({ _id: rows[0].username }, process.env.TOKEN_SECRETO || "PlanetExpresSA+4[|Uracion")

          estado = 200;
          mensaje = 'Usuario logeado con éxito';
          autorizacion = token;
          usuarios = rows[0];
          res.status(estado).json(obtenerJsonRespuesta(mensaje, autorizacion, data));
        } else {
          estado = 401; mensaje = 'El password no coincide con el del usuario ' + rows[0].username; autorizacion = token; usuarios = "";
          res.status(estado).json(obtenerJsonRespuesta(mensaje, autorizacion, data));
        }
      } catch (error) {

        estado = 401;
        mensaje = 'No se encontró en la BDD el usuario  ' + username;
        autorizacion = "";
        usuarios = "";
        res.status(estado).json(obtenerJsonRespuesta(mensaje, autorizacion, data));
      }



    } else {
      console.log(err);
      estado = 404;
      mensaje = 'No se pudo conectar a la BDD';
      autorizacion = "";
      usuarios = "";
      res.status(estado).json({
        message: mensaje,
        body: {
          autorizacion: autorizacion,
          usuarios: usuarios
        }
      })
    }
  });

}




function encryptPassword(password, salt) {
  var salted = `${password}{${salt}}`;

  if (!salt) {
    salted = password;
  }
  var digest = crypto.createHash('sha512').update(salted).digest('binary');
  for (var i = 1; i < 10; i++) {
    digest = crypto.createHash('sha512').update(Buffer.concat([Buffer.from(digest, 'binary'), Buffer.from(salted, 'utf8')])).digest('binary');
  }
  return (Buffer.from(digest, 'binary')).toString('base64');
};



function obtenerJsonRespuesta(message, autorizacion, data) {
  jsonRespuesta = {
    message: mensaje,
    body: {
      autorizacion: autorizacion,
      usuarios: usuarios
    }
  }
  return jsonRespuesta;
}



module.exports = loginUsuario;