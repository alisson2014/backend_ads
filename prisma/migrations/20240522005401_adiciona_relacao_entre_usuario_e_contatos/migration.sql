/*
  Warnings:

  - Added the required column `usersId` to the `Contacts` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Contacts" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "usersId" INTEGER NOT NULL,
    CONSTRAINT "Contacts_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Contacts" ("email", "id", "name", "phone") SELECT "email", "id", "name", "phone" FROM "Contacts";
DROP TABLE "Contacts";
ALTER TABLE "new_Contacts" RENAME TO "Contacts";
CREATE UNIQUE INDEX "Contacts_phone_key" ON "Contacts"("phone");
CREATE UNIQUE INDEX "Contacts_email_key" ON "Contacts"("email");
PRAGMA foreign_key_check("Contacts");
PRAGMA foreign_keys=ON;
