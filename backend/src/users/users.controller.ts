import { Controller, Get, Post, Body, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AssignTaskDto } from './dto/create-task.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller()
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    // AUTHENTICATION ENDPOINTS
    @Post('register')
    async register(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Post('login')
    async login(@Body() loginDto: LoginUserDto) {
        return this.usersService.login(loginDto);
    }

    // USER ENDPOINTS
    @UseGuards(JwtAuthGuard)
    @Get('user')
    async user(@Req() req) {
        return req.user.username;
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    async profile(@Req() req) {
        return this.usersService.findOneById(req.user.userId);
    }


    // TASKS ENDPOINTS
    @UseGuards(JwtAuthGuard)
    @Get('tasks')
    async getTasks(@Req() req) {
        return this.usersService.getTasks(req.user.userId);
    }

    @UseGuards(JwtAuthGuard)
    @Post('tasks/assign')
    async assignTask(@Body() assignTaskDto: AssignTaskDto, @Req() req) {
        return this.usersService.assignTask(assignTaskDto, req.user.userId);
    }
}
