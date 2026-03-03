import bcrypt from 'bcrypt';
import * as authRepository from './auth.repository.js';
import { generateAccessToken,generateRefreshToken} from "../../utils/token.utils.js";

export const signUp = async({name, email, password})=> {
    const existingUser = await authRepository.findUserByEmail(email);

    if(existingUser)
    {
        throw new Error('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);


    const newUser = await authRepository.createUser(
        name,
        email, 
        hashedPassword
    );

    return {
        message: "User created successfully",
        user: newUser,
    };
};


export const signIn  = async({email,password})=> {
    const user = await authRepository.findUserByEmail(email);

    if(!user)
    {
        throw new Error('Invalid credentials!');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid)
    {
        throw new Error('Invalid credentials!');
    }


    const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  await authRepository.storeRefreshToken(user.id, refreshToken);

  return {
   message: "Login successful",
    accessToken,
    refreshToken,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  };
};

export const signOut = async (refreshToken) => {
  await authRepository.deleteRefreshToken(refreshToken);
};



export const handleRefreshToken = async (refreshToken) => {
  if (!refreshToken) {
    throw new Error("No refresh token provided");
  }

  let decoded;

  try {
    decoded = verifyRefreshToken(refreshToken);
  } catch (err) {
    throw new Error("Invalid or expired refresh token");
  }

  const storedToken =
    await authRepository.findRefreshToken(refreshToken);

  if (!storedToken) {
    throw new Error("Refresh token not found in DB");
  }

  const user = await authRepository.findUserById(decoded.id);

  return generateAccessToken(user);
};