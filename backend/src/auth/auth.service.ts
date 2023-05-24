import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/entities/user.entity';


@Injectable()
export class AuthService {
    constructor(
      @InjectModel('User') private userModel: Model<User>,
        private jwtService: JwtService
    ) { }

    async loginUser(email: string, mobile: string) {
        try {
            const user = await this.userModel.findOne({status: true, email: email, mobile: mobile })
            if (!user) {
                throw new UnauthorizedException(`No user exists with this username ${email}`);
            } else {
                const token = await this.jwtService.signAsync({ id: user._id, email: user.email });
                const lastLogin = new Date().toISOString().toString();
                return { user, token, lastLogin }
            }
        }
        catch (e) {
            throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
