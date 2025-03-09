import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { MemberService } from './member.service';

@Resolver()
export class MemberResolver {
    constructor(private readonly MemberService: MemberService) {}

    @Mutation(() => String)
    public async signup(): Promise<string> {
        console.log('Mutation: signup');
        return this.MemberService.signup();
    }

    @Mutation(() => String)
    public async login(): Promise<string> {
        console.log('Mutation: login');
        return this.MemberService.login();
    }

    @Mutation(() => String)
    public async updateMember(): Promise<string> {
        console.log('Mutation: updateMember');
        return this.MemberService.updateMember();
    }

    @Query(() => String)
    public async getMember(): Promise<string> {
        console.log('Query: getMember');
        return this.MemberService.getMember();
    }
}
