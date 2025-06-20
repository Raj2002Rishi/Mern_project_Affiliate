const jwt = require('jsonwebtoken');
const secret = "5356fb59-d9eb-41d0-96f7-126c952b79f4";

const authController = {
    login: (request, response) => {
        const { username, password } = request.body;

        if (username === 'admin' && password === 'admin') {
            const user = {
                name: 'John Cena',
                email: 'john@cena.com'
            };

            const token = jwt.sign(user, secret, { expiresIn: '1h' });

            response.cookie('jwtToken', token, {
                httpOnly: true,
                secure: false, 
                path: '/'
                
            });

            return response.json({ message: 'Login successful' });
        } else {
            return response.status(401).json({ message: 'Invalid Credentials' });
        }
    },

    logout: (request, response) => {
        response.clearCookie('jwtToken');
        response.json({ message: 'Logout successful' });
    },

    isUserLoggedIn: (request, response) => {
        const token = request.cookies.jwtToken;

        if (!token) {
            return response.status(401).json({ message: 'Unauthorized access' });
        }

        jwt.verify(token, secret, (error, user) => {
            if (error) {
                return response.status(401).json({ message: 'Unauthorized access' });
            } else {
                response.json({ message: 'User is logged in', user });
            }
        });
    },
};

module.exports = authController;
