import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { StudentModule } from './student/student.module';
import { StateModule } from './state/state.module';
import { OrganisationsModule } from './organisations/organisations.module';

@Module({
  imports: [

    ServeStaticModule.forRoot({
      serveRoot:'/',
      rootPath: join(__dirname, '..', 'public'),
    }),
     MongooseModule.forRoot('mongodb+srv://admin:admin@dbmci.wnyrn.mongodb.net/test'),
   // MongooseModule.forRoot('mongodb+srv://admin:admin@cluster0.ltjhg.mongodb.net/PlatoLiveExams?retryWrites=true&w=majority'),
    ServeStaticModule.forRoot({
      serveRoot:'/upload',
      rootPath: join(__dirname, '..', 'uploads'),
    }),

    AuthModule,
    MongooseModule,
    StudentModule,
    StateModule,
    OrganisationsModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
