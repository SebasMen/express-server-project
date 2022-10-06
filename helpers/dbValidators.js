const Role = require('../models/role');
const User = require('../models/user')

const validRole = async(role = '') => {
  const existRole = await Role.findOne({role});
  if(!existRole) {
    throw new Error(`El role ${role} no esta registrado en DB`);
  }
}

const existEmail = async(email = '') => {
  const exitEmail = await User.findOne({ email });
  if(exitEmail) {
    throw new Error(`El email ${email} ya esta en uso`);
  }
}

const existUserId = async(id) => {
  const exitUserId = await User.findById(id);
  if(!exitUserId) {
    throw new Error(`El ID ${id} no existe`);
  }
}

module.exports = {
  validRole,
  existEmail,
  existUserId
}