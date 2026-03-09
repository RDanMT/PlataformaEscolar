const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    // Obtener el token del header
    const token = req.header('Authorization');

    // Si no hay token, acceso denegado
    if (!token) {
        return res.status(401).json({ msg: 'No token, autorización denegada' });
    }

    try {
        // Verificar token (esperamos formato "Bearer <token>")
        const tokenPart = token.split(' ')[1] || token;
        const decoded = jwt.verify(tokenPart, process.env.JWT_SECRET);

        // Setear el usuario en la request
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'El token no es válido' });
    }
};
