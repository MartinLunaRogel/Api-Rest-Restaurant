import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { MeserosModule } from './meseros/meseros.module';
import { MesasModule } from './mesas/mesas.module';
import { AlimentosModule } from './alimentos/alimentos.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.host,
      port: +process.env.port,
      username: 'postgres',
      password: process.env.pass,
      database: process.env.name,
      entities: [],
      autoLoadEntities: true,
      synchronize: true,
    }),
    MeserosModule,
    MesasModule,
    AlimentosModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
