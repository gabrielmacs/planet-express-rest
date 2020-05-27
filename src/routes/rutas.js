const express = require('express');
const router = express.Router();
const rutasUsuario=require('../controllers/usuario')
const rutasProducto=require('../controllers/producto')
const rutasCliente=require('../controllers/cliente')
const rutasFactura=require('../controllers/factura')
const rutasPuntosEmision=require('../controllers/puntoEmision')

const verificarToken = require('../authentication/verificarToken');

//Usuario
router.post('/loginUsuario',rutasUsuario);
//Producto
router.post('/obtenerProductos',rutasProducto.obtenerProductos);
router.post('/crearProducto',rutasProducto.crearProducto);
//Cientes
router.post('/obtenerClientes',rutasCliente.obtenerClientes);
router.post('/crearCliente',rutasCliente.crearCliente);
//factura
router.post('/crearFactura',rutasFactura.crearFactura);
//punto de emision
//router.get('/obtenerPtoEmision/:user_id',rutasPuntosEmision.obtenerPtoEmision);

module.exports = router;