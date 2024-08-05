import { Post, Prisma } from "@prisma/client";

export interface PostRepository {
    create(data: Prisma.PostUncheckedCreateInput): Promise<Post>;
    findAll(event?: boolean): Promise<Post[]>;
    searchPosts(query: string): Promise<Post[]>;
    findByName(name: string): Promise<Post | null>
    findById(id: string): Promise<Post | null>;
}

export interface CreatePostUseCaseRequest {
    fullName: string, 
    description: string,
    contact: string,
    imagesUrl: string,
    user_id: string,
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
    id: string
}

export interface GetSpecificPostUseCaseResponse {
    post: Post
}

export interface SearchPostUseCaseRequest {
    query: string
}

export interface SearchPostUseCaseResponse {
    posts: Post[]
}


