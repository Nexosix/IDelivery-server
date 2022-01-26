-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Address" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "country" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "flatNumber" TEXT NOT NULL,
    "apartmentNumber" TEXT,
    "postCode" TEXT NOT NULL,
    "clientId" INTEGER,
    CONSTRAINT "Address_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Address" ("apartmentNumber", "city", "clientId", "country", "flatNumber", "id", "postCode", "street") SELECT "apartmentNumber", "city", "clientId", "country", "flatNumber", "id", "postCode", "street" FROM "Address";
DROP TABLE "Address";
ALTER TABLE "new_Address" RENAME TO "Address";
CREATE UNIQUE INDEX "Address_clientId_key" ON "Address"("clientId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
