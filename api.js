import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.auditLog.deleteMany();
  await prisma.matchTable.deleteMany();
  await prisma.waitingList.deleteMany();
  await prisma.organ.deleteMany();
  await prisma.recipient.deleteMany();
  await prisma.donor.deleteMany();
  await prisma.person.deleteMany();
  await prisma.hospital.deleteMany();

  await prisma.hospital.createMany({
    data: [
      { name: "AIIMS", location: "Delhi" },
      { name: "Apollo", location: "Chennai" },
      { name: "Fortis", location: "Mumbai" }
    ]
  });

  const donorPerson = await prisma.person.create({
    data: {
      name: "Rahul",
      age: 25,
      gender: "Male",
      blood_group: "O+",
      phone: "9000000001"
    }
  });

  await prisma.donor.create({ data: { donor_id: donorPerson.person_id, consent: true } });
  const organ = await prisma.organ.create({
    data: {
      donor_id: donorPerson.person_id,
      organ_type: "Kidney",
      availability_status: "available",
      expiry_time: new Date(Date.now() + 24 * 60 * 60 * 1000)
    }
  });

  const recipientPerson = await prisma.person.create({
    data: {
      name: "Ananya",
      age: 21,
      gender: "Female",
      blood_group: "A+",
      phone: "9000000020"
    }
  });

  await prisma.recipient.create({
    data: {
      recipient_id: recipientPerson.person_id,
      organ_needed: "Kidney",
      urgency_level: 4,
      waiting_time: 2
    }
  });

  await prisma.waitingList.create({
    data: {
      recipient_id: recipientPerson.person_id,
      priority_score: 6,
      rank_position: 1
    }
  });

  await prisma.auditLog.create({
    data: { action: "Insert", details: `Seeded initial data with organ ${organ.organ_id}` }
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
