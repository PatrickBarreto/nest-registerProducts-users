import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UsersRpository {
    constructor(private readonly Prisma: PrismaService){
    }

    create(createUserDto: CreateUserDto) {
        return this.Prisma.users.create({
          data:{
            name:createUserDto.name,
            email:createUserDto.email
          }
       });
    }
    
    findAll() {
        return this.Prisma.users.findMany({
          orderBy:{
            createdAt: 'asc'
          }
        })
    }
    
    findOne(id: number) {
        return this.Prisma.users.findFirst({
          where: {id: id}
        })
    }
    
    update(id: number, updateUserDto: UpdateUserDto) {
        return this.Prisma.users.update({
          where: {
            id:id
          },
          data:{
            name:updateUserDto.name,
            email:updateUserDto.email
          }
        })
    }
    
    delete(id: number) {
        return this.Prisma.users.delete({
          where:{
            id:id
          }
        })
    }
  
}
