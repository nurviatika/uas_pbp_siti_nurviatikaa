import {validate} from"../validation/validation.js";
import { createContact_mahasiswaValidation, getContact_mahasiswaValidation, updateContact_mahasiswaValidation } from "../validation/conctact-mahasiswa-validation.js";
import { PrismaClient} from "../application/database.js";
import { ResponseError } from "../error/response-error.js";


const create = async (user, request) => {
    const conctact_mahasiswa = validate(createContact_mahasiswaValidation, request);
    conctact_mahasiswa.username = user.username;

    return PrismaClient.conctact_mahasiswa.create({
        data: conctact_mahasiswa,
        Select: {
            id: true,
            first_name: true,
            last_name: true,
            nim: true,
            program_studi: true,
            email: true,
            phone: true
        }
    });
}

const get = async (user, contact_mahasiswaId) => {
    contact_mahasiswaId = validate(getContact_mahasiswaValidation, contact_mahasiswaId);

    const contac_mahasiswa = await PrismaClient.conctact_mahasiswa.findFrist({
        where: {
            username: user.username,
            id: contact_mahasiswaId
        },
        Select: {
            id: true,
            first_name: true,
            last_name: true,
            nim: true,
            program_studi: true,
            email: true,
            phone: true

        }
    });

    if(!contac_mahasiswa) {
        throw new ResponseError(404, "contact_mahasiswa not found");
    }

    return contac_mahasiswa;

}

const update = async (user, request) => {
    const contac_mahasiswa = validate(updateContact_mahasiswaValidation, request);

    const totalContact_mahasiswaInDatabase = await PrismaClient.conctact_mahasiswa.count({
        where: {
            username: user.username,
            id: contac_mahasiswa.id
        }
    });

    if(totalContact_mahasiswaInDatabase !== 1) {
        throw new ResponseError(404, "contact_mahasiswa is not found");
    }

    return PrismaClient.conctact_mahasiswa.update({
        where: {
            id: contac_mahasiswa.id
        },
        data: {
            first_name: contac_mahasiswa.findFrist,
            last_name: contac_mahasiswa.last_name,
            nim: contac_mahasiswa.nim,
            program_studi: contac_mahasiswa.program_studi,
            email: contac_mahasiswa.email,
            phone: contac_mahasiswa.phone,
        },

        Select: {
            id: true,
            first_name: true,
            last_name: true,
            nim: true,
            program_studi: true,
            email: true,
            phone: true

        }
    });

}

const remove = async (user, contact_mahasiswaId) => {
    contact_mahasiswaId = validate(getContact_mahasiswaValidation, conctact_mahasiswaId);

    const totalContact_mahasiswaInDatabase = await PrismaClient.conctact_mahasiswa.count({
        where: {
            username: user.username,
            id: contact_mahasiswaId
        }
    });

    return PrismaClient.conctact_mahasiswa.delete({
        where: {
            id: contact_mahasiswaId
        }
    });
}

const search = async (user, request) => {
    request = validate(searchContact_mahasiswaValidation, request);

    // 1 ((page - 1)+ size) = 0
    // 2 ((page - 1)+ size) = 1
    const skip = (request.page - 1) * request.size;

    const  filters = [];

    filters.push({
        username: user.username
    })

    
    if(request.name){
        filters.push({
            OR: [
                {
                    first_name: {
                        contains: request.name
                    }
                },
                {
                    last_name: {
                        contains: request.name
                    }
                }
            ]
        });
    }
    if(request.nim) {
        filters.push({
            nim: {
                contains: request.nim
            }
        });

    }
    if(request.program_studi) {
        filters.push({
            program_studi: {
                contains: request.program_studi
            }

        });
    }
    if(request.email) {
        filters.push({
            email: {
                contains: request.email
            }

        });
    }
    if(request.phone) {
        filters.push({
            phone: {
                contains: request.phone
            }
        });
    }

    const conctact_mahasiswa = await PrismaClient.conctact_mahasiswa.findMany({
        where: {
            AND: filters
        },
        take: request.size,
        skip: skip

    });

    const totalItems = await PrismaClient.conctact_mahasiswa.count({
        where: {
            AND: filters
        }
    });

    return {
        date: conctact_mahasiswa,
        paging: {
            page: request.page,
            total_item : totalItems,
            total_page : Math.ceil(totalItems / request.size)

        }
    }

}


export default {
    create,
    get,
    update,
    remove,
    search
}