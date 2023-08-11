/*
model AdminSession {
  id        String   @id @default(uuid())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  expiresAt DateTime
  handle    String   @unique
  adminId   String
  admin     Admin    @relation(fields: [adminId], references: [id])

  // Context
  ip        String?
  userAgent String?

  // Opposite relation field
  @@index([adminId], name: "admin_adminSessions")
}
*/const { PrismaClient } = require('@prisma/client');

class AdminSessionRepository {
    constructor() {
        this.prisma = new PrismaClient();
    }

    async create(sessionData) {
        const session = await this.prisma.adminSession.create({
            data: sessionData,
        });
        return session;
    }

    async findById(id) {
        const session = await this.prisma.adminSession.findUnique({
            where: { id },
            include: { admin: true },
        });
        return session;
    }

    async findByHandle(handle) {
        const session = await this.prisma.adminSession.findUnique({
            where: { handle },
            include: { admin: true },
        });
        return session;
    }

    async update(id, sessionData) {
        const session = await this.prisma.adminSession.update({
            where: { id },
            data: sessionData,
            include: { admin: true },
        });
        return session;
    }

    async delete(id) {
        const session = await this.prisma.adminSession.delete({
            where: { id },
        });
        return session;
    }
}

// Test
function test() {
    const adminSessionRepository = new AdminSessionRepository();

    // Create
    const sessionData = {
        handle: 'test-session',
        adminId: 'test-admin',
        expiresAt: new Date(),
    };

    adminSessionRepository.create(sessionData).then((session) => {
        console.log('Created session:');
        console.log(session);
    });
}

test();

module.exports = AdminSessionRepository;