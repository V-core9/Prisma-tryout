/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Diary` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Diary" ADD COLUMN "slug" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Diary_slug_key" ON "Diary"("slug");
