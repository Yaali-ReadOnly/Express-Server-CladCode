const Customer = require("../../models").Customers;
const customerProfile = require("../../models").customerProfile;

module.exports = {

    register(req, res) {
        console.log(req.body);
        return Customer.create(
            {
                username: req.body.username,
                password: req.body.password,
                register_source: req.body.register_source,
                user_status: req.body.user_status,
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
                console.log(error);

                res
                  .status(400)
                  .json({ message: error.errors[0].message, error: 'true' });
              });
    }

};