/*
  Warnings:

  - Added the required column `phone_number` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `users` ADD COLUMN `phone_number` CHAR(13) NOT NULL;
