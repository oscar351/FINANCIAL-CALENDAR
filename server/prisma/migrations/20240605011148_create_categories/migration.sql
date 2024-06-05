/*
  Warnings:

  - Added the required column `profile_image_url` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thumbnail_image_url` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `users` ADD COLUMN `profile_image_url` VARCHAR(255) NOT NULL,
    ADD COLUMN `thumbnail_image_url` VARCHAR(255) NOT NULL;
