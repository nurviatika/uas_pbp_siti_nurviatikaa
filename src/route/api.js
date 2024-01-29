import express from "express";
import userController from "../controller/user-controller.js";
import contactMahasiswaController from "../controller/contact-mahasiswa-controller.js";
import { authmiddleware } from "../middleware/auth-middleware.js";

const userRouter = new express.Router();
userRouter.use(authmiddleware);

// User API
userRouter.get('/api/users/current', userController.get);
userRouter.patch('/api/users/current', userController.update);
userRouter.delete('/api/users/logout', userController.logout);

//Contact API
userRouter.post('/api/contact_mahsiswa', contactMahasiswaController.create);
userRouter.get('/api/contact_mahsiswa/:contact_mahasiswaId', contactMahasiswaController.get);
userRouter.put('/api/contact_mahsiswa/:contact_mahasiswaId', contactMahasiswaController.update);
userRouter.delete('/api/contact_mahsiswa/:contact_mahasiswaId', contactMahasiswaController.remove);
userRouter.get('/api/contact_mahsiswa', contactMahasiswaController.search);

export {
    userRouter
};