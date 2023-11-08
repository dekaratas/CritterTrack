import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Prisma queries will go here
  // TODO: Write them queries boy
  const user = await prisma.personalSighting.create({
    data: {
      date: new Date(),
      vernacular: 'Blue Whale',
      sst: 15.38,
      sss: 33.44,
      shoredistance: 3829,
      depth: 20,
      count: 1,
      imgURL: 'image link',
      longitude: -119.77,
      latitude: 34.13,
      country: 'New Zealand',
    },
  })
  console.log(user)
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