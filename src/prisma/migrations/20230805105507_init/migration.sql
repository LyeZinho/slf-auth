-- AlterTable
ALTER TABLE "User" ADD COLUMN     "confirmToken" TEXT,
ADD COLUMN     "confirmTokenExpiresAt" TIMESTAMP(3);
