import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.interface';
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('/login')  // Route for handling POST /users/login
    async loginUser(@Body() body: { email: string; password: string }) {
        console.log('Received login request with body:', body);
        try {
            const result = await this.usersService.loginUser(body);
            console.log('Login result:', result);
            return result;
        } catch (error) {
            console.error('Error during login attempt:', error);
            throw error;
        }
    }

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto) {
        return this.usersService.createUser(createUserDto);  // Pass the full DTO to the service
    }


    @Get()
    getAllUsers() {
        return this.usersService.getUsers();
    }

    @Get(':id')
    getUserById(@Param('id') id: number) {
        return this.usersService.getUserById(+id); // +id converts the string to number
    }

    @Put(':id')
    async updateUser(
        @Param('id') id: string, // Get 'id' from query parameters (e.g., /users?id=7)
        @Body() updateUserDto: UpdateUserDto, // Get user data from the request body
    ) {
        const userId = parseInt(id)
        return this.usersService.updateUser(userId, updateUserDto); // Call the service to update the user
    }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<void> {
    try {
      const userId = parseInt(id);
      await this.usersService.deleteUser(userId);
    } catch (error) {
      throw new Error(`Error deleting user: ${error.message}`);
    }
  }

}
