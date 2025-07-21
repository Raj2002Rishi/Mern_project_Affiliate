const jwt = require('jsonwebtoken');
const Users = require('../model/Users');

const refreshSecret = process.env.JWT_REFRESH_TOKEN_SECRET;
const secret = process.env.JWT_SECRET;

const attemptToRefreshToken = async (refreshToken) => {
    try {
        const decoded = jwt.verify(refreshToken, refreshSecret);

        // Always fetch latest user data — details like credits/subscription may change in 7 days
        const data = await Users.findById({ _id: decoded.id });

        const user = {
            id: data._id,
            username: data.email,
            name: data.name,
            role: data.role ? data.role : 'admin',
            credits: data.credits,
            subscription: data.subscription
        };

        // TODO: Adjust expiry to '1h' for production
        const newAccessToken = jwt.sign(user, secret, { expiresIn: '1h' });

        return { newAccessToken, user };
    } catch (error) {
        console.log(error);
        throw error;
    }
};

module.exports = { attemptToRefreshToken };