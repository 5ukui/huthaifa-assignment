import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WinstonLogger } from './winston.logger';
import { AllExceptionsFilter } from './http-exception.filter';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: WinstonLogger,
    });

    app.useGlobalPipes(new ValidationPipe());

    // Log all errors into a single file
    app.useGlobalFilters(new AllExceptionsFilter(WinstonLogger));
    
    // Frontend config
    const configService = app.get(ConfigService);
    app.enableCors({
        origin: configService.get('FRONTEND_URL'),
    });
    
    await app.listen(5000);
}

bootstrap();
