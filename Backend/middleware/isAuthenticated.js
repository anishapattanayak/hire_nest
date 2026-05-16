import jwt from "jsonwebtoken";
const isAuthenticated = async (req, res, next) => {
  try {
    console.log("AUTH CHECK", {
      origin: req.headers.origin,
      host: req.headers.host,
      secure: req.secure,
      forwardedProto: req.headers["x-forwarded-proto"],
      cookies: req.cookies,
      authorization: req.headers.authorization,
    });
    let token = null;
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    } else if (req.cookies.token) {
      token = req.cookies.token;
    }
    if (!token) {
      return res.status(401).json({
        message: "User not authenticated",
        success: false,
      });
    }
    const decode = await jwt.verify(token, process.env.SECRET_KEY);
    if (!decode) {
      return res.status(400).json({
        message: "Invalid token",
        success: false,
      });
    }
    req.id = decode.userId;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: "Authentication failed",
      success: false,
    });
  }
}
export default isAuthenticated;
