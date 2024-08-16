import { Post, Prisma } from "@prisma/client";

export interface PostRepository {
    create(data: Prisma.PostUncheckedCreateInput): Promise<Post>;
    findAll(query: FilterPosts): Promise<Post[]>;
    findByName(name: string): Promise<Post | null>
    findById(id: string): Promise<Post | null>;
}

export interface FilterPosts {
    fullName?: string,
    event?: boolean,
}

export interface FilePath {
    url: string | null,
}

export interface CreatePostUseCaseRequest {
    fullName: string, 
    description: string,
    contact: string,
    images: FilePath[]
    user_id: string,
}

export interface CreatePostUseCaseResponse {
    post: Post
}

export interface FetchPostsUseCaseRequest {
    fullName?: string,
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



