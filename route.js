const express = require ('express');
const router = express.Router();
const { createUser,
    LoginUser,
    findDetails,
    UpdateUser,
    findImage,
    deleteUser
}=require('./controller/UserController')

const {authentication}= require('./middleware/authentication');

router.post('/insert', createUser);

router.get('/details', findDetails);

router.delete('/delete', deleteUser);

router.put('/update', authentication, UpdateUser);

router.get('/image', findImage);

router.post('/login', LoginUser);


module.exports = router