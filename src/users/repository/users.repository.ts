import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UsersRpository {
    constructor(private readonly Prisma: PrismaService){
    }

    async create(createUserDto: CreateUserDto) {
        return await this.Prisma.users.create({
          data:{
            name:createUserDto.name,
            email:createUserDto.email
          }
       });
    }
    
    async findAll() {
        return await this.Prisma.users.findMany({
          orderBy:{
            createdAt: 'asc'
          }
        })
    }
    
    async findOne(id: number) {
        return await this.Prisma.users.findFirst({
          where: {id: id}
        })
    }
    
    async update(id: number, updateUserDto: UpdateUserDto) {
        return await this.Prisma.users.update({
          where: {
            id:id
          },
          data:{
            name:updateUserDto.name,
            email:updateUserDto.email
          }
        })
    }
    
    async delete(id: number) {
        return await this.Prisma.users.delete({
          where:{
            id:id
          }
        })
    }
  
}
