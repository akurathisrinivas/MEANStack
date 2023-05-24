import { Module } from '@nestjs/common';
import { StateService } from './state.service';
import { StateController } from './state.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { StateSchema } from './entities/state.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'State',
        schema: StateSchema,
      },
    ]),
  ],
  controllers: [StateController],
  providers: [StateService]
})
export class StateModule {}
