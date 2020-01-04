import { ObjectType, Field } from 'type-graphql';

interface IPageInfo {
  endCursor?: string;
  hasNextPage: boolean;
}

@ObjectType({ description: 'The page info' })
export class PageInfo implements IPageInfo {
  @Field({
    description: 'The unique cursor index of the last item',
    nullable: true,
  })
  endCursor: string;

  @Field({
    description: 'Whether or not there is anoter page of data',
    nullable: true,
  })
  hasNextPage: boolean;
}
