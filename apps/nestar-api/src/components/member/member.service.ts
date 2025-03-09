import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Member } from '../../libs/types/dto/member/member';
import { MemberInput } from '../../libs/types/dto/member/member.input';

@Injectable()
export class MemberService {

    constructor(@InjectModel('Member') private readonly memberModel: Model<Member>) {}
public async signup(input: MemberInput): Promise<Member> {
//TODO Hash PAssword
const result = await this.memberModel.create(input);
        return result;}

public async login(): Promise<string> {
    return 'signup executed!';}

public async updateMember(): Promise<string> {
    return 'signup executed!';}

public async getMember(): Promise<string> {
    return 'signup executed!';}
}
