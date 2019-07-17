const Category = require("../../models").Category;
const Style = require("../../models").Style;
const Sty_Attribute = require("../../models").Sty_Attribute;
const Sty_Option = require("../../models").Sty_Option;
const Spec_Gradient = require("../../models").Spec_Gradient;
const Spec_Fb_Map = require("../../models").Spec_Fb_Map;
const Spec_Measurement = require("../../models").Spec_Measurement;
const Variant = require("../../models").Variant;
const Cat_Option = require("../../models").Cat_Option;
const Public_Code = require("../../models").Public_Code;

const Sequelize = require("sequelize");

const Op = Sequelize.Op;
const _ = require("lodash");

module.exports = {
  list(req, res) {
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
      spec_gradient: req.body.specMeasurement,
      variants: req.body.variants,
      spec_header_id: req.body.spec_header_id
    };

    //Set Category Id and Brand Id
    var specGradients = _.map(_style.spec_gradient, s =>
      _.assign({}, s, {
        category_id: _style.category_id,
        brand_id: req.user.brand_id
      })
    );
    _style.spec_gradient = specGradients;

    //Set Brand Id and key map
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

    //Create New Options
    /* _.forEach(styAttribute, function(attribute) {
      _.forEach(attribute.sty_options, function(option) {
        if (_.has(option, "isAdded")) {
          if (option.isAdded) {
            console.log("in put option_name === ",option);
            Cat_Option.create({
                category_id: _style.category_id,
                brand_id: req.user.brand_id,
                attribute_id: attribute.attribute_id,
                option_name: option.option_name,
                is_sub_value: false,
                option_type: "created",
              }).then(function(op){
                var resOp = op.toJSON() 
                option.option_id = resOp.id;               
              })
              .catch(error => {
                console.log("error === ",error);
              });
          }
        }console.log("option_name === ",option);
      });
    }); */

    const newOptionCreate = async () => {
      for (const attribute of _style.sty_attributes) {
        for (const option of attribute.sty_options) {
          if (_.has(option, "isAdded")) {
            if (option.isAdded) {
              console.log("in put option_name === ", option);
              await Cat_Option.create({
                category_id: _style.category_id,
                brand_id: req.user.brand_id,
                attribute_id: attribute.attribute_id,
                option_name: option.option_name,
                is_sub_value: false,
                option_type: "created"
              })
                .then(function(op) {
                  var resOp = op.toJSON();
                  option.option_id = resOp.id;
                })
                .catch(error => {
                  //console.log("error === ", error);
                });
            }
          }
        }
      }
    };

    /*     const returnNum = x => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(x);
        }, 500);
      });
    }; */

    newOptionCreate().then(() => {
      var variants = _.map(_style.variants, v =>
        _.assign({}, v, {
          category_id: _style.category_id,
          brand_id: req.user.brand_id,
          public_code: {
            status: "created",
            brand_id: req.user.brand_id
          }
        })
      );
      _style.variants = variants;

      return Style.create(_style, {
        include: [
          {
            model: Sty_Attribute,
            as: "sty_attributes",
            attributes: { exclude: ["id"] },
            include: [
              {
                model: Sty_Option,
                as: "sty_options",
                attributes: { exclude: ["id"] }
              }
            ]
          },
          {
            model: Spec_Gradient,
            as: "spec_gradient",
            attributes: { exclude: ["id"] },
            include: [
              {
                model: Spec_Fb_Map,
                as: "spec_fb_maps",
                attributes: { exclude: ["id"] },
                include: [
                  {
                    model: Spec_Measurement,
                    as: "spec_measurements",
                    attributes: { exclude: ["id"] }
                  }
                ]
              }
            ]
          },
          {
            model: Variant,
            as: "variants",
            attributes: { exclude: ["id"] },
            include: [
              {
                model: Public_Code,
                as: "public_code",
                attributes: { exclude: ["id"] }
              }
            ]
          }
        ]
      })
        .then(style =>
          res.status(201).send({
            data: { response: { style_id: style.id } },
            status: "success"
          })
        )
        .catch(error =>
          res.status(400).send({
            data: { response: error },
            status: "error"
          })
        );
    });
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
    return Promise.all([
      Style.findByPk(req.params.id, {
        include: [
          {
            model: Sty_Attribute,
            as: "sty_attributes",
            include: [
              {
                model: Sty_Option,
                as: "sty_options"
              }
            ]
          }
        ]
      }),
      Spec_Gradient.findAll({
        where: {
          style_id: req.params.id
        },
        include: [
          {
            model: Spec_Fb_Map,
            as: "spec_fb_maps",
            include: [
              {
                model: Spec_Measurement,
                as: "spec_measurements"
              }
            ]
          }
        ]
      }),
      Variant.findAll({
        where: {
          style_id: req.params.id
        },
        include: [
          {
            model: Public_Code,
            as: "public_code",
            attributes: { exclude: ["id"] }
          }
        ]
      })
    ])
      .then(style => {
        if (!style) {
          return res.status(404).send({
            message: "Brand Not Found"
          });
        }

        const returnObj = _.zipObjectDeep(
          ["style", "spec_gradient", "variants"],
          [style[0], style[1], style[2]]
        );

        return res.status(200).send({
          data: { response: returnObj },
          status: "success"
        });
      })
      .catch(error =>
        res.status(400).send({
          data: { response: error },
          status: "error"
        })
      );
  },

  update(req, res) {
    console.log(req.params.id);

    const _bodyData = req.body;

    //Update Gradient | Spec FB Map | Measurement
    var promises = [];
    _.forEach(_bodyData.spec_gradient, function(_gradient) {
      promises.push(
        Spec_Gradient.update(
          {
            gradient_name: _gradient.gradient_name,
            combination_data: _gradient.combination_data,
            col_header: _gradient.col_header
          },
          {
            where: { id: _gradient.id, style_id: req.params.id }
          }
        )
      );
      _.forEach(_gradient.spec_fb_maps, function(_specFbMaps) {
        promises.push(
          Spec_Fb_Map.update(
            {
              fb_name: _specFbMaps.fb_name,
              is_visible: _specFbMaps.is_visible
            },
            {
              where: { id: _specFbMaps.id, sg_id: _gradient.id }
            }
          )
        );

        _.forEach(_specFbMaps.spec_measurements, function(_specMeasur) {
          promises.push(
            Spec_Measurement.update(
              {
                meas_value: _specMeasur.meas_value,
                option_name: _specMeasur.option_name
              },
              {
                where: { id: _specMeasur.id, s_fb_id: _specFbMaps.id }
              }
            )
          );
        });
      });
    });
    Promise.all(promises).then(data => {
      var errorCount = 0;
      data = data.map(entry => {
        if (entry[0] === 0) {
          errorCount = errorCount + 1;
        }
      });
      console.log(" spec gradient error  = ", errorCount);
    });
    //Update Gradient | Spec FB Map | Measurement by Id and Style Id

    //Update Variant by Id and Style Id
    var variantPromises = [];
    _.forEach(_bodyData.variants, function(_variant) {
      variantPromises.push(
        Variant.update(
          {
            variant_name: _variant.variant_name,
            sku: _variant.sku,
            price: _variant.price,
            quantity: _variant.quantity,
            combination_data: _variant.combination_data
          },
          {
            where: { id: _variant.id, style_id: req.params.id }
          }
        )
      );
    });

    Promise.all(variantPromises).then(data => {
      var errorCount = 0;
      data = data.map(entry => {
        if (entry[0] === 0) {
          errorCount = errorCount + 1;
        }
      });
      console.log(" Variant error  = ", errorCount);
    });
    //Update Variant by Id and Style Id

    //Update Attributes & Options by Id and Style Id
    var attributesPromises = [];
    _.forEach(_bodyData.attributes, function(_attribute) {
      attributesPromises.push(
        Sty_Attribute.update(
          {
            attribute_name: _attribute.attribute_name,
            attribute_type: _attribute.attribute_type
          },
          {
            where: { id: _attribute.id, style_id: req.params.id }
          }
        )
      );

      _.forEach(_attribute.sty_options, function(_options) {
        attributesPromises.push(
          Sty_Option.update(
            {
              option_name: _options.option_name
            },
            {
              where: { id: _options.id, sa_id: _attribute.id }
            }
          )
        );
      });
    });

    Promise.all(attributesPromises).then(data => {
      var errorCount = 0;
      data = data.map(entry => {
        if (entry[0] === 0) {
          errorCount = errorCount + 1;
        }
      });
      console.log(" Attribute error  = ", errorCount);
    });

    //Update Attributes & Options by Id and Style Id

    return Style.findByPk(req.params.id)
      .then(style => {
        if (!style) {
          return res.status(404).send({
            message: "style Not Found"
          });
        }
        return style
          .update({
            season: req.body.season || style.season,
            spec_header_id: req.body.spec_header_id || style.spec_header_id
          })
          .then(style => {
            return res.status(200).send({
              data: { response: style },
              status: "success"
            });
          })
          .catch(error => {
            console.log(error);
            res.status(400).send(error);
          });
      })
      .catch(error => {
        console.log(error);
        res.status(400).send(error);
      });
  }
};
