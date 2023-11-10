const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { parseISO } = require("date-fns");

async function createOccurrence(entry) {
  // Extract relevant data from the API response
  const {
    id,
    basisOfRecord,
    dataset_id,
    scientificName,
    originalScientificName,
    vernacularName,
    decimalLatitude,
    decimalLongitude,
    coordinateUncertaintyInMeters,
    country,
    sex,
    locality,
    waterBody,
    sst,
    sss,
    habitat,
    eventDate,
    date_start,
    eventID,
    occurrenceID,
    minimumDepthInMeters,
    maximumDepthInMeters,
    depth,
    organismQuantity,
    individualCount,
    recordedBy,
    shoredistance,
    marine,
    brackish,
    flags,
    category,
  } = entry;

  try {
    const parsedEventDate = new Date(eventDate);
    const parsedDateStart = new Date(parseInt(date_start, 10));
    const parsedIndCount = +individualCount;

    const newOccurrence = await prisma.occurrence.create({
      data: {
        id,
        basisOfRecord,
        dataset_id,
        scientificName,
        originalScientificName,
        vernacularName,
        decimalLatitude,
        decimalLongitude,
        coordinateUncertaintyInMeters,
        country,
        sex,
        locality,
        waterBody,
        sst,
        sss,
        habitat,
        eventDate: parsedEventDate,
        date_start: parsedDateStart,
        eventID,
        occurrenceID,
        minimumDepthInMeters,
        maximumDepthInMeters,
        depth,
        organismQuantity,
        individualCount: parsedIndCount,
        recordedBy,
        shoredistance,
        marine,
        brackish,
        flags,
        category,
      },
    });

    console.log("New Occurrence created:", newOccurrence);
  } catch (error) {
    console.error("Error creating Occurrence:", error);
  }
}

async function createOccurrences(apiData) {
  console.log(apiData);
  for (const entry of apiData.body) {
    await createOccurrence(entry);
  }
  await prisma.$disconnect();
}

module.exports = {
  createOccurrences,
};
