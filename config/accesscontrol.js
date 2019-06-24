const AccessControl = require('accesscontrol');

const admin = {
    user: {
        'create:any': ['*'],
        'read:any': ['*']
    },
    role: {
        'create:any': ['*'],
        'read:any': ['*']
    }
}

const superadmin = {
    user: {
        ...admin.user,
        'update:any': ['*'],
        'delete:any': ['*']
        }
    ,
    role: {
        ...admin.role,
        'update:any': ['*'],
        'delete:any': ['*']
    }
}

const grantsObject = {
    admin,
    superadmin,
};


const ac = new AccessControl(grantsObject);

module.exports = ac;