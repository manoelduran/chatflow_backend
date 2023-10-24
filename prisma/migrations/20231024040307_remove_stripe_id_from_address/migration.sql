/*
  Warnings:

  - You are about to drop the column `stripe_billing_address_id` on the `addresses` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "addresses_stripe_billing_address_id_key";

-- AlterTable
ALTER TABLE "addresses" DROP COLUMN "stripe_billing_address_id";
