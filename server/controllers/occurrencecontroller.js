const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const lookup = require("coordinate_to_country");
const { countryCodes } = require("../Utils/CountryHashTable.js");

async function createOccurrence(entry, req, res) {
  const {
    id,
    basisOfRecord,
    datasetName,
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

  //! To be added sometime this weekend so we can have some actual data to work with on the Front
  // air_pressure
  // botTemp
  // botSal
  // forkLength
  // weight and more

  try {
    // Essentially the makeshit place where I push and shove the data we have into a format that Prisma
    // is happy with, should all be self explanatory
    const parsedEventDate = new Date(eventDate);
    const parsedDateStart = new Date(parseInt(date_start, 10));
    const parsedIndCount = +individualCount;
    const parsedOrgQuant = +organismQuantity;

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
        datasetName,
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
        organismQuantity: parsedOrgQuant,
        individualCount: parsedIndCount,
        recordedBy,
        shoredistance,
        marine,
        brackish,
        flags,
        category,
      },
    });
  } catch (error) {
    console.error("Something went wrong!", error);
  }
}

// Only 'create' function to be exported in this file since its sole purpose is to create as much data as possible
// TODO: Fix node complaining about res.send not being a function in my try/catch statement
async function createOccurrences(apiData, req, res) {
  try {
    for (const entry of apiData.body) {
      await createOccurrence(entry, req, res);
    }
    console.log("Great Success!");
    await prisma.$disconnect();
  } catch (error) {
    console.log("Great Failure!");
  }
}

// TODO: Figure out if it's best to use their unique IDs or just go with an incrementing one
// Deleting via id as endpoint doesn't work when the id is like 00000753-6618-43c7-8875-89a150c39097
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
    res.status(500).send("Failed to remove the entry!");
  }
}

module.exports = {
  createOccurrences,
  deleteOccurrence,
};
