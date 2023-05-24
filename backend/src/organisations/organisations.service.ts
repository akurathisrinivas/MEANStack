import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOrganisationsDto } from './dto/create-organisations.dto';
import { UpdateOrganisationsDto } from './dto/update-organisations.dto';
import { Organisations } from './entities/organisations.entity';


@Injectable()
export class OrganisationsService {

  constructor(@InjectModel('Organisations') private organisationsModel: Model<Organisations>) { }

    create(createOrganisationsDto: CreateOrganisationsDto) {
        try {
        const createdOrganisations = new this.organisationsModel(createOrganisationsDto);
        const result = createdOrganisations.save();
        return result;
        }
        catch (e) {
        throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async updateOrganisations(id: string, updateOrganisationsDto: UpdateOrganisationsDto) {
      try {
        let organisation = await this.organisationsModel.findOne({ _id: id })
        //console.log('state',state);
        //console.log('updateStudentDto',updateStudentDto);
        
        if (organisation.status === updateOrganisationsDto.status) {
          //console.log(updateStateDto);
          
          var result= this.organisationsModel.updateOne({ _id: id }, {
            organisationName: updateOrganisationsDto.organisationName,
            stateId: updateOrganisationsDto.state,
            centers: updateOrganisationsDto.centers,
            updatedBy: updateOrganisationsDto.updatedBy,
            updatedAt: new Date()
          });
          return result;
        }
        else {
          return this.organisationsModel.updateOne({ _id: id }, {
            updatedAt: new Date(),
            status: updateOrganisationsDto.status
          });
        }
      }
      catch (e) {
        throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
      }
    }

   async findAll(): Promise<Organisations[]> {
    
      try {
        return this.organisationsModel.find()
        .populate({
          path : 'state',
          select:{ 'stateName': 1}
        })
        
      }
      catch (e) {
        throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
      } 
  } 


  /*findAll = async (req, res) => {
    try {
      let data = await this.organisationsModel.findOne().populate({
        path: 'states',
        select:
          'stateName',
      });
     return res.status(200).json({ data: [data], success: true });
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false, msg: err.message });
    }
  }*/
  
  findOne(id: string) {
    try {
      return this.organisationsModel.findOne({ _id: id })
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  remove(id: string) {
    try {
      return this.organisationsModel.findOneAndDelete({ _id: id }).exec();
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  getOrganisationsByState(stateId){

    return this.organisationsModel.find({'state' : stateId}).exec();
  }

}