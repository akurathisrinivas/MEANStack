import { Module } from '@nestjs/common';
import { OrganisationsService } from './organisations.service';
import { OrganisationsController } from './organisations.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OrganisationsSchema } from './entities/organisations.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Organisations',
        schema: OrganisationsSchema,
      },
    ]),
  ],
  controllers: [OrganisationsController],
  providers: [OrganisationsService]
})
export class OrganisationsModule {}
