import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MemberService } from './member.service';
import { LoginInput, MemberInput } from '../../libs/types/dto/member/member.input';
import { Member } from '../../libs/types/dto/member/member';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard';
import { AuthMember } from '../auth/decorators/authMember.decorator';
import { ObjectId } from 'mongoose';

@Resolver()
export class MemberResolver {
    constructor(private readonly MemberService: MemberService) {}

    @Mutation(() => Member)
    public async signup(@Args('input') input: MemberInput ): Promise<Member> {
        console.log('Mutation: signup');
        return this.MemberService.signup(input);
        }

    @Mutation(() => Member)
    public async login(@Args('input') input: LoginInput ): Promise<Member> {
        console.log('Mutation: login');
        return this.MemberService.login(input);
            }
    

    
            //Authenticated (user/agent/admin)

    @UseGuards(AuthGuard)
    @Mutation(() => String)
    public async updateMember(@AuthMember('_id') memberId: ObjectId ): Promise<string> {
        console.log('Mutation: updateMember');
        console.log(typeof memberId);
        console.log(memberId);
        return this.MemberService.updateMember();
    }

    @Query(() => String)
    public async getMember(): Promise<string> {
        console.log('Query: getMember');
        return this.MemberService.getMember();
    }

    /** ADMIN **/
    //Authorization: ADMIN
    @Mutation(() => String)
public async getAllMembersByAdmin(): Promise<string> {
    return this.MemberService.getAllMembersByAdmin();
}

@Mutation(() => String)
public async updateMemberByAdmin(): Promise<string> {
    console.log('Mutation: updateMemberByAdmin');
    return this.MemberService.updateMemberByAdmin();
}
}
