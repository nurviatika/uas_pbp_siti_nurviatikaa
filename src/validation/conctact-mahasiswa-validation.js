import Joi from "joi";
import joi, { optional } from "joi";

const createContact_mahasiswaValidation = joi.object({
    first_name: Joi.string().max(100).required(),
    last_name: Joi.string().max(100).optional(),
    nim: Joi.string().max(100).required(),
    program_studi: Joi.string().max(100).required(),
    email: Joi.string().max(200).email().optional(),
    phone: Joi.string().max(20).optional()
});

const getContact_mahasiswaValidation = joi.number().positive().required();

const updateContact_mahasiswaValidation = joi.object({
    id: Joi.bumber().positive().required(),
    first_name: Joi.string().max(100).required(),
    last_name: Joi.string().max(100).optional(),
    nim: Joi.string().max(100).required(),
    program_studi: Joi.string().max(100).required(),
    email: Joi.string().max(200).email().optional(),
    phone: Joi.string().max(20).optional()

});

const searchContact_mahasiswaValidation = Joi.object({
    page: Joi.number().min(1).positive().default(1),
    size: Joi.number().min(1).positive().max(100).default(10),
    name: Joi.string().optional(),
    nim: Joi.string().optional(),
    program_studi: Joi.string().optional(),
    email: Joi.string().optional(),
    phone: Joi.string().optional()

})

export {
    createContact_mahasiswaValidation,
    getContact_mahasiswaValidation,
    updateContact_mahasiswaValidation,
    searchContact_mahasiswaValidation
}