const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const lookup = require("coordinate_to_country");

async function getOccCount(req, res) {
  const occurrencesCount = await prisma.occurrence.count();
  res.status(200).send(`${occurrencesCount}`);
  console.log(`Number of occurrences: ${occurrencesCount}`);
}

async function getSpeciesCount(req, res) {
  const uniqueSpeciesCount = await prisma.occurrence.findMany({
    distinct: ["scientificName"],
    select: {
      scientificName: true,
    },
  });
  res.status(200).send(`${uniqueSpeciesCount.length}`);
  console.log(`Number of unique species: ${uniqueSpeciesCount.length}`);
}

//! Get all specific countries
async function getCountryNames(req, res) {
  try {
    const uniqueCountries = await prisma.occurrence.findMany({
      distinct: ["country"],
      select: {
        country: true,
      },
    });

    const countryNames = uniqueCountries.map((entry) => entry.country);

    res.status(200).send(JSON.stringify(countryNames));
    // console.log(`Unique countries: ${JSON.stringify(countryNames)}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving data!");
  }
}

//! Get unique Species names
async function getSpecies(req, res) {
  try {
    const uniqueSpecies = await prisma.occurrence.findMany({
      distinct: ["vernacularName"],
      select: {
        vernacularName: true,
      },
    });

    const speciesNames = uniqueSpecies.map((entry) => entry.vernacularName);

    res.status(200).send(JSON.stringify(speciesNames));
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving data!");
  }
}

//! Get Occ count based on country
async function getCountryCount(req, res) {
  try {
    const { country } = req.params;
    const scientificNamesInCountry = await prisma.occurrence.findMany({
      where: {
        country: country,
      },
      select: {
        scientificName: true,
      },
    });

    // console.log(scientificNamesInCountry.length);
    res.status(200).send(`${scientificNamesInCountry.length}`);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error retreiving data!");
  }
}

module.exports = {
  getOccCount,
  getSpeciesCount,
  getCountryCount,
  getCountryNames,
  getSpecies,
};
