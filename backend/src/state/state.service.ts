import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateStateDto } from './dto/create-state.dto';
import { UpdateStateDto } from './dto/update-state.dto';
import { State } from './entities/state.entity';


@Injectable()
export class StateService {

  constructor(@InjectModel('State') private stateModel: Model<State>) { }

  create(createStateDto: CreateStateDto) {
    try {
     const createdState = new this.stateModel(createStateDto);
     const result = createdState.save();
     return result;
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
 }
 
 findAll() {
    
  try {
    return this.stateModel.find().sort({stateName:'ASC'})
  }
  catch (e) {
    throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
  }

}

findOne(id: string) {
  try {
    return this.stateModel.findOne({ _id: id })
  }
  catch (e) {
    throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
  }
}

async updateState(id: string, updateStateDto: UpdateStateDto) {
  try {
    let state = await this.stateModel.findOne({ _id: id })
    //console.log('state',state);
    //console.log('updateStudentDto',updateStudentDto);
    
    if (state.status === updateStateDto.status) {
      //console.log(updateStateDto);
      
      var result= this.stateModel.updateOne({ _id: id }, {
        stateName: updateStateDto.stateName,
        updatedBy: updateStateDto.updatedBy,
        updatedAt: new Date()
      });
      return result;
    }
    else {
      return this.stateModel.updateOne({ _id: id }, {
        updatedAt: new Date(),
        status: updateStateDto.status
      });
    }
  }
  catch (e) {
    throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
  }
}

remove(id: string) {
  try {
    return this.stateModel.findOneAndDelete({ _id: id }).exec();
  }
  catch (e) {
    throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
  }
}

}