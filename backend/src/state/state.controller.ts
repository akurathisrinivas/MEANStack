import { Controller, Get, Post,Request, Body, Patch, Param, Delete, Put, UseInterceptors, UploadedFiles, UseGuards } from '@nestjs/common';
import { StateService } from './state.service';
import { CreateStateDto } from './dto/create-state.dto';
import { UpdateStateDto } from './dto/update-state.dto';
import { diskStorage } from 'multer';
import path = require('path');
import { v4 as uuidv4 } from 'uuid';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiConsumes, ApiParam } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Observable, of } from 'rxjs';




@Controller('states')
export class StateController {
  constructor(private readonly stateService: StateService) {}

  @Post()
  create(@Body() createStateDto: CreateStateDto) {
    console.log('createStateDto',createStateDto);
    
    return this.stateService.create(createStateDto);
  }

  @Get()
  findAll() {
    return this.stateService.findAll();
  }

  @Get(':id')
  getStateById(@Param('id') id: string) {
    return this.stateService.findOne(id);
  }
  
  @Patch(':id')
  updateState(@Param('id') id: string, @Body() updateStateDto: UpdateStateDto) {
    return this.stateService.updateState(id, updateStateDto);
  }
 
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stateService.remove(id);
  }
   
}
