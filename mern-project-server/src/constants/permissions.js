const { ADMIN_ROLE, DEVELOPER_ROLE, VIEWER_ROLE } = require('./userConstants');

const permissions = {
    [ADMIN_ROLE]: [
        'user:create',
        'user:read',
        'user:update',
        'user:delete',
        'link:create',
        'link:read',
        'link:update',
        'link:delete',
        'payment:create',
        'payment:read',
        'payment:update',
        'payment:delete',
    ],
    [DEVELOPER_ROLE]: [
        'link:read',
        'payment:read',
    ],
    [VIEWER_ROLE]: [
        'link:read',
        'user:read',
        'payment:read',
    ]
};

module.exports = permissions;