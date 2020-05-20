const express = require('express');
const router = express.Router();
const rutasUsuario=require('../controllers/usuario')
const rutasProducto=require('../controllers/producto')
const rutasCliente=require('../controllers/cliente')
const verificarToken = require('../authentication/verificarToken');

//Usuario
router.post('/loginUsuario',rutasUsuario);
//Producto
router.post('/obtenerProductos',rutasProducto);
//Cientes
router.post('/obtenerClientes',rutasCliente);


module.exports = router;