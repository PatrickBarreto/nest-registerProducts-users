import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, ParseIntPipe } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(201)
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @HttpCode(200)
  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @HttpCode(200)
  @Get(':id')
  async findOne(@Param('id', new ParseIntPipe) id: number) {
    return await this.usersService.findOne(id);
  }

  @HttpCode(200)
  @Patch(':id')
  async update(@Param('id', new ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(id, updateUserDto);
  }

  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('id', new ParseIntPipe) id: number) {
    return await this.usersService.remove(id);
  }
}
