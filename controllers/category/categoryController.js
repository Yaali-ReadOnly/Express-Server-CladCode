const Category = require("../../models").Category;
const ParentCategory = require("../../models").ParentCategory;
const GroupCategory = require("../../models").GroupCategory;
const Cat_Attribute = require("../../models").Cat_Attribute;
const Cat_Option = require("../../models").Cat_Option;
const SpecHeader = require("../../models").SpecHeader;
const FeebackPoint = require("../../models").FeebackPoint;
const FB_Option_Map = require("../../models").FB_Option_Map;

module.exports = {
  list(req, res) {
    return Category.findAll({
      include: [
        {
          model: ParentCategory,
          as: "parent_category"
        },
        {
          model: GroupCategory,
          as: "group_category"
        },
        {
          model: SpecHeader,
          as: "spec_header"
        },
        {
          model: Cat_Attribute,
          as: "attributes",
          include: [
            {
              model: Cat_Option,
              as: "options"
            }
          ]
        }
      ]
    })
      .then(categories => res.status(200).send(categories))
      .catch(error => {
        res.status(400).send(error);
      });
  },
  getCategoryLevel(req, res) {
    return Category.findAll({
      include: [
        {
          model: ParentCategory,
          as: "parent_category"
        },
        {
          model: GroupCategory,
          as: "group_category"
        }
      ]
    })
      .then(levels => res.status(200).send(levels))
      .catch(error => {
        res.status(400).send(error);
      });
  },

  getById(req, res) {
    return Promise.all([
      Category.findByPk(req.params.id, {
        include: [
          {
            model: ParentCategory,
            as: "parent_category"
          },
          {
            model: GroupCategory,
            as: "group_category"
          },
          {
            model: Cat_Attribute,
            as: "attributes",
            include: [
              {
                model: Cat_Option,
                as: "options"
              }
            ]
          },
          {
            model: FeebackPoint,
            as: "feedbackpoints",
            include: [
              {
                model: FB_Option_Map,
                as: "fb_maps"
              }
            ]
          },
        ]
      }),
      SpecHeader.findAll({})
    ])
      .then(category => {
        if (!category) {
          return res.status(404).send({
            message: "Category Not Found"
          });
        }
        let obj ={};
            obj['category']= category[0];
            obj['spec_header']= category[1];
        return res.status(200).send(obj);
      })
      .catch(error => res.status(400).send(error));
  }
};
