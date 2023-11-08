-- CreateTable
CREATE TABLE "PersonalSighting" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "vernacular" TEXT NOT NULL,
    "sst" DOUBLE PRECISION NOT NULL,
    "sss" DOUBLE PRECISION NOT NULL,
    "shoredistance" INTEGER NOT NULL,
    "depth" INTEGER,
    "count" INTEGER NOT NULL,
    "imgURL" TEXT NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "country" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PersonalSighting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Species" (
    "id" SERIAL NOT NULL,
    "sci_name" TEXT NOT NULL,
    "vernacular" TEXT NOT NULL,
    "redlistStatus" BOOLEAN NOT NULL DEFAULT false,
    "category" TEXT,
    "sight_count" INTEGER NOT NULL,
    "sst" DOUBLE PRECISION[],
    "sss" DOUBLE PRECISION[],
    "coordinates" TEXT[],
    "depth" INTEGER[],
    "count" INTEGER[],

    CONSTRAINT "Species_pkey" PRIMARY KEY ("id")
);
