import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Budget Tracker API')
    .setDescription('Complete Financial Management System - Track expenses, budgets, goals, and group finances')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .addTag('auth', 'Authentication endpoints')
    .addTag('users', 'User management')
    .addTag('accounts', 'Financial accounts')
    .addTag('transactions', 'Income and expense tracking')
    .addTag('budgets', 'Budget management')
    .addTag('goals', 'Financial goals')
    .addTag('reports', 'Analytics and reporting')
    .addTag('notifications', 'Alerts and reminders')
    .addTag('groups', 'Shared expense management')
    .build();

  // Create document with explicit options
  const document = SwaggerModule.createDocument(app, config, {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
    ignoreGlobalPrefix: false,
    deepScanRoutes: true,
  });

  // Setup Swagger with custom options
  SwaggerModule.setup('/api/docs', app, document, {
    customSiteTitle: 'Budget Tracker API',
    customCss: `
      .swagger-ui .topbar { display: none }
      .swagger-ui .information-container { background: #f5f5f5; padding: 20px; }
      .swagger-ui .try-out { display: block !important; }
    `,
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js',
    ],
    swaggerOptions: {
      persistAuthorization: true,
      displayRequestDuration: true,
      filter: true,
      showExtensions: true,
      showCommonExtensions: true,
      tryItOutEnabled: true,
    },
  });

  await app.listen(3000);
  console.log('🚀 Application is running on: http://localhost:3000');
  console.log('📚 Swagger documentation at: http://localhost:3000/api');
  console.log('💡 Click "Try it out" on any endpoint to test!');
}
bootstrap();
