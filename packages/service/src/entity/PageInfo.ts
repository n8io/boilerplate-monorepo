import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class PageInfo {
  @Field({ description: 'The last cursor of the current results' })
  endCursor: string;

  @Field({ description: `Whether or not there is next page of results` })
  hasNextPage: boolean;
}
