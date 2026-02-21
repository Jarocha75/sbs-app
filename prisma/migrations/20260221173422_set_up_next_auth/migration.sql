/*
  Warnings:

  - Added the required column `passed` to the `TestResult` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Test" ADD COLUMN     "passScore" INTEGER NOT NULL DEFAULT 75;

-- AlterTable
ALTER TABLE "TestResult" ADD COLUMN     "passed" BOOLEAN NOT NULL;
