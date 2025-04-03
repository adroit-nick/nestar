import { Module } from '@nestjs/common';
import CommentSchema from '../../schemas/Comment.model';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { MemberModule } from '../member/member.module';
import { PropertyModule } from '../property/property.module';
import { BoardArticle } from '../../libs/dto/board-article/board-article';
import { BoardArticleModule } from '../board-article/board-article.module';
import { CommentService } from './comment.service';
import { CommentResolver } from './comment.resolver';

@Module({
    imports: [
      MongooseModule.forFeature([{name: "Comment", schema: CommentSchema}]),
      AuthModule,
      MemberModule,
      PropertyModule,
      BoardArticleModule,
    ],
  providers: [CommentResolver, CommentService]
})
export class CommentModule {}