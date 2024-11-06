import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
const prisma = new PrismaClient();

async function main() {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash('123456', salt);

  await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      name: 'Admin',
      email: 'admin@example.com',
      password: hash, 
      role: 'TEACHER', 
      enrollCode: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  console.log('Admin user created');
}

main()
  .then(() => {
    console.log('Seeding completed');
    return prisma.$disconnect();
  })
  .catch((e) => {
    console.error('Error seeding data:', e);
    return prisma.$disconnect();
  });
