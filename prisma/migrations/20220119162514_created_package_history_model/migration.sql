-- CreateTable
CREATE TABLE "PackageHistory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "packageId" INTEGER NOT NULL,
    "clientId" INTEGER NOT NULL,
    "courierId" INTEGER,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME,
    "status" TEXT NOT NULL,
    CONSTRAINT "PackageHistory_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "Package" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PackageHistory_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PackageHistory_courierId_fkey" FOREIGN KEY ("courierId") REFERENCES "Courier" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "PackageHistory_packageId_key" ON "PackageHistory"("packageId");
