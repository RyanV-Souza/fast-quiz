import { verifyJwt } from "@/http/middleware/verify-jwt";
import { FastifyInstance } from "fastify";
import { create } from "./create";
import { verifyUserRole } from "@/http/middleware/verify-user-role";

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJwt);

  app.post("/quiz", { onRequest: [verifyUserRole("ADMIN")] }, create);
}
