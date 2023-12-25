// import jwt from 'jsonwebtoken';
//
// //TODO: Secret key used to sign and verify JWTs
// const secretKey = process.env.SECRET;
//
// interface JwtPayload {
//   userId: string;
// }
//
// // Middleware to authenticate requests using JWT
// export function authenticateToken(req: Request, res: Response, next: NextFunction) {
//   // Get the token from the Authorization header
//   const token = req.headers.authorization?.slice(6);
//   if (!token) {
//     return res.status(401).json({ message: 'Unauthorized: Token not provided' });
//   }
//
//   // Verify the token
//   jwt.verify(token, secretKey!, (err, decoded) => {
//     if (err) {
//       return res.status(403).json({ message: 'Forbidden: Invalid token' });
//     }
//
//     // Attach the decoded payload to the request for further use
//     const payload = decoded as JwtPayload;
//     req.userId = payload.userId;
//
//     // Proceed to the next middleware or route handler
//     next();
//   });
// }
