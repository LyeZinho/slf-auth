/*
  Warnings:

  - You are about to drop the column `baseUrl` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `redirectUri` on the `Admin` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "baseUrl",
DROP COLUMN "redirectUri";
