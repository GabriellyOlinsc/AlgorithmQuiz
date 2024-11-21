import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import * as fs from 'fs';

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

  const questionsData = JSON.parse(fs.readFileSync('./prisma/questions.json', 'utf-8'));


  for (const question of questionsData) {
    const createdQuestion = await prisma.question.create({
      data: {
        statement: question.statement,
        level: question.level,
      },
    });

    for (const alternative of question.alternatives) {
      await prisma.alternative.create({
        data: {
          statement: alternative.statement,
          correct: alternative.correct,
          questionId: createdQuestion.id,
        },
      });
    }

    console.log('Questions and alternatives seeded');
  }
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
