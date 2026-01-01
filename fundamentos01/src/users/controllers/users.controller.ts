import { Controller, Get, Post, Body, Patch, Param, Delete, Put, ParseIntPipe } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UpdateUserDTO } from '../dtos/update-user.dto';
import { PartialUpdateUserDto } from '../dtos/partial-update-user.dto';
import { CreateUserDTO } from '../dtos/create-user.dto';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDTO) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDTO) {
    return this.usersService.update(id, updateUserDto);
  }

  @Patch(':id')
  partialUpdate(@Param('id', ParseIntPipe) id: number, @Body() partialUpdateUserDto: PartialUpdateUserDto) {
    return this.usersService.partialUpdate(id, partialUpdateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.delete(id);
  }
}