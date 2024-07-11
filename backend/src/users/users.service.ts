import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';



@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private jwtService: JwtService,
    ) {}

    // Hash password before storing it in the database
    async create(singupDto: CreateUserDto): Promise<{ user: User, token: string }> {
        const saltOrRounds = 10;
        const hashedPassword = await bcrypt.hash(singupDto.password, saltOrRounds);
        const user = new User();
        user.username = singupDto.username;
        user.email = singupDto.email;
        user.password = hashedPassword;

        const savedUser = await this.usersRepository.save(user);
        const token = this.jwtService.sign({ username: savedUser.username, sub: savedUser.id });

        return { user: savedUser, token };
    }

    async login(loginDto: LoginUserDto): Promise<{ token: string }> {
        const { email, password } = loginDto
        const user = await this.usersRepository.findOne({ where: { email } })
        if (!user) {
            throw new UnauthorizedException('Invalid email of password');
        }
        
        if (await bcrypt.compare(password, user.password)) {
            const { password, ...result } = user;
            const token = this.jwtService.sign({ username: user.username, sub: user.id })
            
            return { token };
        }
        throw new UnauthorizedException('Invalid email of password');
    }

    findAll() {
        return `This action returns all users`;
    }

    findOne(id: number) {
        return `This action returns a #${id} user`;
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        return `This action updates a #${id} user`;
    }

    remove(id: number) {
        return `This action removes a #${id} user`;
    }
}
