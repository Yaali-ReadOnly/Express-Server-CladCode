const User = require("../../models").User;
const Profile = require("../../models").Profile;
const Role = require("../../models").Role;
const Brand = require("../../models").Brand;
const Role_Defaultviews = require("../../models").Role_Defaultviews;
const User_Privileges = require("../../models").User_Privileges;
const RoleAccessTabs = require("../../models").RoleAccessTabs;
const UserAccessTabs = require("../../models").UserAccessTabs;

var _ = require("lodash");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports = {
  list(req, res) {
    return User.findAll({
      attributes: { exclude: ['password'] },
      include: [
        {
          model: Profile,
          as: "profile"
        },
        {
          model: Role,
          as: "role"
        },
        {
          model: Brand,
          as: "brand"
        }
      ]
    })
      .then(users => res.status(200).send(users))
      .catch(error => {
        res.status(400).send(error);
      });
  },

  //brand wise users list without superadmin role
  getuserbybrandlist(req, res) {
    return User
      .findAll({
        attributes: { exclude: ['password'] },
        where: {
          brand_id: {
            [Op.eq]: req.params.id
          },
          role_id: {
            [Op.ne]: 2
          }
        },
        include: [
          {
            model: Profile,
            as: "profile"
          },
          {
            model: Role,
            as: "role"
          }
        ]
      })
      .then((users) => res.status(200).send(users))
      .catch((error) => { res.status(400).send(error); });
  },

  getById(req, res) {
    return User.findByPk(req.params.id, {
      include: [
        {
          model: Profile,
          as: "profile"
        },
        {
          model: Role,
          as: "role"
        },
        {
          model: Brand,
          as: "brand"
        },
        // {
        //   model: User_Privileges,
        //   as: "userprivileges"
        // }
      ]
    })
      .then(user => {
        if (!user) {
          return res.status(404).send({
            message: "User Not Found"
          });
        }
        return res.status(200).send(user);
      })
      .catch(error => res.status(400).send(error));
  },

  add(req, res) {
    return User.create({
      username: req.body.username,
      password: req.body.password,
      brand_id: req.body.brand_id,
      role_id: req.body.role_id,
      profile: req.body.profile
    },
    {
      include: [
            {
              model: Profile,
              as: "profile"
            }
      ]
    })
      .then(user => {
          //create user based privileges
          Role_Defaultviews.findAll({
            attributes: { exclude: ['createdAt','updatedAt'] },
            where: {
              role_id: user.role_id,
              type: {
                [Op.or]: ["brand", "common"]
              },
            }
          })
          .then(privileges =>
            {
              let data={user:user, data: privileges};
              res.status(201).send(data);

              privileges.forEach((roleprivileges) => {
                return User_Privileges.create(
                  {
                    user_id: user.id,
                    role_id: user.role_id,
                    parentmodule_id: roleprivileges['parentmodule_id'],
                    childmodule_id: roleprivileges['childmodule_id'],
                    moduleaccess_id: roleprivileges['moduleaccess_id'],                   
                    tab_id: roleprivileges['id'],
                    name: roleprivileges['name'],
                    access: roleprivileges['access'],
                    default_access: roleprivileges['default_access'],
                    type: roleprivileges['type'],
                    view: roleprivileges['view'],
                    create: roleprivileges['create'],
                    edit: roleprivileges['edit'],
                    delete:roleprivileges['delete'],
                    all: roleprivileges['all']
                  })
                  .then(userprivileges => { //console.log(userprivileges);
                  })
                  .catch(error => { // res.status(400).send(error); 
                  });
              })
              
            })
          //user privileges ends         
      })
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    return User.findByPk(req.params.id)
      .then(user => {
        if (!user) {
          return res.status(404).send({
            message: "User Not Found"
          });
        }
        return user
          .update({
            username: req.body.username || user.username,
            password: req.body.password || user.password
          })
          .then((user) => res.status(200).send(user))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },

  delete(req, res) {
    return User.findByPk(req.params.id)
      .then(user => {
        if (!user) {
          return res.status(400).send({
            message: "User Not Found"
          });
        }
        return user
          .destroy()
          .then(() => res.status(204).send())
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }
};
