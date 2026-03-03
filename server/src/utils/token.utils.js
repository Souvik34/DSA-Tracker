import jwt from 'jsonwebtoken';

export const generateAccessToken = (user)=> {
    return jwt.sign(
        {
            id:user.id,
            email:user.email,
        },
        process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION || '1d' },
    )
};

export const generateRefreshToken = (user) => {
    return jwt.sign(
        {
            id: user.id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRATION || '7d'
        }
    )
}

export const verifyRefreshToken = (token) => {
  return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
};