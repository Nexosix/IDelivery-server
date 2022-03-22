/*
  Warnings:

  - You are about to drop the column `long` on the `Location` table. All the data in the column will be lost.
  - Added the required column `lon` to the `Location` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Location" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "lat" REAL NOT NULL,
    "lon" REAL NOT NULL,
    "addressId" INTEGER,
    "packageLocationId" INTEGER,
    CONSTRAINT "Location_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Location_packageLocationId_fkey" FOREIGN KEY ("packageLocationId") REFERENCES "Package" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Location" ("addressId", "id", "lat", "packageLocationId") SELECT "addressId", "id", "lat", "packageLocationId" FROM "Location";
DROP TABLE "Location";
ALTER TABLE "new_Location" RENAME TO "Location";
CREATE UNIQUE INDEX "Location_addressId_key" ON "Location"("addressId");
CREATE UNIQUE INDEX "Location_packageLocationId_key" ON "Location"("packageLocationId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
