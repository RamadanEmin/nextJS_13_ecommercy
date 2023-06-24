import Address from "../models/address";

export const newAddress = async (req, res) => {
    req.body.user = req.user._id;

    const address = await Address.create(req.body);

    res.status(200).json({ address });
};