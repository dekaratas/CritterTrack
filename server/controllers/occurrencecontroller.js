const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const lookup = require('coordinate_to_country');
const {countryCodes} = require('../Utils/CountryHashTable.js')

async function createOccurrence(entry) {
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

    // Intercept times when country is not given because we will ALWAYS have lat and long 
    let newCountry = country;

    if (country == null) {
      const evalCountry = lookup(decimalLatitude, decimalLongitude);
      if (Array.isArray(evalCountry)) {
       newCountry = countryCodes.get(evalCountry[0]);
      } else {
       newCountry = countryCodes.get(evalCountry + "");
      }
    }
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
        country: newCountry,
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

async function deleteOccurrence(req, res) {
  try {
    const { id } = req.params;
    console.log("ID:", id);
    const entry = await prisma.occurrence.delete({
      where: { id: parseInt(id) },
    });
    console.log("The following entry was successfully deleted: ", entry);
    res.status(201).send(entry);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong, oops!");
  }
}

module.exports = {
  createOccurrences,
  deleteOccurrence
};
