-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Package" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "uuid" TEXT NOT NULL,
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
INSERT INTO "new_Package" ("accessCode", "addressFromId", "addressToId", "description", "distance", "id", "price", "uuid", "weight") SELECT "accessCode", "addressFromId", "addressToId", "description", "distance", "id", "price", "uuid", "weight" FROM "Package";
DROP TABLE "Package";
ALTER TABLE "new_Package" RENAME TO "Package";
CREATE UNIQUE INDEX "Package_uuid_key" ON "Package"("uuid");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
