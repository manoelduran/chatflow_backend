/*
  Warnings:

  - Added the required column `owner_id` to the `chats` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "chats" ADD COLUMN     "owner_id" TEXT NOT NULL;
