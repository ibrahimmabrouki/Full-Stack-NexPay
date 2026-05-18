import { FastifyInstance } from "fastify";
import {
  createTransfer,
  getTransfers,
} from "../controllers/transfer.controller";
import { user_role } from "../generated/prisma/enums";
import { getTransfersQueryParams } from "../types/tranfer";

import { authenticateUser, authorizeRoles } from "../middlewares/auth";

async function transferRoutes(fastify: FastifyInstance, options: any) {
  fastify.post(
    "/",
    {
      preHandler: [
        authenticateUser,
        authorizeRoles(user_role.USER, user_role.COMPANY),
      ],
    },
    createTransfer,
  );
  fastify.get<{ Querystring: getTransfersQueryParams }>(
    "/",
    {
      preHandler: [
        authenticateUser,
        authorizeRoles(user_role.USER, user_role.COMPANY),
      ],
    },
    getTransfers,
  );
}

export default transferRoutes;
