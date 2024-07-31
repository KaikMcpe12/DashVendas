/*
  Warnings:

  - The primary key for the `user_has_products` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The required column `id` was added to the `user_has_products` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_user_has_products" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "datePurchase" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "user_has_products_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "user_has_products_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_user_has_products" ("datePurchase", "productId", "userId") SELECT "datePurchase", "productId", "userId" FROM "user_has_products";
DROP TABLE "user_has_products";
ALTER TABLE "new_user_has_products" RENAME TO "user_has_products";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
