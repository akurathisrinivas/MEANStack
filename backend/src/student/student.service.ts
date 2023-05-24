import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity';
import { File } from './student.interface'

@Injectable()
export class StudentService {

  constructor(@InjectModel('Student') private studentModel: Model<Student>) { }

  create(createStudentDto: CreateStudentDto) {
     try {
      const createdStudent = new this.studentModel(createStudentDto);
      const result = createdStudent.save();
      return result;
     }
     catch (e) {
       throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
     }
  }
 
  async uploadFile(id: string, files: File[], path: string) {
    for await (var file of files) {
      if (path == "image") {
        await this.studentModel.updateOne({ _id: id }, { [path]: file.filename })
      }
    }
    return;
  }

  findAll() {
    
      try {
        return this.studentModel.find().sort({studentName:'ASC'})
      }
      catch (e) {
        throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
      }
    
  }

  findOne(id: string) {
    try {
      return this.studentModel.findOne({ _id: id })
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async updateStudent(id: string, updateStudentDto: UpdateStudentDto) {
    try {
      let student = await this.studentModel.findOne({ _id: id })
      //console.log('student',student);
      //console.log('updateStudentDto',updateStudentDto);
      
      if (student.status === updateStudentDto.status) {
        var result= this.studentModel.updateOne({ _id: id }, {
          studentName: updateStudentDto.studentName,
          studentEmail: updateStudentDto.studentEmail,
          studentMobile: updateStudentDto.studentMobile,
          mbbsBatch: updateStudentDto.mbbsBatch,
          roomNo: updateStudentDto.roomNo,
          cabinNo: updateStudentDto.cabinNo,
          updatedBy: updateStudentDto.updatedBy,
          updatedAt: new Date()
        });
        return result;
      }
      else {
        return this.studentModel.updateOne({ _id: id }, {
          updatedAt: new Date(),
          status: updateStudentDto.status
        });
      }
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  remove(id: string) {
    try {
      return this.studentModel.findOneAndDelete({ _id: id }).exec();
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
