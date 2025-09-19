import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

function randomDate(start: Date, end: Date) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

function randomAmount(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomPaid() {
  return Math.random() < 0.5;
}

async function main() {
  console.log('Seeding database...');

  const passwordAlice = await bcrypt.hash('password123', 10);
  const passwordBob = await bcrypt.hash('password456', 10);

  const alice = await prisma.user.upsert({
    where: { email: 'alice@example.com' },
    update: {},
    create: {
      email: 'alice@example.com',
      name: 'Alice',
      hashedPassword: passwordAlice,
    },
  });

  const bob = await prisma.user.upsert({
    where: { email: 'bob@example.com' },
    update: {},
    create: {
      email: 'bob@example.com',
      name: 'Bob',
      hashedPassword: passwordBob,
    },
  });

  const invoiceData = (userId: number) =>
    Array.from({ length: 15 }, (_, i) => ({
      vendor_name: `Vendor ${i + 1}`,
      amount: randomAmount(50, 1000),
      due_date: randomDate(new Date('2025-01-01'), new Date('2025-12-31')),
      description: `Invoice ${i + 1} description`,
      paid: randomPaid(),
      user_id: userId,
    }));

  await prisma.invoice.createMany({ data: invoiceData(alice.id) });
  await prisma.invoice.createMany({ data: invoiceData(bob.id) });

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
