'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const DefaultViews = require('../data/roles/roleDefaultviews.json').views;
    const rolewiseTabs = require('../data/roles/roleaccesstabs.json').tabs;
    let viewsArray = [];

    // DefaultTabs.forEach((tab) => {
      DefaultViews.forEach((modules) => {

        viewsArray.push({

          role_id: modules['role_id'],
          moduleaccess_id: modules['moduleaccess_id'],
          parentmodule_id: modules['parentmodule_id'],
          childmodule_id: modules['childmodule_id'],
          name: modules['name'],    
          type: modules['type'],
          default_access: modules['default_access'],
          view:  modules['view'],
          create:  modules['create'],
          edit:  modules['edit'],
          delete:  modules['delete'],
          all:  modules['all'],
          createdAt: new Date(),
          updatedAt: new Date()
        })
      // })
  })
  const roledefaultResponse = await queryInterface.bulkInsert('Role_Defaultviews', viewsArray, { returning: true });
  
  var viewId = roledefaultResponse[0].id;
  let tabsArray = []
  
      rolewiseTabs.forEach((modules) => {
        tabsArray.push({
          roledefaultview_id: modules['roledefaultview_id'],
          name: modules['name'],
          notes: modules['notes'],
          tab_id: modules['tab_id'],
          access: modules['access'],
          createdAt: new Date(),
          updatedAt: new Date()
        })
      })
    
  // const roledefaultTabs= await queryInterface.bulkInsert("RoleAccessTabs", tabsArray, {returning:true});
  // var viewtabId= roledefaultResponse[0].id;
  },

  down:async (queryInterface, Sequelize) => {
    
  }
};
