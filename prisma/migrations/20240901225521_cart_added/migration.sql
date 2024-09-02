-- DropIndex
DROP INDEX `Booking_propertyId_fkey` ON `booking`;

-- DropIndex
DROP INDEX `Booking_userId_fkey` ON `booking`;

-- AlterTable
ALTER TABLE `booking` ADD COLUMN `quantity` INTEGER NOT NULL DEFAULT 1,
    ADD COLUMN `type` VARCHAR(191) NOT NULL DEFAULT 'Booking';
