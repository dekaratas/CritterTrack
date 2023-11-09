const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

//TODO: Implement check if all data is supplied in addNewRecord

async function getAllRecords(req, res) {
  try {
    async function main() {
      const sightings = await prisma.personalSighting.findMany();
      console.log(sightings);
      res.status(200).send(sightings);
    }
    main()
      .then(async () => {
        await prisma.$disconnect();
      })
      .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
      });
  } catch (error) {
    console.error(error);
  }
}

async function addNewRecord(req, res) {
  try {
    const newRecord = req.body;

    const transformedRecord = {
      ...newRecord,
      sst: parseFloat(newRecord.sst),
      sss: parseFloat(newRecord.sss),
      shoredistance: parseFloat(newRecord.shoredistance),
      depth: parseFloat(newRecord.depth),
      count: parseInt(newRecord.count, 10),
      latitude: parseFloat(newRecord.latitude),
      longitude: parseFloat(newRecord.longitude),
    };

    async function main(myData) {
      const record = await prisma.personalSighting.create({
        data: {
          date: myData.date,
          vernacular: myData.vernacular,
          sst: myData.sst,
          sss: myData.sss,
          shoredistance: myData.shoredistance,
          depth: myData.shoredistance,
          count: myData.count,
          imgURL: myData.imgURL,
          longitude: myData.longitude,
          latitude: myData.latitude,
          country: myData.country,
        },
      });
      res.status(201).send(record);
    }
    main(transformedRecord)
      .then(async () => {
        await prisma.$disconnect();
      })
      .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
      });
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  getAllRecords,
  addNewRecord,
};
