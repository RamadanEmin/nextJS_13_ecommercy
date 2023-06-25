import nc from 'next-connect';
import dbConnect from "@/backend/config/dbConnect";
import { newAddress } from '@/backend/controllers/addressControllers';
import onError from '@/backend/middlewares/errors';

const handler = nc({ onError });

dbConnect();

handler.post(newAddress);

export default handler;