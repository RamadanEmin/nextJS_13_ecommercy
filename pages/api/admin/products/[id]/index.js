import nc from "next-connect";
import dbConnect from "@/backend/config/dbConnect";
import onError from "@/backend/middlewares/errors";
import { authorizeRoles, isAuthenticatedUser } from "@/backend/middlewares/auth";
import { updateProduct } from "@/backend/controllers/productControllers";

const handler = nc({ onError });

dbConnect();

handler.use(isAuthenticatedUser, authorizeRoles("admin")).put(updateProduct);

export default handler;