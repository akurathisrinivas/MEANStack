import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RoleEnum } from 'src/common/role';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { File } from './user.interface'

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>) { }

  async uploadFile(id: string, files: File[], path: string) {
    for await (var file of files) {
      if (path == "image") {
        await this.userModel.updateOne({ _id: id }, { [path]: file.filename })
      }
    }
    return;
  }

  async validateUserById(id: number) {
    const user = await this.userModel.findOne({ _id: id })
    if (!user) {
      throw new NotFoundException();
    }
    else {
      return user;
    }
  }

  createUser(createUserDto: CreateUserDto) {
    try {
      const createdUser = new this.userModel(createUserDto);
      const result = createdUser.save();
      return result;
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  getAllUsers() {
    try {
      return this.userModel.find({ role: RoleEnum.USER })
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  getUserById(id: string) {
    try {
      return this.userModel.findOne({ _id: id })
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    try {
      let user = await this.userModel.findOne({ _id: id })
      if (user.status === updateUserDto.status) {
        return this.userModel.updateOne({ _id: id }, {
          name: updateUserDto.name,
          mobile: updateUserDto.mobile,
          email: updateUserDto.email,
          examPreparing: updateUserDto.examPreparing,
          college: updateUserDto.college,
          state: updateUserDto.state,
          dob: updateUserDto.dob,
          updatedAt: new Date()
        });
      }
      else {
        return this.userModel.updateOne({ _id: id }, {
          updatedAt: new Date(),
          status: updateUserDto.status
        });
      }
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  removeUser(id: string) {
    try {
      return this.userModel.findOneAndDelete({ _id: id }).exec();
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
