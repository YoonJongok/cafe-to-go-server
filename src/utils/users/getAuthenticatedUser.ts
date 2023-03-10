import * as jwt from "jsonwebtoken";
import client from "src/client";

export const SECRET_DEV = "8afd3f57-5bb7-459a-94fa-c8b588a28f72";

type TokenType = {
  id: string;
};

export const getAuthenticatedUser = async (token: string) => {
  try {
    if (!token) {
      return null;
    }
    // typescript jwt.verify type error 관련..
    // https://stackoverflow.com/questions/50735675/typescript-jwt-verify-cannot-access-data

    const key = process.env.NODE_ENV === "production" ? process.env.SECRET_KEY! : SECRET_DEV;

    const decoded = jwt.verify(token, key) as TokenType;

    if (typeof decoded === "object" && decoded.hasOwnProperty("id")) {
      const user = await client.user.findUnique({
        where: { id: +decoded["id"] },
        select: {
          id: true,
          username: true,
          email: true,
          name: true,
          location: true,
          avatarURL: true,
          githubUsername: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      return user;
    } else {
      return null;
    }
  } catch (e) {
    return null;
  }
};
