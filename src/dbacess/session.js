/*
model Session {
  id        String   @id @default(uuid())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  expiresAt DateTime
  handle    String   @unique
  userId    String
  user      User     @relation(fields: [userId], references: [id])

  // Context
  ip        String?
  userAgent String?

  // Opposite relation field
  @@index([userId], name: "user_sessions")
}
*/ const { PrismaClient } = require('@prisma/client');

class SessionRepository {
    constructor() {
        this.prisma = new PrismaClient();
    }

    async create(session) {
        try {
            return await this.prisma.session.create({ data: session });
        } catch (error) {
            console.error(`Error creating session: ${error}`);
            throw error;
        }
    }

    async findById(id) {
        try {
            return await this.prisma.session.findUnique({ where: { id } });
        } catch (error) {
            console.error(`Error finding session by id: ${error}`);
            throw error;
        }
    }

    async findByHandle(handle) {
        try {
            return await this.prisma.session.findUnique({ where: { handle } });
        } catch (error) {
            console.error(`Error finding session by handle: ${error}`);
            throw error;
        }
    }

    async update(id, session) {
        try {
            return await this.prisma.session.update({ where: { id }, data: session });
        } catch (error) {
            console.error(`Error updating session: ${error}`);
            throw error;
        }
    }

    async delete(id) {
        try {
            return await this.prisma.session.delete({ where: { id } });
        } catch (error) {
            console.error(`Error deleting session: ${error}`);
            throw error;
        }
    }
}

module.exports = SessionRepository;
