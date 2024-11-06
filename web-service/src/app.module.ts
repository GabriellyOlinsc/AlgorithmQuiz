import { Module } from '@nestjs/common';
import { UsersModule } from './module/users/users.module';
import { AuthModule } from './module/auth/auth.module';
import { QuizzesModule } from './module/quizzes/quizzes.module';
import { QuestionsModule } from './module/questions/questions.module';
import { ReportsModule } from './module/reports/reports.module';
import { PrismaService } from './module/database/prisma.service';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    QuizzesModule,
    QuestionsModule,
    ReportsModule
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
