import { Prisma } from "../src/application/database.js";
import bcrypt from "bcrypt";

export const removeTestUser = async () => {
   await prismaClient.user.deleteMany({
        where: {
            username: "test"
        }
    })
}

export const createTestUser = async () => {
    await prismaClient.user.create({
        data: {
            username: "test",
            password: await bcrypt.hash("rahasia", 10),
            name: "test",
            token: "test"
        }
    })
}

export const getTestUser = async () => {
    return prismaClient.user.findUnique({
        where:{
            username: "test"
        }
    });

}

export const removeTestContact_mahasiswa = async () => {
    await prismaClient.contact_mahasiswa.deleteMany({
        where: {
            username: 'test'
        }
    });
}
export const createTestContact_mahasiswa = async () => {
    await prismaClient.contact_mahasiswa.create({
        data: {
            username: "test",
            first_name: "test",
            last_name: "test",
            nim: "20220040224",
            program_studi: "managemen",
            email: "test@njn.com",
            phone: "081293738215"
        }
        
    })
}

export const createManyTestContact_mahasiswa = async () => {
    for (let i = 0; i < 15; i++) {
        await prismaClient.contact_mahasiswa.create({
            data: {
                username: 'test',
                first_name: 'test ${i}',
                last_name: 'test ${i}',
                nim: '20220040224${i}',
                program_studi: 'managemen ${i}',
                email: 'test${i}@njn.com',
                phone: '081293738215${i}'
            }
            
        })
    }

    
}
export const getTestContact_mahasiswa = async () => {
    return prismaClient.contact_mahasiswa.findFirst({
        where: {
            username: 'test',
        }
    })
}