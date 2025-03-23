import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MemberService } from './member.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard';
import { AuthMember } from '../auth/decorators/authMember.decorator';
import { ObjectId } from 'mongoose';
import { MemberType } from '../../libs/enums/member.enum';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { MemberUpdate } from '../../libs/dto/member/member.update';
import { Member } from '../../libs/dto/member/member';
import { LoginInput, MemberInput } from '../../libs/dto/member/member.input';
import { shapeIntoMongoObjectId } from '../../libs/types/config';

@Resolver()
export class MemberResolver {
    memberService: any;
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
    
@UseGuards(AuthGuard)
    @Query(() => String)
    public async checkAuth(@AuthMember('memberNick') memberNick : string ): Promise<string> {
        console.log('Query: checkAuth');
        console.log('memberNick: memberNick');
        return `Hi ${memberNick}`;
    }

    @Roles(MemberType.USER, MemberType.AGENT)
    @UseGuards(RolesGuard)
    @Query(() => String)
    public async checkAuthRoles(@AuthMember() authMember : Member ): Promise<string> {
        console.log('Query: checkAuthRoles');
        return `Hi ${authMember.memberNick}, you are ${authMember.memberType} (memberId: ${authMember._id})`;
    }

    @UseGuards(AuthGuard)
    @Mutation(() => Member)
    public async updateMember(
        @Args('input') input: MemberUpdate, 
        @AuthMember('_id') memberId: ObjectId 
    ): Promise<Member> {
        console.log('Mutation: updateMember');
        console.log('memberId:', memberId);
        
        delete input._id;
        return this.MemberService.updateMember(memberId, input);
    }
    
    @Query(() => Member)
    public async getMember(@Args('memberId') input: string): Promise<Member> {
        console.log('Query: getMember');
        console
        const targetId = shapeIntoMongoObjectId(input);
        return this.MemberService.getMember(targetId);
    }
    /** ADMIN **/
    //Authorization: ADMIN
    @Roles(MemberType.ADMIN)
    @UseGuards(RolesGuard)
    @Mutation(() => String)
public async getAllMembersByAdmin(): Promise<string> {
    return this.memberService.getAllMembersByAdmin();
}

@Mutation(() => String)
public async updateMemberByAdmin(): Promise<string> {
    console.log('Mutation: updateMemberByAdmin');
    return this.memberService.updateMemberByAdmin();
}
}
