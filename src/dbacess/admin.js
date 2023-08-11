/*
model Admin {
  id        String   @id @default(uuid())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  name      String   @unique
  secret    String   @unique
  adminHash String   @unique
  baseUrl   String
  redirectUri String

  // Opposite relation field
  sessions AdminSession[]
}
*/ 
const { PrismaClient } = require('@prisma/client');

class AdminRepository {
  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(adminData) {
    try {
      const admin = await this.prisma.admin.create({
        data: adminData,
      });
      return admin;
    } catch (error) {
      console.error(`Error in AdminRepository.create: ${error}`);
      throw error;
    }
  }

  async findById(adminId) {
    try {
      const admin = await this.prisma.admin.findUnique({
        where: { id: adminId },
      });
      return admin;
    } catch (error) {
      console.error(`Error in AdminRepository.findById: ${error}`);
      throw error;
    }
  }

  async findBySecret(adminSecret) {
    try {
      const admin = await this.prisma.admin.findUnique({
        where: { secret: adminSecret },
      });
      return admin;
    } catch (error) {
      console.error(`Error in AdminRepository.findBySecret: ${error}`);
      throw error;
    }
  }

  async findByField(field, value) {
    try {
      const admin = await this.prisma.admin.findUnique({
        where: { [field]: value },
      });
      return admin;
    } catch (error) {
      console.error(`Error in AdminRepository.findByField: ${error}`);
      throw error;
    }
  }

  async update(adminId, adminData) {
    try {
      const admin = await this.prisma.admin.update({
        where: { id: adminId },
        data: adminData,
      });
      return admin;
    } catch (error) {
      console.error(`Error in AdminRepository.update: ${error}`);
      throw error;
    }
  }

  async delete(adminId) {
    try {
      const admin = await this.prisma.admin.delete({
        where: { id: adminId },
      });
      return admin;
    } catch (error) {
      console.error(`Error in AdminRepository.delete: ${error}`);
      throw error;
    }
  }
}

module.exports = AdminRepository;
