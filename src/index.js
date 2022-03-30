import {join} from 'path'
import express from "express";
import mongoose from "mongoose";
import { ApolloServer } from "apollo-server-express";
import { error, success } from "consola";
import { PORT, DB } from "./config";
import { typeDefs, resolvers } from "./graphql";
import * as AppModels from "./models";
import AuthMiddleware from './middlewares/auth';

const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { ...AppModels },
});
connectToDb();
server.applyMiddleware({ app });
app.use(AuthMiddleware)
app.use(express.static(join(__dirname,'./uploads')))
app.listen({ port: PORT }, () =>
  console.log(`Server is running on PORT ${PORT}`)
);

async function connectToDb() {
  try {
    await mongoose.connect(DB, {
      useNewURLParser: true,
      useUnifiedTopology: true,
    });
    success({ badge: true, message: "connected to DB" });
  } catch (e) {
    error({ badge: true, message: "couldn't connect to DB" });
  }
}
