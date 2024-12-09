import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './providers/auth.service';
import { SignInDto } from './dtos/sign-in.dto';
import { Auth } from './decorators/auth.decorator';
import { AuthType } from './enums/auth-types.enum';

@Controller('auth')
export class AuthController {
    constructor(
        // Injecting auth service
        private readonly authService: AuthService
    ) {}

    @Post('sign-in')
    @HttpCode(HttpStatus.OK)
    @Auth(AuthType.None)
    public async signIn(@Body() signInDto: SignInDto) {
        console.log(signInDto)
        return this.authService.signIn(signInDto);
    }
}
