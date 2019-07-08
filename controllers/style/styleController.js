const Category = require("../../models").Category;
const Style = require("../../models").Style;
const Sty_Attribute = require("../../models").Sty_Attribute;
const Sty_Option = require("../../models").Sty_Option;
const Spec_Gradient = require("../../models").Spec_Gradient;

var _ = require("lodash");

module.exports = {
  list(req, res) {
    console.log(
      "req body ========",
      req.query,
      "brand id =======",
      req.user.brand_id
    );
    /* return Style.findAll({ 
      where: req.query,
      limit: 5,
      offset: 2
     })
      .then(styles => res.status(200).send(styles))
      .catch(error => {
        res.status(400).send(error);
      }); */

    let limit = req.query.limit; // number of records per page
    let offset = 0;
    Style.findAndCountAll({
      where: { category_id: req.query.category_id, brand_id: req.user.brand_id }
    })
      .then(data => {
        let page = req.query.page; // page number
        let pages = Math.ceil(data.count / limit);
        offset = limit * (page - 1);
        Style.findAll({
          where: {
            category_id: req.query.category_id,
            brand_id: req.user.brand_id
          },
          attributes: ["id", "style_name", "style_code", "category_id"],
          limit: limit,
          offset: offset,
          $sort: { id: 1 }
        }).then(style => {
          res.status(200).json({
            data: { styles: style, count: data.count, pages: pages },
            status: "success"
          });
        });
      })
      .catch(function(error) {
        res.status(500).send("Internal Server Error");
      });
  },

  add(req, res) {
    //console.log("req body ========", req.user);

    let _style = {
      brand_id: req.user.brand_id,
      category_id: req.body.category.id,
      collection_id: req.body.collection_id,
      washcare_id: req.body.washcare_id,
      creator_user_id: req.user.id,
      style_name: req.body.style_name,
      style_code: req.body.style_code,
      season: req.body.season,
      description: req.body.description,
      sty_attributes: req.body.attributes,
      spec_gradient: req.body.specMeasurement
    };

    var specGradients = _.map(_style.spec_gradient, v =>
      _.assign({}, v, {
        category_id: _style.category_id,
        brand_id: req.user.brand_id
      })
    );
    _style.spec_gradient = specGradients;

    var styAttribute = _.map(_style.sty_attributes, a =>
      _.assign({}, a, { 
        brand_id: req.user.brand_id, 
        attribute_id: a.id,
        sty_options: _.map(a.sty_options, o =>
          _.assign({}, o, {
            option_id: o.id,
            brand_id: req.user.brand_id
          })
        )
      })
    );
    _style.sty_attributes = styAttribute;

    return Style.create(_style, {
      include: [
        {
          model: Sty_Attribute,
          as: "sty_attributes",
          attributes: [ "attribute_name", "attribute_type", "brand_id", "attribute_id" ],
          include: [
            {
              model: Sty_Option,
              as: "sty_options",
              attributes: ["option_name", "brand_id", "option_id", "is_sub_value", "sub_values"]
            }
          ]
        },
        {
          model: Spec_Gradient,
          as: "spec_gradient",
          attributes: {exclude: ['id']}
        }
      ]
    })
      .then(style => res.status(201).send(style))
      .catch(error => res.status(400).send(error));
  },

  getCategoryLevel(req, res) {
    return Style.findAll({
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
    return Style.findByPk(req.params.id, {})
      .then(style => {
        if (!style) {
          return res.status(404).send({
            message: "Brand Not Found"
          });
        }
        return res.status(200).send(style);
      })
      .catch(error => res.status(400).send(error));
  }
};
