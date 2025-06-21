import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as bodyParser from 'body-parser';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';


dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.use('/payment/webhook', (req, res, next) => {
    if (req.headers['content-type'] === 'application/json') {
      let data = '';
      req.on('data', chunk => {
        data += chunk;
      });
      req.on('end', () => {
        req.rawBody = Buffer.from(data);
        req.body = data;
        next();
      });
    } else {
      next();
    }
  });

  
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'payment', 
      protoPath: join(__dirname, '../src/payment/pay.proto'),
      url: '0.0.0.0:5059', 
      loader: {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true,
      },
    },
  });

  await app.startAllMicroservices();
 
}
bootstrap();
