import { Injectable } from '@nestjs/common';
import { AuthDataDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
    validateUser(authDataDto: AuthDataDto) {
        // const findUser = (CHECK IF USER EXISTS IN DB)
    }
}
