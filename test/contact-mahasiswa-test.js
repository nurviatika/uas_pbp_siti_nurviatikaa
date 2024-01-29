import supertest from "supertest";
import { createTestContact_mahasiswa, createTestUser, getTestContact_mahasiswa, removeTestContact_mahasiswa, removeTestUser } from "./test-util.js";

describe('POST /api/contact_mahasiswa', function () {
    beforeEach(async () => {
        await createTestUser();
    })

    afterEach(async () => {
        await removeTestContact_mahasiswa();
        await removeTestUser();
    })

    it('should can create new contact_mahasiswa', async () => {
        const result = await supertest(web)
            .post("api/contac_mahasiswa")
            .set('Authorization', 'test')
            .send({
                first_name: "test",
                last_name: "test",
                nim: "20220040224",
                program_studi: "managemen",
                email: "test@njn.com",
                phone: "081293738215"
            });

        expect(result.status).toBe(200);
        expect(result.body.data.id).toBeDefined();
        expect(result.body.data.first_name).toBe("test");
        expect(result.body.data.last_name).toBe("test");
        expect(result.body.data.nim).toBe("20220040224");
        expect(result.body.data.program_studi).toBe("managemen");
        expect(result.body.data.email).toBe("test@njn.com");
        expect(result.body.data.phone).toBe("081293738215");
        
    });

    it('should reject if request is not valid', async () => {
        const result = await supertest(web)
            .post("api/contac_mahasiswa")
            .set('Authorization', 'test')
            .send({
                first_name: "",
                last_name: "test",
                nim: "20220040224",
                program_studi: "managemen",
                email: "test",
                phone: "08129373821500000029290001924351830308"
            });

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
        
    });
});

describe('GET /api/contact_mahasiswa/:contact_mahasiswaId', function () {
    beforeEach(async () => {
        await createTestUser();
        await createTestContact_mahasiswa();
    })

    afterEach(async () => {
        await removeTestContact_mahasiswa();
        await removeTestUser();
    })

    it('should can get contact_mahasiswa', async() => {
        const getTestContact_mahasiswa = await getTestContact_mahasiswa();

        const result = await supertest(web)
            .get("api/contact_mahasiswa/" + getTestContact_mahasiswa.id)
            .set('Authorization', 'test');

        expect(result.status).toBe(200);
        expect(result.body.data.id).toBe(testContact_mahasiswa.id);
        expect(result.body.first_name).toBe(testContact_mahasiswa.first_name);
        expect(result.body.data.last_name).toBe(testContact_mahasiswa.last_name);
        expect(result.body.data.nim).toBe(testContact_mahasiswa.nim);
        expect(result.body.data.program_studi).toBe(testContact_mahasiswa.program_studi);
        expect(result.body.data.email).toBe(testContact_mahasiswa.email);
        expect(result.body.data.phone).toBe(testContact_mahasiswa.phone);
    });

    it('should return 404 if contact_mahasiswa id is not found', async() => {
        const getTestContact_mahasiswa = await getTestContact_mahasiswa();

        const result = await supertest(web)
            .get("api/contact_mahasiswa/" + (TestContact_mahasiswa.id + 1))
            .set('Authorization', 'test');

        expect(result.status).toBe(404);
    });
});

describe('PUT /api/contact_mahasiswa/:contact_mahasiswaId', function () {
    beforeEach(async () => {
        await createTestUser();
        await createTestContact_mahasiswa();
    })

    afterEach(async () => {
        await removeAllTestContact_mahasiswa();
        await removeTestUser();
    })

    it('should can update existing contact_mahasiswa', async() => {
        const testContact_mahasiswa = await getTestContact_mahasiswa();

        const result = await supertest(web)
            .put('/api/contact_mahasiswa/' + testContact_mahasiswa.id)
            .set('Authorization', 'test')
            .send({
                first_name: "siti",
                last_name: "nurviatika",
                nim: "20220040281",
                program_studi: "teknik_informatika",
                email: "sitinurviatika@gmail.com",
                phone: "085211903481"
            });

        expect(result.status).toBe(200);
        expect(result.body.data.id).toBe(testContact_mahasiswa.id);
        expect(result.body.data.first_name).toBe("siti");
        expect(result.body.data.last_name).toBe("nurviatika");
        expect(result.body.data.nim).toBe("20220040281");
        expect(result.body.data.program_studi).toBe("teknik_informatika");
        expect(result.body.data.email).toBe("sitinurviatika@gmail.com");
        expect(result.body.data.phone).toBe("085211903481");

    });

    it('should reject if request is invalid', async() => {
        const testContact_mahasiswa = await getTestContact_mahasiswa();

        const result = await supertest(web)
            .put('/api/contact_mahasiswa/' + testContact_mahasiswa.id)
            .set('Authorization', 'test')
            .send({
                first_name: "",
                last_name: "",
                nim: "",
                program_studi: "",
                email: "tika",
                phone: ""
            });

        expect(result.status).toBe(400);

    });

    it('should reject if contact_mahasiswa is not found', async() => {
        const testContact_mahasiswa = await getTestContact_mahasiswa();

        const result = await supertest(web)
            .put('/api/contact_mahasiswa/' + (testContact_mahasiswa.id + 1))
            .set('Authorization', 'test')
            .send({
                first_name: "siti",
                last_name: "nurviatika",
                nim: "20220040281",
                program_studi: "teknik_informatika",
                email: "sitinurviatika@gmail.com",
                phone: "085211903481"
            });

        expect(result.status).toBe(404);

    });

});

