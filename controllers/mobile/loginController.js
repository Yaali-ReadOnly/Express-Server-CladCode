const Customer = require("../../models").Customers;
const customerProfile = require("../../models").customerProfile;

module.exports = {

    register(req, res) {
        console.log(req.body);
        return Customer.create(
            {
                username: req.body.username,
                password: req.body.password,
                customerProfile: req.body.customer_profiles
            },
            {
              include: [
                {
                    model: customerProfile,
                    as: "customerProfile"
                }
              ]
            }
        )
            .then(customer => res.status(200).send(customer))
            .catch(error => {
                console.log(error.errors[0].message);

                res
                  .status(400)
                  .json({ message: error.errors[0].message, error: 'true' });
              });
    }

};