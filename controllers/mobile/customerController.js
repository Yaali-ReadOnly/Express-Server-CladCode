const Customer = require('../../models').Customers;
const customerProfile = require('../../models').customerProfile;

module.exports = {
  list(req, res) {
    return Customer
      .findAll({
        attributes: { exclude: ['password'] },
        include: [{
          model: customerProfile,
          as: 'customerprofile'
        }],
      })
      .then((customers) => res.status(200).send(customers))
      .catch((error) => { res.status(400).send(error); });
  },

  getById(req, res) {
    console.log('cust cont ',req);
    return Customer
      .findById(req.params.id, {
        include: [{
          model: customerProfile,
          as: 'customerprofile'
        }],
      })
      .then((customer) => {
        if (!customer) {
          return res.status(404).send({
            message: 'Customer Not Found',
          });
        }
        return res.status(200).send(customer);
      })
      .catch((error) => res.status(400).send(error));
  },

  add(req, res) {
    return Customer
      .create({
        username: req.body.username,
        password: req.body.password,
      })
      .then((customer) => res.status(201).send(customer))
      .catch((error) => res.status(400).send(error));
  },

  update(req, res) {
    return Customer
      .findById(req.params.id, {
        include: [{
          model: customerProfile,
          as: 'profile'
        }],
      })
      .then(customer => {
        if (!customer) {
          return res.status(404).send({
            message: 'Customer Not Found',
          });
        }
        return customer
          .update({
            username: req.body.username || customer.username,
            password: req.body.password || customer.password,
          })
          .then(() => res.status(200).send(customer))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  delete(req, res) {
    return Customer
      .findById(req.params.id)
      .then(customer => {
        if (!customer) {
          return res.status(400).send({
            message: 'Customer Not Found',
          });
        }
        return customer
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};