import User from "../models/user";
import fs from "fs";
import { uploads } from "../utils/cloudinary";
import ErrorHandler from "../utils/errorHandler";
import bcrypt from "bcryptjs";
import APIFilters from "../utils/APIFilters";

export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    const user = await User.create({
        name,
        email,
        password
    });

    res.status(201).json({ user });
};

export const updateProfile = async (req, res) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
    };

    if (req.files.length > 0) {
        const uploader = async (path) => await uploads(path, "ecommerce/images");

        const file = req.files[0];
        const { path } = file;

        const avatarResponse = await uploader(path);
        fs.unlinkSync(path);
        newUserData.image = avatarResponse;
    }

    const user = await User.findByIdAndUpdate(req.user._id, newUserData);
    res.status(200).json({ user });
};

export const updatePassword = async (req, res, next) => {
    const user = await User.findById(req.user._id).select('+password');

    const isPasswordMatched = await bcrypt.compare(req.body.currentPassword, user.password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler('Old password is incorrect', 400));
    }

    user.password = req.body.newPassword;
    await user.save();

    res.status(200).json({ success: true });
};

export const getUsers = async (req, res) => {
    const resPerPage = 5;
    const usersCount = await User.countDocuments();

    const apiFilters = new APIFilters(User.find(), req.query).pagination(resPerPage);

    const users = await apiFilters.query;

    res.status(200).json({
        usersCount,
        resPerPage,
        users
    });
};

export const getUser = async (req, res, next) => {
    let user = await User.findById(req.query.id);

    if (!user) {
        return next(new ErrorHandler('No User found this ID', 404));
    }

    res.status(200).json({
        success: true,
        user
    });
};