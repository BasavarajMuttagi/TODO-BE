import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { DB_SECRET } from "../..";

export type tokenType = {
  userId: string;
  email: string;
  name: string;
  iat: number;
  exp: number;
};

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  let token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Token missing" });
  }

  token = token.split(" ")[1];

  jwt.verify(
    token,
    DB_SECRET,
    (err: VerifyErrors | null, decoded: string | JwtPayload | undefined) => {
      if (err) {
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
      }

      req.body.user = decoded;
      next();
    },
  );
};

export { validateToken };
