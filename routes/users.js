const { Router } = require('express');
const { body } = require('express-validator');

const { validFields } = require('../middlewares/validFields');

const { usersGet, 
        usersPost, 
        usersPut, 
        usersPatch,
        usersDelete } = require('../controllers/users');

const router = Router();

router.get('/', usersGet);
router.post('/', [
        body('name', 'El nombre es requerido').not().isEmpty(),
        body('password', 'La contraseña debe contener minimo 6 caracteres').isLength({ min: 6 }),
        body('email', 'El correo no es valido').isEmail(),
        body('role', 'El role no es valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
        validFields
], usersPost);
router.put('/:id', usersPut);
router.patch('/', usersPatch);
router.delete('/', usersDelete);

module.exports = router;