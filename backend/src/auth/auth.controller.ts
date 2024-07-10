import { Body, Controller, Post, Get } from '@nestjs/common';
import { AuthDataDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
    @Post('login')
    login(@Body() AuthData: AuthDataDto) {

    }
}
