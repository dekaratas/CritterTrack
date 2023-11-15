const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const lookup = require("coordinate_to_country");
const { countryCodes } = require("../Utils/CountryHashTable.js");
const getOccurrences = require("../Utils/apiClientService.js");

// I call it API controller but it's more or less a very verbose helper function to get data in the shape I want from OBIS' API

async function apiConsoomer() {
  const delayInSeconds = 2;
  let currentDate = new Date();

  setInterval(async () => {
    const startDate = currentDate.toISOString().split("T")[0];
    const endDate = currentDate.toISOString().split("T")[0];

    const query = `?startdate=${startDate}&enddate=${endDate}&size=50`;
    const data = await getOccurrences(query);
    for (const myEntry of data.results) {
      const parsedDateStart = new Date(parseInt(myEntry.date_start, 10));
      const parsedIndCount = +myEntry.individualCount;
      const parsedOrgQuant = +myEntry.organismQuantity;

      // Intercept times when country is not given because we will ALWAYS have lat and long
      let newCountry = await myEntry.country;

      if (myEntry.country == null) {
        const evalCountry = await lookup(
          myEntry.decimalLatitude,
          myEntry.decimalLongitude
        );
        if (Array.isArray(evalCountry)) {
          newCountry = countryCodes.get(evalCountry[0]);
        } else {
          newCountry = countryCodes.get(evalCountry + "");
        }
      }

      const occurrence = await prisma.occurrence.create({
        data: {
          id: myEntry.id,
          basisOfRecord: myEntry.basisOfRecord,
          datasetName: myEntry.datasetName,
          dataset_id: myEntry.dataset_id,
          scientificName: myEntry.scientificName,
          originalScientificName: myEntry.originalScientificName,
          vernacularName: myEntry.vernacularName,
          decimalLatitude: myEntry.decimalLatitude,
          decimalLongitude: myEntry.decimalLongitude,
          coordinateUncertaintyInMeters: myEntry.coordinateToCountry,
          country: newCountry,
          sex: myEntry.sex,
          locality: myEntry.locality,
          waterBody: myEntry.waterBody,
          sst: myEntry.sst,
          sss: myEntry.sss,
          habitat: myEntry.habitat,
          date_start: parsedDateStart,
          occurrenceID: myEntry.occurrenceID,
          minimumDepthInMeters: myEntry.minimumDepthInMeters,
          maximumDepthInMeters: myEntry.maximumDepthInMeters,
          depth: myEntry.depth,
          organismQuantity: parsedOrgQuant,
          individualCount: parsedIndCount,
          recordedBy: myEntry.recordedBy,
          shoredistance: myEntry.shoredistance,
          marine: myEntry.marine,
          brackish: myEntry.brackish,
          flags: myEntry.flags,
          category: myEntry.category,
        },
      });
      console.log(occurrence);
    }
    currentDate.setDate(currentDate.getDate() - 20);
  }, delayInSeconds * 1000);
}

module.exports = apiConsoomer;
