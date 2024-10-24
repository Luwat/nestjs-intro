import {
  Controller,
  Get,
  Post,
  Patch,
  Put,
  Param,
  Delete,
  Query,
  Body,
  Headers,
  Ip,
  ParseIntPipe,
  DefaultValuePipe,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { GetUsersParamDto } from './dtos/get-users-param.dto';
import { PatchUserDto } from './dtos/patch-user.dto';

@Controller('users')
export class UsersController {
  @Get('/:id?')
  public getUsers(
    @Param() getUsersParamDto: GetUsersParamDto,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe,) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe,) page: number,
  ) {
    console.log(getUsersParamDto);
    return 'You sent a get request to users endpoint.';
  }

  @Post()
  public createUser(
    @Body() createUserDto: CreateUserDto,
  ) {
    console.log(createUserDto);
    return 'You sent a post request to users endpoint.';
  }

  @Patch()
  public patchUser(@Body() patchUserDto: PatchUserDto) {
    return patchUserDto
  }
}
