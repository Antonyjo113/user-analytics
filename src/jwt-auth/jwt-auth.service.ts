import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthService {
    constructor(private jwtService: JwtService) {}

  generateToken(payload: any): string {
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '1h',
    });
  }

  // Verifying the JWT token
  verifyToken(token: string): any {
    return this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET,
    });
  }
}
