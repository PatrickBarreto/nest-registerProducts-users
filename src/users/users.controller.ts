import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(201)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @HttpCode(200)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @HttpCode(200)
  @Get(':id')
  findOne(@Param('id', new ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @HttpCode(200)
  @Patch(':id')
  update(@Param('id', new ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id', new ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
