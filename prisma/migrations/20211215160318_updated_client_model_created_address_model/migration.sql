/*
  Warnings:

  - Added the required column `email` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hash` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uuid` to the `Client` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Address" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "country" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "flatNumber" TEXT NOT NULL,
    "apartmentNumber" TEXT,
    "postCode" TEXT NOT NULL,
    "clientId" INTEGER NOT NULL,
    CONSTRAINT "Address_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Client" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "uuid" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "hash" TEXT NOT NULL
);
INSERT INTO "new_Client" ("id", "lastname", "name") SELECT "id", "lastname", "name" FROM "Client";
DROP TABLE "Client";
ALTER TABLE "new_Client" RENAME TO "Client";
CREATE UNIQUE INDEX "Client_uuid_key" ON "Client"("uuid");
CREATE UNIQUE INDEX "Client_email_key" ON "Client"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Address_clientId_key" ON "Address"("clientId");
