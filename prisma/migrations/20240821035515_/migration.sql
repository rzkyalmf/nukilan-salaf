-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_VerificationCode" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "code" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastSentAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resendCount" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "VerificationCode_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_VerificationCode" ("code", "createdAt", "id", "lastSentAt", "resendCount", "userId") SELECT "code", coalesce("createdAt", CURRENT_TIMESTAMP) AS "createdAt", "id", coalesce("lastSentAt", CURRENT_TIMESTAMP) AS "lastSentAt", "resendCount", "userId" FROM "VerificationCode";
DROP TABLE "VerificationCode";
ALTER TABLE "new_VerificationCode" RENAME TO "VerificationCode";
CREATE UNIQUE INDEX "VerificationCode_userId_key" ON "VerificationCode"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
