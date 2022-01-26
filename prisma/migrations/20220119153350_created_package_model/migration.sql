/*
  Warnings:

  - Added the required column `packageLocationId` to the `Location` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Package" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "uuid" INTEGER NOT NULL,
    "addressFromId" INTEGER NOT NULL,
    "addressToId" INTEGER NOT NULL,
    "price" REAL NOT NULL,
    "weight" REAL NOT NULL,
    "distance" REAL NOT NULL,
    "accessCode" TEXT,
    "description" TEXT,
    CONSTRAINT "Package_addressFromId_fkey" FOREIGN KEY ("addressFromId") REFERENCES "Address" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Package_addressToId_fkey" FOREIGN KEY ("addressToId") REFERENCES "Address" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Location" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "lat" REAL NOT NULL,
    "long" REAL NOT NULL,
    "addressId" INTEGER NOT NULL,
    "packageLocationId" INTEGER NOT NULL,
    CONSTRAINT "Location_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Location_packageLocationId_fkey" FOREIGN KEY ("packageLocationId") REFERENCES "Package" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Location" ("addressId", "id", "lat", "long") SELECT "addressId", "id", "lat", "long" FROM "Location";
DROP TABLE "Location";
ALTER TABLE "new_Location" RENAME TO "Location";
CREATE UNIQUE INDEX "Location_addressId_key" ON "Location"("addressId");
CREATE UNIQUE INDEX "Location_packageLocationId_key" ON "Location"("packageLocationId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Package_uuid_key" ON "Package"("uuid");
