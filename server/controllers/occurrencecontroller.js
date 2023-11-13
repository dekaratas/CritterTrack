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

module.exports = {
  getOccCount,
  getSpeciesCount,
};
