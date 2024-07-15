import { registerAs } from "@nestjs/config";

export default registerAs('config', () => {
    return {
        TYPE: process.env.TYPE,
        HOST: process.env.PHOST,
        PORT: process.env.PORT,
        USERNAME: process.env.USERNAME,
        PASSWORD: process.env.PASSWORD,
        DATABASE: process.env.DATABASE
    }
})