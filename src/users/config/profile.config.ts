import { registerAs } from "@nestjs/config";

export default registerAs("profileConfig", () => ({
    ApiKey: process.env.PROFILE_API_KEY
}))