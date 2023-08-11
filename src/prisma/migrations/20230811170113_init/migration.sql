-- CreateTable
CREATE TABLE "ApiKey" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ApiKey_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "secret" TEXT NOT NULL,
    "adminHash" TEXT NOT NULL,
    "baseUrl" TEXT NOT NULL,
    "redirectUri" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Aplication" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "secret" TEXT NOT NULL,
    "jwtSecret" TEXT NOT NULL,
    "encriptionKey" TEXT NOT NULL,
    "baseUrl" TEXT NOT NULL,
    "redirectUri" TEXT NOT NULL,

    CONSTRAINT "Aplication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminSession" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "handle" TEXT NOT NULL,
    "adminId" TEXT NOT NULL,
    "ip" TEXT,
    "userAgent" TEXT,

    CONSTRAINT "AdminSession_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ApiKey_key_key" ON "ApiKey"("key");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_name_key" ON "Admin"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_secret_key" ON "Admin"("secret");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_adminHash_key" ON "Admin"("adminHash");

-- CreateIndex
CREATE UNIQUE INDEX "Aplication_name_key" ON "Aplication"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Aplication_secret_key" ON "Aplication"("secret");

-- CreateIndex
CREATE UNIQUE INDEX "Aplication_jwtSecret_key" ON "Aplication"("jwtSecret");

-- CreateIndex
CREATE UNIQUE INDEX "AdminSession_handle_key" ON "AdminSession"("handle");

-- CreateIndex
CREATE INDEX "admin_adminSessions" ON "AdminSession"("adminId");

-- AddForeignKey
ALTER TABLE "ApiKey" ADD CONSTRAINT "ApiKey_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdminSession" ADD CONSTRAINT "AdminSession_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
