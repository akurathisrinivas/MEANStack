import { Controller, Get, Post,Request, Body, Patch, Param, Delete, Put, UseInterceptors, UploadedFiles, UseGuards } from '@nestjs/common';
import { CreateOrganisationsDto } from './dto/create-organisations.dto';
import { UpdateOrganisationsDto } from './dto/update-organisations.dto';
import { OrganisationsService } from './organisations.service'

@Controller('organisations')
export class OrganisationsController {
  constructor(private readonly organisationsService: OrganisationsService) {}

  @Post()
  create(@Body() createOrganisationsDto: CreateOrganisationsDto) {
    //console.log('createOrganisationsDto',createOrganisationsDto);
    
    return this.organisationsService.create(createOrganisationsDto);
  }

  @Patch(':id')
  updateOrganisations(@Param('id') id: string, @Body() updateOrganisationsDto: UpdateOrganisationsDto) {
    return this.organisationsService.updateOrganisations(id, updateOrganisationsDto);
  }

  @Get()
  findAll() {
    return this.organisationsService.findAll();
  }

  @Get(':id')
  getStudentById(@Param('id') id: string) {
    return this.organisationsService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.organisationsService.remove(id);
  }

  @Get('getOrganisationsByState/:id')
  getOrganisationsByState(@Param('id') id: string){
    return this.organisationsService.getOrganisationsByState(id);
  }

}

