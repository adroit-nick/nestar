import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcyrpt from 'bcryptjs'
import { Member } from '../../libs/dto/member/member';
import { T } from '../../libs/types/common';
import { shapeIntoMongoObjectId } from '../../libs/config';

@Injectable()
export class AuthService {
  constructor(private jwtServise: JwtService) {}


  public async hashPassword(memberPassword: string): Promise<string> {
    const salt = await bcyrpt.genSalt();
    return await bcyrpt.hash(memberPassword, salt);
  }

  public async comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
   return await bcyrpt.compare(password, hashedPassword);
  }

  public async createToken(member: Member): Promise<string> {
    const payload: T = {};

    Object.keys(member['_doc'] ? member ["_doc"] : member).map((ele) => {
      payload[`${ele}`] = member [`${ele}`];
    });
    delete payload.memberPassword;

    return await this.jwtServise.signAsync(payload);
  }

  public async verifyToken(token: string): Promise<Member>{
    const member = await this.jwtServise.verifyAsync(token);
    member._id = shapeIntoMongoObjectId(member._id);
    return member;
  }
}
