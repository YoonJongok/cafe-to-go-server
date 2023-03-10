import { Resolvers } from "src/types";
import * as bcrypt from "bcrypt";
import client from "src/client";

const resolvers: Resolvers = {
	Mutation: {
		createAccount: async (
			_,
			{ username, email, name, password, location, githubUsername }
		) => {
			try {
				const exist = await client.user.findFirst({
					where: {
						OR: [
							{
								username,
							},
							{
								email,
							},
						],
					},
				});

				if (exist) {
					throw Error(
						"Username or Email address alreay exist. User another please."
					);
				}

				const hashedPassword = await bcrypt.hash(password, 10);
				const data = {
					username,
					email,
					password: hashedPassword,
					...(name && { name }),
					...(location && { location }),
					...(githubUsername && { githubUsername }),
				};

				const user = await client.user.create({
					data,
				});

				return {
					ok: true,
					id: user.id,
				};
			} catch (e: any) {
				return {
					ok: false,
					error: e.message,
				};
			}
		},
	},
};

export default resolvers;
