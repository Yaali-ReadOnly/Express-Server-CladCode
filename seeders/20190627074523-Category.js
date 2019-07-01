"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const baseCategories = await require("../data/category/categories.json")
      .categories;

    for (const category of baseCategories) {
      //Create Category Group
      let groupData = [
        {
          group_name: category.category_group.group_name,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ];
      const groupResponse = await queryInterface.bulkInsert(
        "GroupCategories",
        groupData,
        { returning: true }
      );
      var groupId = groupResponse[0].id;

      //Create Category
      let categoryArray = [];
      categoryArray.push({
        category_name: category["category_name"],
        parent_id: category["parent_id"],
        group_id: groupId,
        header_id: category["header_id"],
        createdAt: new Date(),
        updatedAt: new Date()
      });
      const categoryResponse = await queryInterface.bulkInsert(
        "Categories",
        categoryArray,
        { returning: true }
      );

      //console.log("Cat insert response", categoryResponse[0].id);
      /* const categoryId = await queryInterface.rawSelect('Categories', {
            where: {
              category_name: category['category_name'],
            },
          }, ['id']); */
      const categoryId = categoryResponse[0].id;

      if (categoryId) {
        let fbpArray = [];
        //Create Category feedbackpoints
        for (const fbp of category.feedbackpoints) {
          fbpArray.push({
            category_id: categoryId,
            fb_point: fbp,
            createdAt: new Date(),
            updatedAt: new Date()
          });
        }

        const fbResponse = await queryInterface.bulkInsert(
          "FeebackPoints",
          fbpArray,
          { returning: true }
        );

        console.log("feedbcakpoints = ", fbResponse);

        //Create Category Attribute
        for (const attribute of category.attributes) {
          let attributeArray = [];
          attributeArray.push({
            category_id: categoryId,
            attribute_name: attribute["attribute_name"],
            spec_variation: attribute["spec_variation"],
            spec_image: attribute["spec_image"],
            variant_variation: attribute["variant_variation"],
            variant_image: attribute["variant_image"],
            is_editable: attribute["is_editable"],
            createdAt: new Date(),
            updatedAt: new Date()
          });

          const attributeResponse = await queryInterface.bulkInsert(
            "Cat_Attributes",
            attributeArray,
            { returning: true }
          );
          //console.log("updated Attribute id", attributeResponse[0].id);
          const attributeId = attributeResponse[0].id;

          if (attributeId) {
            //Create Category Attribute Option
            for (const option of attribute.options) {
              let optionArray = [];
              optionArray.push({
                category_id: categoryId,
                attribute_id: attributeId,
                option_name: option["option_name"],
                is_sub_value: option["is_sub_value"],
                option_type: "common",
                createdAt: new Date(),
                updatedAt: new Date()
              });

              const optionResponse = await queryInterface.bulkInsert(
                "Cat_Options",
                optionArray,
                { returning: true }
              );
              //console.log("updated Option id", optionResponse[0].id);
              const optionId = optionResponse[0].id;

              if (attribute["spec_variation"] && optionId) {
                let fbMapArray = [];
                for (const fb of fbResponse) {
                  fbMapArray.push({
                    fb_id: fb.id,
                    option_id: optionId,
                    is_visible: attribute["spec_variation"],
                    createdAt: new Date(),
                    updatedAt: new Date()
                  });
                }

                const mapResponse = await queryInterface.bulkInsert(
                  "FB_Option_Maps",
                  fbMapArray,
                  { returning: true }
                );

                console.log(mapResponse);



              }
            }
          }
        }
      }
    }
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
