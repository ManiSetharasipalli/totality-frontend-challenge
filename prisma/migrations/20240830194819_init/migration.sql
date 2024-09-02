/*
  Warnings:

  - You are about to alter the column `totalCost` on the `booking` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal(65,30)`.
  - You are about to drop the column `addedAt` on the `cart` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `payment` table. All the data in the column will be lost.
  - You are about to alter the column `amount` on the `payment` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal(65,30)`.
  - You are about to alter the column `price` on the `property` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal(65,30)`.
  - Added the required column `endDate` to the `Cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `Cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subtotalCost` to the `Cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bookingId` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentDate` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentMethod` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentStatus` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Property` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `booking` MODIFY `totalCost` DECIMAL(65, 30) NOT NULL;

-- AlterTable
ALTER TABLE `cart` DROP COLUMN `addedAt`,
    ADD COLUMN `endDate` DATETIME(3) NOT NULL,
    ADD COLUMN `startDate` DATETIME(3) NOT NULL,
    ADD COLUMN `subtotalCost` DECIMAL(65, 30) NOT NULL;

-- AlterTable
ALTER TABLE `payment` DROP COLUMN `date`,
    ADD COLUMN `bookingId` INTEGER NOT NULL,
    ADD COLUMN `paymentDate` DATETIME(3) NOT NULL,
    ADD COLUMN `paymentMethod` VARCHAR(191) NOT NULL,
    ADD COLUMN `paymentStatus` VARCHAR(191) NOT NULL,
    MODIFY `amount` DECIMAL(65, 30) NOT NULL;

-- AlterTable
ALTER TABLE `property` ADD COLUMN `location` VARCHAR(191) NOT NULL,
    MODIFY `price` DECIMAL(65, 30) NOT NULL;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_bookingId_fkey` FOREIGN KEY (`bookingId`) REFERENCES `Booking`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