describe('DELETE /api/contact_mahasiswa/:contact_mahsiswaId', function () {
    beforeEach(async () => {
        await createTestUser();
        await createTestContact_mahasiswa();
    })

    afterEach(async () => {
        await removeAllTestContact_mahasiswa();
        await removeTestUser();
    })

    it('should can delete contact_mahasiswa', async () => {
        let testContact_mahasiswa = await getTestContact_mahasiswa();
        const result = await supertest(web)
            .delete('api/contact_mahasiswa/' + testContact_mahasiswa.id)
            .set('Authorization', 'test');

        expect(result.status).toBe(200);
        expect(result.body.data).toBe("OK");

        testContact_mahasiswa = await getTestContact_mahasiswa();
        expect(testContact_mahasiswa).toBeNull();
    });

    it('should reject if contact_mahasiswa is not found', async () => {
        let testContact_mahasiswa = await getTestContact_mahasiswa();
        const result = await supertest(web)
            .delete('api/contact_mahasiswa/' + (testContact_mahasiswa.id + 1))
            .set('Authorization', 'test');

        expect(result.status).toBe(404);
    });
});

describe('GET /api/contact_mahasiswa', function () {
    beforeEach(async () => {
        await createTestUser();
        await createManyTestContact_mahasiswa();
    })

    afterEach(async () => {
        await removeAllTestContact_mahasiswa();
        await removeTestUser();
    })

    it('should can search without parameter', async () => {
        const result = await supertest(web)
            .get('/api/contact_mahasiswa')
            .set('Authorization', 'test');

        expect(result.status).toBe(200);
        expect(result.body.data.length).toBe(10);
        expect(result.body.paging.page).toBe(1);
        expect(result.body.paging.total_page).toBe(2);
        expect(result.body.paging.total_item).toBe(15);
    });

    it('should can search to page 2', async () => {
        const result = await supertest(web)
            .get('/api/contact_mahasiswa')
            .query ({
                page: 2
            })
            .set('Authorization', 'test');

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.length).toBe(5);
        expect(result.body.paging.page).toBe(2);
        expect(result.body.paging.total_page).toBe(2);
        expect(result.body.paging.total_item).toBe(15);
    });

    it('should can search using name', async () => {
        const result = await supertest(web)
            .get('/api/contact_mahasiswa')
            .query ({
                name: "test 1"
            })
            .set('Authorization', 'test');

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.length).toBe(6);
        expect(result.body.paging.page).toBe(1);
        expect(result.body.paging.total_page).toBe(1);
        expect(result.body.paging.total_item).toBe(6);
    });

    it('should can search using nim', async () => {
        const result = await supertest(web)
            .get('/api/contact_mahasiswa')
            .query ({
                nim: "0220040224"
            })
            .set('Authorization', 'test');

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.length).toBe(6);
        expect(result.body.paging.page).toBe(1);
        expect(result.body.paging.total_page).toBe(1);
        expect(result.body.paging.total_item).toBe(6);
    });

    it('should can search using program_studi', async () => {
        const result = await supertest(web)
            .get('/api/contact_mahasiswa')
            .query ({
                program_studi: "test 1"
            })
            .set('Authorization', 'test');

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.length).toBe(6);
        expect(result.body.paging.page).toBe(1);
        expect(result.body.paging.total_page).toBe(1);
        expect(result.body.paging.total_item).toBe(6);
    });

    

    it('should can search using email', async () => {
        const result = await supertest(web)
            .get('/api/contact_mahasiswa')
            .query ({
                email: "test 1"
            })
            .set('Authorization', 'test');

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.length).toBe(6);
        expect(result.body.paging.page).toBe(1);
        expect(result.body.paging.total_page).toBe(1);
        expect(result.body.paging.total_item).toBe(6);
    });

    it('should can search using phone', async () => {
        const result = await supertest(web)
            .get('/api/contact_mahasiswa')
            .query ({
                phone: "081293738215"
            })
            .set('Authorization', 'test');

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.length).toBe(6);
        expect(result.body.paging.page).toBe(1);
        expect(result.body.paging.total_page).toBe(1);
        expect(result.body.paging.total_item).toBe(6);
    });
});