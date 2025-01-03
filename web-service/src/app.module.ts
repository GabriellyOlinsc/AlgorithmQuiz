import { Module } from '@nestjs/common';
import { UsersModule } from './module/users/users.module';
import { AuthModule } from './module/auth/auth.module';
import { QuizzesModule } from './module/quizzes/quizzes.module';
import { QuestionsModule } from './module/questions/questions.module';
import { PrismaService } from './module/database/prisma.service';
import { AuthGuard } from './core/guards/auth.guard';
import { RolesGuard } from './core/guards/role.guard';
import { APP_GUARD } from '@nestjs/core';
import { PhasesModule } from './module/phases/phases.module';
import { PerformanceModule } from './module/performance/performance.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    QuestionsModule,
    PhasesModule,
    QuizzesModule,
    PerformanceModule
  ],
  providers: [
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
