/*
  Warnings:

  - You are about to drop the column `quantity` on the `booking` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `booking` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `booking` DROP COLUMN `quantity`,
    DROP COLUMN `type`;
