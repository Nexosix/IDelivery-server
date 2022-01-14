-- CreateTable
CREATE TABLE "Courier" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "uuid" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "active" INTEGER NOT NULL,
    "expireDate" DATETIME
);

-- CreateIndex
CREATE UNIQUE INDEX "Courier_uuid_key" ON "Courier"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Courier_email_key" ON "Courier"("email");
