import { ApolloError } from "apollo-server-express";
import { hash, compare } from "bcryptjs";
import { issueToken, serializeUser } from "../../utils/user";

export default {
  Query: {
    authenticateUser: async (_, { userName, password }, { User }) => {
      try {
        let user;
        user = await User.findOne({ userName });
        if (!user) {
          throw new Error("userName not found");
        }
        let isMatch = await compare(password, user.password);
        if (!isMatch) {
          throw new Error("Invalid password");
        }
        user = user.toObject();
        user.id = user._id;
        user = serializeUser(user);
        let token = await issueToken(user);
        return {
          token,
          user,
        };
      } catch (err) {
        throw new ApolloError(err.message, 401);
      }
    },
  },
  Mutation: {
    registerUser: async (_, { newUser }, { User }) => {
      try {
        let user;
        user = await User.findOne({ userName: newUser.userName });
        if (user) {
          throw new Error("userName is already Taken");
        }
        user = await User.findOne({ email: newUser.email });
        if (user) {
          throw new Error("Email is already taken");
        }

        user = new User(newUser);
        user.password = await hash(newUser.password, 10);
        let savedUser = await user.save();
        savedUser = savedUser.toObject();
        savedUser.id = savedUser._id;
        savedUser = serializeUser(savedUser);
        let token = await issueToken(savedUser);

        return {
          token,
          user: savedUser,
        };
      } catch (err) {
        throw new ApolloError(err.message, 401);
      }
    },
  },
};
