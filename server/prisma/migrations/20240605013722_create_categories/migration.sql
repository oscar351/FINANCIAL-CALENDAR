-- AlterTable
ALTER TABLE `users` MODIFY `password` VARCHAR(255) NOT NULL DEFAULT '',
    MODIFY `profile_image_url` VARCHAR(255) NOT NULL DEFAULT '',
    MODIFY `thumbnail_image_url` VARCHAR(255) NOT NULL DEFAULT '';
