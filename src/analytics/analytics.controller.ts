import { Controller, Get } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  // 1. Get user count (total, new, active users)
  @Get('users/count')
  async getUserCount() {
    return this.analyticsService.getUserCount();
  }

  // 2. Get user sign-up trends
  @Get('users/trends')
  async getSignUpTrends() {
    return this.analyticsService.getSignUpTrends();
  }

  // 3. Get user activity and engagement
  @Get('users/activity')
  async getUserActivity() {
    return this.analyticsService.getUserActivity();
  }
}
