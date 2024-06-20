/*
  Warnings:

  - You are about to drop the column `phone_number` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `profile_image_url` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `thumbnail_image_url` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `phone_number`,
    DROP COLUMN `profile_image_url`,
    DROP COLUMN `thumbnail_image_url`,
    ADD COLUMN `phoneNumber` CHAR(13) NOT NULL DEFAULT '',
    ADD COLUMN `profileImageUrl` VARCHAR(255) NOT NULL DEFAULT '',
    ADD COLUMN `thumbnailImageUrl` VARCHAR(255) NOT NULL DEFAULT '';
