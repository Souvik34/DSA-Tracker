import * as authService from "./auth.service.js";

export const signUp = async(req, res, next) => {
    try{
        const result = await authService.signUp(req.body);
        res.status(201).json({
            ...result,
            message: "User created successfully"
        });
    }
    catch(error)
    {
        next(error);
    }
}

export const signIn = async (req, res, next) => {
  try {
    const { accessToken, refreshToken, user, message } =
      await authService.signIn(req.body);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "strict",
    });

    res.status(200).json({
      message,
      accessToken,
      user,
    });

  } catch (error) {
    next(error);
  }
};
export const signOut = async(req,res,next)=>
{
    try{
        const refreshToken = req.cookies.refreshToken;
        await authService.signOut(refreshToken);
        res.clearCookie("refreshToken");
        res.status(200).json({ message: "Logged out successfully" });
    }
    catch(error)
    {
        next(error);
    }
};

export const refreshAccessToken = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    const newAccessToken =
      await authService.handleRefreshToken(refreshToken);

    res.status(200).json({
      accessToken: newAccessToken,
    });
  } catch (error) {
    next(error);
  }
};