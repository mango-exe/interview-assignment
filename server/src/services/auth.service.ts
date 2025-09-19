
import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/db/repositories/user.repository';
import { LoginUserDTO, UserResponseDTO, UserSchemaDTO } from 'src/dtos/user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

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

      const userResponse: UserResponseDTO = {
        id: user.id,
        email: user.email,
        name: user.name,
      };

      return isValidPassword ? userResponse : null;
    }
    return null;
  }

  login(user: UserResponseDTO): { access_token: string } {
    const payload = { email: user.email, userId: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
