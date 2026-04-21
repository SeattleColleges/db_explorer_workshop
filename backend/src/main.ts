import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: (origin, callback) => {
      // Allow requests from:
      // - localhost:3000+ (development)
      // - 10.0.2.2:* (Android emulator)
      // - 127.0.0.1:* (iOS simulator)
      // - Process env CORS_ORIGIN override
      const allowedOrigins = [
        /^http:\/\/localhost:\d+$/,
        /^http:\/\/127\.0\.0\.1:\d+$/,
        /^http:\/\/10\.0\.2\.2:\d+$/,
      ];

      const envOrigin = process.env.CORS_ORIGIN;
      if (envOrigin) {
        allowedOrigins.push(new RegExp(`^${envOrigin.replace(/\./g, "\\.")}$`));
      }

      if (!origin || allowedOrigins.some((pattern) => pattern.test(origin))) {
        callback(null, true);
      } else {
        callback(new Error("CORS policy violation"));
      }
    },
  });

  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(
    `🗄️  Supabase Workshop backend running on http://localhost:${port}`,
  );
}

bootstrap();
