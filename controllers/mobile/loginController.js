const Customer = require("../../models").Customers;
const customerProfile = require("../../models").customerProfile;
const fs = require('fs');
const folderName = 'C:/Projects/Server/Express-Server-CladCode/public/customers/';
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
            .then(customer => {
                if(customer)
                {
                    dir= folderName+customer.id;
                    try {
                        if (!fs.existsSync(dir)){
                            fs.mkdirSync(dir);
                            fs.mkdirSync(dir+'/images');
                        }
                    } catch (err) {
                        console.error(err);
                    }
                }
                
                res.status(200).send(customer);
            })
            .catch(error => {
                console.log(error);

                res
                  .status(400)
                  .json({ message: error.errors[0].message, error: 'true' });
              });
    }

};