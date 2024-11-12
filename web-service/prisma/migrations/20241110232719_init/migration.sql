/*
  Warnings:

  - Added the required column `level` to the `Phase` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `phase` ADD COLUMN `level` ENUM('BEGINNER', 'INTERMEDIATE', 'ADVANCED') NOT NULL;
