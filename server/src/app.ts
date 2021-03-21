import 'reflect-metadata';
import { PrismaClient } from '@prisma/client';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { buildSchemaSync } from 'type-graphql';

import { resolvers } from './generated/type-graphql';
import { Context } from 'node:vm';

const prisma = new PrismaClient();

const app = express();

const apolloServer = new ApolloServer({
  schema: buildSchemaSync({
    resolvers,
  }),
  context: (): Context => ({ prisma }),
});
apolloServer.applyMiddleware({ app });

const PORT = 3500;
app.listen(PORT, () => {
  console.log(`Server startet at port: ${PORT}`);
});
