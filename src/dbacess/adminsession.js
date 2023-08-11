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
*/ 
class AdminSessionRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }

    async create(adminSessionData) {
        const adminSession = await this.prisma.adminSession.create({
            data: adminSessionData,
        });
        return adminSession;
    }

    async findById(id) {
        const adminSession = await this.prisma.adminSession.findUnique({
            where: { id },
            include: { admin: true },
        });
        return adminSession;
    }

    async findByHandle(handle) {
        const adminSession = await this.prisma.adminSession.findUnique({
            where: { handle },
            include: { admin: true },
        });
        return adminSession;
    }

    async update(id, adminSessionData) {
        const adminSession = await this.prisma.adminSession.update({
            where: { id },
            data: adminSessionData,
            include: { admin: true },
        });
        return adminSession;
    }

    async delete(id) {
        const adminSession = await this.prisma.adminSession.delete({
            where: { id },
            include: { admin: true },
        });
        return adminSession;
    }
}

module.exports = AdminSessionRepository;