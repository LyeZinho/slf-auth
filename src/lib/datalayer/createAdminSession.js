/*
    Data:
        id: string; <- auto
        createdAt: Date; <- auto
        updatedAt: Date; <- auto
        expiresAt: Date; <- auto
        handle: string; <- auto
        adminId: string; <- auto
        ip: string; <- auto
        userAgent: string; <- auto

*/ 

const AdminSessionRepository = require('../../dbacess/adminsession');
const { generateToken } = require("../encript/genhash");

function createAdminSession(adminId, ip, userAgent) {
    return new Promise(async (resolve, reject) => {
        const sessionRepository = new AdminSessionRepository();
        try {
            const session = await sessionRepository.create({
                handle: generateToken(32),
                adminId,
                ip,
                userAgent,
                expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)
            });
            resolve(session);
        } catch (error) {
            reject(error);
        }
    });
}

// Test
createAdminSession("5f9f9b9b9b9b9b9b9b9b9b9b", "::1", "testagent").then((session) => {
    console.log(session);
}).catch((error) => {
    console.log(error);
});