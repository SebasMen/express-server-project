// Nos permite tener el tipado
const { request, response } = require('express');

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

const usersPost = (req, res = response) => {
  // En el body viene la informacion
  const { name, age } = req.body;

  res.status(201).json({
    msg: 'post API - controller',
    name,
    age
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