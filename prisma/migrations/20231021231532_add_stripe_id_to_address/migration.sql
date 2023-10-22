/*
  Warnings:

  - A unique constraint covering the columns `[stripe_billing_address_id]` on the table `addresses` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "addresses" ADD COLUMN     "stripe_billing_address_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "addresses_stripe_billing_address_id_key" ON "addresses"("stripe_billing_address_id");
