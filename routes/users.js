const { Router } = require('express');
const { body, param } = require('express-validator');

const { validFields } = require('../middlewares/validFields');
const { validRole, existEmail, existUserId } = require('../helpers/dbValidators');

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
    body('email').isEmail(),
    body('email').custom(existEmail),
    body('role').custom(validRole),
    validFields
], usersPost);

router.put('/:id', [
  param('id', 'No es un id valido').isMongoId(),
  param('id').custom(existUserId),
  body('role').custom(validRole),
  validFields
], usersPut);

router.patch('/', usersPatch);
router.delete('/', usersDelete);

module.exports = router;