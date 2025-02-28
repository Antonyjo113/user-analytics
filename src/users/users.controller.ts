import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

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

    // @Get(':id')
    // getUserById(@Param('id') id: number) {
    //     return this.usersService.getUserById(+id); // +id converts the string to number
    // }

}
