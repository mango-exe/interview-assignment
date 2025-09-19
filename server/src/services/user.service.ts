import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/db/repositories/user.repository';
import {
  CreateUserDTO,
  UserResponseDTO,
  UserSchemaDTO
} from 'src/dtos/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(user: CreateUserDTO): Promise<UserResponseDTO> {
    const hashedPassword: string = await bcrypt.hash(user.password, 10);

    const result = await this.userRepository.create({
      name: user.name,
      email: user.email,
      hashedPassword,
    });

    const createdUser: UserResponseDTO = {
      id: result.id,
      name: result.name,
      email: result.email,
    };

    return createdUser;
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserResponseDTO | null> {
    const user = await this.userRepository.findByEmail(email);
    if (user) {
      const isValidPassword: boolean = await bcrypt.compare(
        password,
        user.hashedPassword,
      );
      return isValidPassword ? user : null;
    }
    return null;
  }

  async getAllUsers(): Promise<UserSchemaDTO[]> {
    return await this.userRepository.findAll();
  }
}
