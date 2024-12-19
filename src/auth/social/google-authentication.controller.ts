import { Body, Controller, Post } from '@nestjs/common';
import { GoogleTokenDto } from './dtos/google-token.dto';
import { GoogleAuthenticationService } from './providers/google-authentication.service';
import { Auth } from '../decorators/auth.decorator';
import { AuthType } from '../enums/auth-types.enum';
@Auth(AuthType.None)
@Controller('auth/google-authentication')
export class GoogleAuthenticationController {
    constructor(
        /**
         * Inject googleAuthenticationService
         */
        private readonly googleAuthenticationService: GoogleAuthenticationService
    ) {}

    @Post()
    public async authenticate(@Body() googleTokenDto: GoogleTokenDto) {
        return this.googleAuthenticationService.authenticate(googleTokenDto);
    }
}
