import { Controller, Get, Post,Request, Body, Patch, Param, Delete, Put, UseInterceptors, UploadedFiles, UseGuards } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { diskStorage } from 'multer';
import path = require('path');
import { v4 as uuidv4 } from 'uuid';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiConsumes, ApiParam } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Observable, of } from 'rxjs';

export const storage = {
  storage: diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
      const filename: string = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
      const extension: string = path.parse(file.originalname).ext;
      cb(null, `${filename}${extension}`)
    }
  })
}

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

 
  
  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }

  @Put('/image/:id')
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        image: {
          type: "string",
          format: "binary"
        }
      }
    }
  })
  @ApiParam({ name: "id", required: true, type: "string" })
  @UseInterceptors(FilesInterceptor('image', 20, storage))
  async uploadImage(@UploadedFiles() file, @Request() req, @Param("id") id): Promise<Observable<File>> {
    await this.studentService.uploadFile(id, file, 'image')
    return of(file);
  }

  @Get()
  findAll() {
    return this.studentService.findAll();
  }

  @Get(':id')
  getStudentById(@Param('id') id: string) {
    return this.studentService.findOne(id);
  }

 

  @Patch(':id')
  updateStudent(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentService.updateStudent(id, updateStudentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentService.remove(id);
  }
}


