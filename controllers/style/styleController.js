const Category = require("../../models").Category;
const Style = require("../../models").Style;


module.exports = {
  list(req, res) {
    return Style.findAll()
      .then(styles => res.status(200).send(styles))
      .catch(error => {
        res.status(400).send(error);
      });
  },

  add(req, res) {
    console.log("req body ========",req.body);
    return Style
      .create({
        brand_id: req.body.brand_id,
        category_id: req.body.category_id,
        collection_id: req.body.collection_id,
        washcare_id: req.body.washcare_id,
        creator_user_id: req.body.creator_user_id,
        style_name: req.body.style_name,
        style_code: req.body.style_code,
        season: req.body.season,
        description: req.body.description,
        attributes: req.body.attributes,
        spec_combinations: req.body.spec_combinations,
        variant_combinations: req.body.variant_combinations,
        spec_header: req.body.spec_header,
      })
      .then((style) => res.status(201).send(style))
      .catch((error) => res.status(400).send(error));
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
  },
};
