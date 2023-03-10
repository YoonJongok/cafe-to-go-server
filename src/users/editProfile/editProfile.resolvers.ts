import { Resolver, Resolvers } from "src/types";
import bcrypt from "bcrypt";
import { loginOnlyProtector } from "src/utils/users/loginOnlyProtector";

const editProfileResolvers: Resolver = async (
  _,
  { id, username, email, name, password, location, githubUsername },
  { loggedInUser, prisma },
) => {
  try {
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id,
      },
    });

    if (user.id !== loggedInUser?.id) {
      throw new Error("Permission error: Cannot edit other user's profile.");
    }

    let hashedPassword;
    password && (hashedPassword = await bcrypt.hash(password, 10));

    const data = {
      ...(username && { username }),
      ...(email && { email }),
      ...(name && { name }),
      ...(password && { password: hashedPassword }),
      ...(location && { location }),
      ...(githubUsername && { githubUsername }),
    };

    await prisma.user.update({
      where: {
        id,
      },
      data,
    });
    return {
      ok: true,
      id: user.id,
    };
  } catch (error: any) {
    return {
      ok: false,
      error: error.message,
    };
  }
};

const resolvers: Resolvers = {
  Mutation: {
    editProfile: loginOnlyProtector(editProfileResolvers),
  },
};

export default resolvers;
