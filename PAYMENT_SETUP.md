# Payment System Setup Guide

## Overview
This guide explains how to set up the credit packs payment system using Razorpay integration.

## Backend Setup

### 1. Environment Variables
Add the following variables to your `.env` file in the `mern-project-server` directory:

```env
# MongoDB Connection
MONGO_URI=mongodb://localhost:27017/your_database_name

# JWT Secret
JWT_SECRET=your_jwt_secret_key_here

# Razorpay Configuration
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Email Configuration (for user management)
GMAIL_EMAIL_ID=your_email@gmail.com
GMAIL_APP_PASSWORD=your_email_app_password

# Server Configuration
PORT=5001
NODE_ENV=development
```

### 2. Razorpay Account Setup
1. Sign up at [Razorpay](https://razorpay.com)
2. Get your API keys from the Razorpay Dashboard
3. Add the keys to your environment variables

### 3. Credit Packs Configuration
The credit packs are defined in `src/constants/paymentConstants.js`:
```javascript
const CREDIT_PACKS = {
    10: 10,
    20: 20,
    50: 50,
    100: 100
};
```

You can modify these values as needed.

## Frontend Setup

### 1. Environment Variables
Add the following to your frontend `.env` file in the `my-new-app` directory:

```env
REACT_APP_RAZORPAY_KEY_ID=your_razorpay_key_id
```

### 2. Razorpay Script
Add the Razorpay script to your `public/index.html`:

```html
<script src="https://checkout.razorpay.com/v1/checkout.js"></script>
```

## API Endpoints

### Backend Routes
- `GET /payment/credit-packs` - Get available credit packs
- `POST /payment/create-order` - Create payment order (requires auth + payment:create permission)
- `POST /payment/verify-order` - Verify payment (requires auth + payment:create permission)

### Frontend Routes
- `/credit-packs` - Credit packs purchase page (requires login)

## Features Implemented

1. **Credit Packs Display**: Shows available credit pack options
2. **Payment Integration**: Razorpay payment gateway integration
3. **Payment Verification**: Secure payment verification with signature
4. **User Authentication**: All payment operations require user login
5. **Role-Based Permissions**: Different user roles have different payment permissions
6. **Credit-Based Link Creation**: Links cost 1 credit each to create
7. **Real-Time Credit Management**: Credits are deducted immediately on link creation
8. **Simplified Payment Flow**: Streamlined order creation and verification
9. **User Management**: Admin can create users with temporary passwords
10. **Email Integration**: Automatic email notifications for new users
11. **Error Handling**: Comprehensive error handling and user feedback
12. **Responsive UI**: Material-UI based responsive design

## Usage

### Credit Purchase:
1. Users can visit `/credit-packs` to see available credit options
2. Select a credit pack by clicking on it
3. Click "Purchase Credits" to initiate payment
4. Complete payment through Razorpay gateway
5. Credits are automatically added to user account after successful payment

### Link Creation:
1. Users need at least 1 credit to create a link
2. Each link creation costs 1 credit
3. Credits are deducted immediately when link is created
4. Users with insufficient credits will receive an error message
5. Link creation is atomic - either succeeds completely or fails completely

### User Management:
1. Admins can create new users with specific roles
2. Temporary passwords are automatically generated
3. Email notifications are sent to new users with their temporary password
4. Users can be updated and deleted by admins
5. Role-based access control for all user operations

## Security Features

- JWT authentication for all payment operations
- Role-based authorization with granular permissions
- Payment signature verification
- Secure environment variable handling
- CORS configuration for security
- Enhanced middleware with better error handling
- Improved authorization with clear permission validation

## Permission System

The system uses role-based permissions for payment operations:

- **Admin**: Full access to all payment operations (create, read, update, delete)
- **Developer**: Can read payment information
- **Viewer**: Can read payment information

### Available Permissions:
- `payment:create` - Create payment orders and verify payments
- `payment:read` - View payment history and credit packs
- `payment:update` - Update payment information (admin only)
- `payment:delete` - Delete payment records (admin only)
- `user:create` - Create new users (admin only)
- `user:read` - View user information
- `user:update` - Update user details (admin only)
- `user:delete` - Delete users (admin only)
- `link:create` - Create new links (requires credits)
- `link:read` - View link information
- `link:update` - Update link details
- `link:delete` - Delete links

## User Role Constants

The application uses centralized role constants for consistency:

### Backend Constants (`src/constants/userConstants.js`):
```javascript
const VIEWER_ROLE = 'viewer';
const ADMIN_ROLE = 'admin';
const DEVELOPER_ROLE = 'developer';

const USER_ROLES = [VIEWER_ROLE, ADMIN_ROLE, DEVELOPER_ROLE];
```

### Frontend Constants (`src/constants/userRoles.js`):
```javascript
const VIEWER_ROLE = 'viewer';
const ADMIN_ROLE = 'admin';
const DEVELOPER_ROLE = 'developer';

const USER_ROLES = [VIEWER_ROLE, ADMIN_ROLE, DEVELOPER_ROLE];
const ROLE_DISPLAY_NAMES = { /* UI display names */ };
const ROLE_DESCRIPTIONS = { /* Role descriptions */ };
```

### Benefits:
- **Consistency**: All role references use the same constants
- **Maintainability**: Easy to update role names in one place
- **Type Safety**: Reduces typos and errors
- **Documentation**: Clear role definitions with descriptions

## Notes

- ✅ User model updated with `credits` field (default: 0)
- ✅ Credits are automatically added to user account after successful payment
- ✅ User authentication now includes credits in response
- ✅ Link creation requires 1 credit and deducts it immediately
- ✅ Atomic operations ensure data consistency
- ✅ Real-time credit validation before link creation
- ✅ User management with temporary password generation
- ✅ Email service integration for user notifications
- ✅ Role-based user creation and management
- Email notifications can be added for successful payments
- Payment history can be stored in a separate collection
- Webhook handling can be added for better payment tracking 