import { request } from "express";
import contact_mahasiswaService from "../service/contact-mahasiswa-server.js";
import { PrismaClient } from "../application/database.js";
import { searchContact_mahasiswaValidation } from "../validation/conctact-mahasiswa-validation.js";

const create = async (req, res, next) => {
    try{
        const user = req.user;
        const request = req.body;
        const result = await contact_mahasiswaService.create(user, request);
        res.status(200).json ({
            data: result
        })
    } catch (e) {
        next(e);
    }
}

const get = async (req, res, next) => {
    try {
        const user = req.user;
        const conctact_mahasiswaId = req.params.conctact_mahasiswaId;
        const result = await contact_mahasiswaService.get(user, conctact_mahasiswaId);
        res.status(200).json ({
            data: result
        })
    } catch (e) {
        next(e);
    }

}

const update = async (req, res, next) => {
    try {
        const user = req.user;
        const conctact_mahasiswaId = req.params.conctact_mahasiswaId;
        const request = req.body;
        request.id = conctact_mahasiswaId;

        const result = await contact_mahasiswaService.update(user, request);
        res.status(200).json ({
            data: result
        })

    }catch (e) {
        next (e);
    }

}

const remove = async (req, res, next) => {
    try {
        const user = req.user;
        const conctact_mahasiswaId = req.params.conctact_mahasiswaId;

        await contact_mahasiswaService.remove(user, conctact_mahasiswaId);
        res.status(200).json({
            data: "OK"
        })
    }catch (e) {
        next (e);
    }

}

const search = async (req, res, next) => {
    try {
        const user = req.user;
        const request = {
            name: req.query.name,
            nim: req.query.nim,
            program_studi: req.query.rogram_studi,
            email: req.query.email,
            phone: req.query.phone,
            page: req.query.page,
            size: req.query.size
            
        };

        const result = await contact_mahasiswaService.search(user, request);
        res.status(200).json ({
            data: result.data,
            paging: result.paging
        });

    } catch (e) {
        next (e);
    }
}



export default{
    create,
    get,
    update,
    remove,
    search
}