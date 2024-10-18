import { Controller, Get, Post, Patch, Put, Param, Delete, Query, Body, Headers, Ip } from "@nestjs/common";

@Controller('users')

export class UsersController {
    @Get('/:id')
    public getUsers(@Param('id') id: any, @Query('limit') limit: any) {
        console.log(id)
        console.log(limit)
        return "You sent a get request to users endpoint."
    }

    @Post()
    public createUser(@Body() request: any, @Headers() headers: any, @Ip() ip: any) {
        console.log(request)
        console.log(headers)
        console.log(ip)
        return "You sent a post request to users endpoint."
    }
}