import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserGroup } from './entities/group.entity';
import { Task } from './entities/task.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';



@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        @InjectRepository(UserGroup)
        private userGroupRepository: Repository<UserGroup>,
        @InjectRepository(Task)
        private taskRepository: Repository<Task>,
        private jwtService: JwtService,
    ) {}

    async create(singupDto: CreateUserDto): Promise<{ user: User, token: string }> {
        const { username, email, password, userGroupId } = singupDto;
        const saltOrRounds = 10;
        // Hash password before storing it in the database
        const hashedPassword = await bcrypt.hash(password, saltOrRounds);

        // Find user group by id
        const userGroup = await this.userGroupRepository.findOne({ where: { id: userGroupId } });
        if (!userGroup) {
            throw new UnauthorizedException('User group not found');
        }
        
        const user = new User();
        user.username = username;
        user.email = email;
        user.password = hashedPassword;
        user.userGroup = userGroup;

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
}
