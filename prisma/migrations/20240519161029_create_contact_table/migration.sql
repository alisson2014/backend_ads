-- CreateTable
CREATE TABLE "Contacts" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Contacts_phone_key" ON "Contacts"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Contacts_email_key" ON "Contacts"("email");
