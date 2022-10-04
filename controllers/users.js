// Nos permite tener el tipado
const { request, response } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');

const usersGet = (req = request, res = response) => {
  //const query = req.query;
  const { q, name = 'No name', apiKey } = req.query;

  res.json({
    msg: 'get API - controller',
    q,
    name,
    apiKey
  })
}

const usersPost = async(req, res = response) => {
  // En el body viene la informacion
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });

  // verificar si el correo existe
  const exitEmail = await User.findOne({ email });
  if(exitEmail) {
    return res.status(400).json({
      msg: 'El correo ya esta en uso'
    });
  }

  // Encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  await user.save();

  res.status(201).json({
    msg: 'post API - controller',
    user
  })
}

const usersPut = (req, res = response) => {
  const { id } = req.params;

  res.status(201).json({
    msg: 'put API - controller',
    id
  })
}

const usersPatch = (req,res = response) => {
  res.status(201).json({
    ok: true,
    msg: 'patch API - controller'
  })
}

const usersDelete = (req,res = response) => {
  res.status(201).json({
    ok: true,
    msg: 'delete API - controller'
  })
}

module.exports = {
  usersGet,
  usersPost,
  usersPut,
  usersPatch,
  usersDelete
}