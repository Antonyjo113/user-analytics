import * as argon2 from 'argon2'; 
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from './user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const { email, password, firstName, lastName, role, status, accountBlocked } = createUserDto;
        
        const hashedPassword = await argon2.hash(password);
        console.log('Hashed Password:', hashedPassword);
        
        const user = await this.prisma.user.create({
          data: {
            email,
            password: hashedPassword,
            firstName,
            lastName,
            role,
            status,
            accountBlocked: accountBlocked ?? false,  
          },
        });
    
        return user;
      }
    
    async getUsers(): Promise<User[]> {
        return this.prisma.user.findMany();
    }
    
    // async getUserById(id: number): Promise<User | null> {
    //     return this.prisma.user.findUnique({
    //       where: {
    //         id: id, 
    //       },
    //     });
    // }
    
    async loginUser(loginUserDto: LoginUserDto): Promise<{ message: string; status: boolean; user?: User }> {
        const { email, password } = loginUserDto;
      
        const user = await this.prisma.user.findUnique({
          where: { email },
        });
      
        if (user) {
          try {

            // Ensure the stored password is a valid Argon2 hash
            console.log('Stored password hash:', user.password);
      
            // Verify the password using Argon2
            const isPasswordValid = await argon2.verify(user.password, password);
      
            if (isPasswordValid) {
              console.log('Password is correct');
              return {
                message: 'Login successful!',
                status: true,
                user,
              };
            } else {
              console.log('Invalid password');
              return {
                message: 'Invalid credentials!',
                status: false,
              };
            }
          } catch (error) {
            console.error('Error verifying password:', error);
            return {
              message: 'Error during login attempt!',
              status: false,
            };
          }
        } else {
          console.log('User not found');
          return {
            message: 'User not found!',
            status: false,
          };
        }
      }


}
