import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserGroup } from './entities/group.entity';
import { Task } from './entities/task.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AssignTaskDto } from './dto/create-task.dto';



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

    async assignTask(assignTaskDto: AssignTaskDto, assignedByUserId: number): Promise<Task> {
        const { title, description, assignedToUserId } = assignTaskDto;
    
        const assignedByUser = await this.usersRepository.findOne({ where: { id: assignedByUserId }, relations: ['userGroup'] });
        const assignedToUser = await this.usersRepository.findOne({ where: { id: assignedToUserId } });
        
        if (!assignedByUser) {
            throw new NotFoundException('Assigning user not found');
        }
    
        if (!assignedToUser) {
            throw new NotFoundException('User to be assigned not found');
        }
    
        // Check if the assigning user is an admin
        if (assignedByUser.userGroup.name !== 'admin') {
            throw new ForbiddenException('Only admins can assign tasks');
        }
    
        const task = new Task();
        task.title = title;
        task.description = description;
        task.status = 'pending'; // Default status
        task.assignedBy = assignedByUser;
        task.assignedTo = assignedToUser;
    
        return this.taskRepository.save(task);
    }

    async findOneById(id: number): Promise<User> {
        return await this.usersRepository.findOne({ where: { id } });
    }
}
