import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserService } from 'src/services/user.service';
import type { CreateUserDTO, UserResponseDTO } from 'src/dtos/user.dto';
import type { ResponseDTO } from 'src/dtos/response.dto';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from 'src/services/auth.service';

@Controller()
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  login(@Request() req: { user: UserResponseDTO }): ResponseDTO {
    const access_token = this.authService.login(req.user);
    const response: ResponseDTO = {
      timestamp: new Date().toISOString(),
      data: access_token,
      message: '',
    };
    return response;
  }

  @Post('/auth/register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() userData: CreateUserDTO): Promise<ResponseDTO> {
    const createdUser = await this.userService.createUser(userData);
    const response: ResponseDTO = {
      data: createdUser,
      message: '',
      timestamp: new Date().toISOString(),
    };
    return response;
  }
}
