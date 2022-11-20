/*
  Warnings:

  - You are about to drop the column `imageFile` on the `Image` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Image` DROP COLUMN `imageFile`,
    ADD COLUMN `name` VARCHAR(191) NOT NULL DEFAULT 'image',
    ADD COLUMN `path` VARCHAR(191) NOT NULL DEFAULT 'image';
