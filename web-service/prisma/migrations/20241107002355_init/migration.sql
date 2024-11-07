/*
  Warnings:

  - You are about to drop the column `userId` on the `quiz` table. All the data in the column will be lost.
  - You are about to drop the `_quizquestions` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[enrollCode]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `_quizquestions` DROP FOREIGN KEY `_QuizQuestions_A_fkey`;

-- DropForeignKey
ALTER TABLE `_quizquestions` DROP FOREIGN KEY `_QuizQuestions_B_fkey`;

-- DropForeignKey
ALTER TABLE `alternative` DROP FOREIGN KEY `Alternative_questionId_fkey`;

-- DropForeignKey
ALTER TABLE `quiz` DROP FOREIGN KEY `Quiz_userId_fkey`;

-- AlterTable
ALTER TABLE `quiz` DROP COLUMN `userId`;

-- DropTable
DROP TABLE `_quizquestions`;

-- CreateTable
CREATE TABLE `Phase` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_PhaseQuestions` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_PhaseQuestions_AB_unique`(`A`, `B`),
    INDEX `_PhaseQuestions_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_QuizPhases` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_QuizPhases_AB_unique`(`A`, `B`),
    INDEX `_QuizPhases_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `User_enrollCode_key` ON `User`(`enrollCode`);

-- AddForeignKey
ALTER TABLE `Alternative` ADD CONSTRAINT `Alternative_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `Question`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PhaseQuestions` ADD CONSTRAINT `_PhaseQuestions_A_fkey` FOREIGN KEY (`A`) REFERENCES `Phase`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PhaseQuestions` ADD CONSTRAINT `_PhaseQuestions_B_fkey` FOREIGN KEY (`B`) REFERENCES `Question`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_QuizPhases` ADD CONSTRAINT `_QuizPhases_A_fkey` FOREIGN KEY (`A`) REFERENCES `Phase`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_QuizPhases` ADD CONSTRAINT `_QuizPhases_B_fkey` FOREIGN KEY (`B`) REFERENCES `Quiz`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
