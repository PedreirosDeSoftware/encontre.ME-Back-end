import { Post, Prisma } from "@prisma/client";

export interface PostRepository {
    create(data: Prisma.PostUncheckedCreateInput): Promise<Post>;
    findAll(event?: boolean): Promise<Post[]>;
    findByName(name: string): Promise<Post | null>
}

export interface CreatePostUseCaseRequest {
    fullName: string, 
    description: string,
    contact: string,
    imagesUrl: string,
    user_id: string,
    weather_event_id: string | null,
}

export interface CreatePostUseCaseResponse {
    post: Post
}

export interface FetchPostsUseCaseRequest {
    event?: boolean
}

export interface FetchPostsUseCaseResponse {
    posts: Post[]
}

export interface GetSpecificPostUseCaseRequest {
    name: string
}

export interface GetSpecificPostUseCaseResponse {
    post: Post
}



