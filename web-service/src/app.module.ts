import { Module } from '@nestjs/common';
import { UsersModule } from './module/users/users.module';
import { AuthModule } from './module/auth/auth.module';
import { QuizzesModule } from './module/quizzes/quizzes.module';
import { QuestionsModule } from './module/questions/questions.module';
import { ReportsModule } from './module/reports/reports.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    QuizzesModule,
    QuestionsModule,
    ReportsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
