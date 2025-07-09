const VIEWER_ROLE = 'viewer';
const ADMIN_ROLE = 'admin';
const DEVELOPER_ROLE = 'developer';

const USER_ROLES = [
    VIEWER_ROLE,
    ADMIN_ROLE,
    DEVELOPER_ROLE
];

// Role display names for UI
const ROLE_DISPLAY_NAMES = {
    [ADMIN_ROLE]: 'Administrator',
    [DEVELOPER_ROLE]: 'Developer',
    [VIEWER_ROLE]: 'Viewer'
};

// Role descriptions for UI
const ROLE_DESCRIPTIONS = {
    [ADMIN_ROLE]: 'Full access to all features including user management and payments',
    [DEVELOPER_ROLE]: 'Can read links and payment information',
    [VIEWER_ROLE]: 'Can read links and user information'
};

export {
    USER_ROLES,
    VIEWER_ROLE,
    ADMIN_ROLE,
    DEVELOPER_ROLE,
    ROLE_DISPLAY_NAMES,
    ROLE_DESCRIPTIONS
}; 