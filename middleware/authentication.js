const jwt= require('jsonwebtoken');

const authentication = async function (req, res, next) {
    try {
        const token = req.headers["x-api-key"];
        if (!token) {
            return res.status(404).send({ status: false, message: "error ,token is missing" });
        }

            const decodedToken = jwt.verify(token, 'thisismysecretkey');
            req.decodedToken = decodedToken.authorId;
            next();
            
    } catch (error) {
      return res.status(401).send({ status: false, message: "token is invalid" });
       
    }
}

module.exports= authentication