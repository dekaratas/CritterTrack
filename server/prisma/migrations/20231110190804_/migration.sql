/*
  Warnings:

  - You are about to drop the `Species` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `country` on table `PersonalSighting` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "PersonalSighting" ALTER COLUMN "country" SET NOT NULL;

-- DropTable
DROP TABLE "Species";

-- CreateTable
CREATE TABLE "Occurrence" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "basisOfRecord" TEXT,
    "datasetName" TEXT,
    "dataset_id" TEXT,
    "scientificName" TEXT,
    "originalScientificName" TEXT,
    "vernacularName" TEXT,
    "decimalLatitude" DOUBLE PRECISION,
    "decimalLongitude" DOUBLE PRECISION,
    "coordinateUncertaintyInMeters" TEXT,
    "country" TEXT,
    "sex" TEXT,
    "locality" TEXT,
    "waterBody" TEXT,
    "sst" DOUBLE PRECISION,
    "sss" DOUBLE PRECISION,
    "habitat" TEXT,
    "eventDate" TIMESTAMP(3),
    "date_start" TIMESTAMP(3),
    "eventID" TEXT,
    "occurrenceID" TEXT,
    "minimumDepthInMeters" INTEGER,
    "maximumDepthInMeters" INTEGER,
    "depth" DOUBLE PRECISION,
    "organismQuantity" INTEGER,
    "individualCount" DOUBLE PRECISION,
    "recordedBy" TEXT,
    "shoredistance" INTEGER,
    "marine" BOOLEAN,
    "brackish" BOOLEAN,
    "flags" TEXT[],
    "category" TEXT,

    CONSTRAINT "Occurrence_pkey" PRIMARY KEY ("id")
);
