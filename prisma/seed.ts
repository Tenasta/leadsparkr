import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const alice = await prisma.user.upsert({
    where: { email: "alice@leadsparkr.com" },
    update: {},
    create: {
      email: "alice@leadsparkr.com",
      first_name: "Alice",
      last_name: "Smith",
      forms: {
        create: [
          {
            name: "First Form Alice",
            botDetection: false,
            notificationPreference: "ALL",
            endpoint: "wd32dfx",
          },
        ],
      },
    },
  });
  const bob = await prisma.user.upsert({
    where: { email: "bob@leadsparkr.com" },
    update: {},
    create: {
      email: "bob@leadsparkr.com",
      first_name: "Bob",
      last_name: "Angus",
      forms: {
        create: [
          {
            name: "First Form Bob",
            botDetection: false,
            notificationPreference: "ALL",
            endpoint: "ddwc2s",
          },
        ],
      },
    },
  });
  console.log({ alice, bob });
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
