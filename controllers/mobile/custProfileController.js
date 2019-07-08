const customerProfile = require('../../models').customerProfile;
const Customers = require('../../models').Customers;

module.exports = {
  list(req, res) {
    return customerProfile
      .findAll({
        include: [{
          model: Customers,
          as: 'customers'
        }],
      })
      .then((profiles) => res.status(200).send(profiles))
      .catch((error) => { res.status(400).send(error); });
  },

  getById(req, res) {
    return customerProfile
      .findById(req.params.id, {
        include: [{
          model: Customers,
          as: 'customers'
        }],
      })
      .then((profile) => {
        if (!profile) {
          return res.status(404).send({
            message: 'customerProfile Not Found',
          });
        }
        return res.status(200).send(profile);
      })
      .catch((error) => res.status(400).send(error));
  },

  add(req, res) {
    return customerProfile
      .create({
        user_id: req.body.user_id,
        fullname: req.body.fullname,
        birthdate: req.body.birthdate,
        gender: req.body.gender,
        position: req.body.position,

        phone: req.body.phone,
        profilePic: req.body.profilePic,
        addressLine1: req.body.addressLine1,
        addressLine2: req.body.addressLine2,
        city: req.body.city,
        state: req.body.state,
        zipcode: req.body.zipcode,
        country: req.body.country
      })
      .then((profile) => res.status(201).send(profile))
      .catch((error) => res.status(400).send(error));
  },

  update(req, res) {
    return customerProfile
      .findById(req.params.id, {
        include: [{
          model: Customers,
          as: 'customers'
        }],
      })
      .then(profile => {
        if (!profile) {
          return res.status(404).send({
            message: 'customerProfile Not Found',
          });
        }
        return profile
          .update({
            user_id: req.body.user_id || profile.user_id,
            fullname: req.body.fullname || profile.fullname,
            birthdate: req.body.birthdate || profile.birthdate,
            gender: req.body.gender || profile.gender,
            position: req.body.position || profile.position,

    phone: req.body.phone || profile.phone,
    profilePic: req.body.profilePic || profile.profilePic,
    addressLine1: req.body.addressLine1 || profile.addressLine1,
    addressLine2: req.body.addressLine2 || profile.addressLine2,
    city: req.body.city || profile.city,
    state: req.body.state || profile.state,
    zipcode: req.body.zipcode || profile.zipcode,
    country: req.body.country || profile.country
          })
          .then(() => res.status(200).send(profile))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  delete(req, res) {
    return customerProfile
      .findById(req.params.id)
      .then(profile => {
        if (!profile) {
          return res.status(400).send({
            message: 'customerProfile Not Found',
          });
        }
        return profile
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};