import nc from "next-connect";
import dbConnect from "@/backend/config/dbConnect";
import onError from "@/backend/middlewares/errors";
import { authorizeRoles, isAuthenticatedUser } from "@/backend/middlewares/auth";
import { getUser } from "@/backend/controllers/authControllers";

const handler = nc({ onError });

dbConnect();

handler.use(isAuthenticatedUser, authorizeRoles("admin")).get(getUser);

export default handler;