/*
  Warnings:

  - You are about to drop the column `bio` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `isCoded` on the `ProfileGroup` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Group` ADD COLUMN `allImagesCoded` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `Image` DROP COLUMN `bio`;

-- AlterTable
ALTER TABLE `ProfileGroup` DROP COLUMN `isCoded`;
