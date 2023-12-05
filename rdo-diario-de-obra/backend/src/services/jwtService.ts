import jwt from 'jsonwebtoken';

const secretKey = "JRy&umI117>m!02N<e"

const jwtService = {
    generateToken: (payload: any) => {
        return jwt.sign(payload, secretKey);
    },
    decodeToken: (token: string) => {
        return jwt.decode(token);
    }
};

export default jwtService;