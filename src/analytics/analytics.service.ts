import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AnalyticsService {
  constructor(private readonly prisma: PrismaService) {}

  // 1. Get total users count, new user count, and active user count
  async getUserCount(): Promise<any> {
    const totalUsers = await this.prisma.user.count();
    
    // Get new users within the last 30 days
    const newUsers = await this.prisma.user.count({
      where: {
        createdAt: {
          gte: new Date(new Date().setMonth(new Date().getMonth() - 1)), // Last 30 days
        },
      },
    });

    // Get active users (users who logged in within the last 30 days)
    const activeUsers = await this.prisma.analytics.count({
      where: {
        lastLoginDate: {
          gte: new Date(new Date().setDate(new Date().getDate() - 30)), // Last 30 days
        },
      },
    });

    return {
      totalUsers,
      newUsers,
      activeUsers,
    };
  }

  // 2. Get user sign-up trends
  async getSignUpTrends(): Promise<any> {
    const trends = await this.prisma.analytics.groupBy({
      by: ['signUpDate'],
      _count: {
        signUpDate: true,
      },
      orderBy: {
        signUpDate: 'asc',
      },
    });

    return trends;
  }

  // 3. Get user login activity and engagement score
  async getUserActivity(): Promise<any> {
    const activity = await this.prisma.analytics.findMany({
      where: {
        lastLoginDate: {
          gte: new Date(new Date().setDate(new Date().getDate() - 30)), // Last 30 days
        },
      },
      select: {
        userId: true,
        lastLoginDate: true,
        loginCount: true,
        engagementScore: true,
      },
    });

    return activity;
  }
}
