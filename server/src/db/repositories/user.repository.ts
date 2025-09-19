import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UserSchemaDTO, NewUserDTO } from '../../dtos/user.dto';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  create(data: NewUserDTO): Promise<UserSchemaDTO> {
    return this.prisma.user.create({ data });
  }

  findById(id: number): Promise<UserSchemaDTO | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  findByEmail(email: string): Promise<UserSchemaDTO | null> {
    return this.prisma.user.findFirst({ where: { email } });
  }


  findAll(): Promise<UserSchemaDTO[]> {
    return this.prisma.user.findMany();
  }
}
