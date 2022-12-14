import { IPostEntity } from "../entities/posts/post.entity"

export interface IPostsRepository {
  readById(resourceId: number): Promise<IPostEntity | undefined>
  create(resource: IPostEntity): Promise<IPostEntity>
  deleteById(resourceId: number): Promise<void>
  list(): Promise<IPostEntity[]>
  updateById(resource: IPostEntity): Promise<IPostEntity | undefined>
  listByIdUser(resourceId: number): Promise<IPostEntity[] | undefined>
}
