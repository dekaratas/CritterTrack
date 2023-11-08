const { PrismaClient } = require ("@prisma/client");

const prisma = new PrismaClient();

async function getAllRecords() {
  async function main() {
    const sightings = await prisma.personalSighting.findMany();
    console.log(sightings);
  }
  main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  });
};

module.exports = {
  getAllRecords
}