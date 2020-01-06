import { ClassType, Field, ObjectType } from 'type-graphql';
import { Edge, PageInfo } from 'types/pagination';

interface IPage<T> {
  pageInfo: PageInfo;
  edges: Edge<T>[];
}

export function Page<T>(ItemType: ClassType<T>) {
  @ObjectType(`${ItemType.name}Edge`, {
    description: `A paginated ${ItemType.name} edge`,
  })
  abstract class EdgeClass implements Edge<T> {
    @Field({ description: 'The unique cursor index' })
    cursor: string;

    @Field(() => ItemType, { description: `A ${ItemType.name} object` })
    node: T;
  }

  @ObjectType({ description: `The ${ItemType.name} page`, isAbstract: true })
  abstract class PageClass implements IPage<T> {
    @Field(() => PageInfo, {
      description: `The ${ItemType.name} page information`,
      nullable: true,
    })
    pageInfo: PageInfo;

    @Field(() => [EdgeClass], {
      description: `The array of returned ${ItemType.name} edges`,
    })
    edges: EdgeClass[];
  }

  return PageClass;
}
