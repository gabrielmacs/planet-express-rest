
const obtenerJsonRespuesta=(message, autorizacion, data) => {
    jsonRespuesta = {
        message,
        body: { 
            autorizacion,
            data,
        }
    };
    return jsonRespuesta;
}

module.exports = obtenerJsonRespuesta;