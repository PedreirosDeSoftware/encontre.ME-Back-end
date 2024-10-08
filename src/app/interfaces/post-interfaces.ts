import { Post, Prisma } from "@prisma/client";

export interface PostRepository {
    create(data: Prisma.PostUncheckedCreateInput): Promise<Post>;
    findAll(query: FilterPosts): Promise<Post[]>;
    findByName(name: string): Promise<Post | null>;
    findById(id: string): Promise<Post | null>;
    updateFoundPost(id: string): Promise<Post | null>;
    delete(id: string): Promise<void>;
}

export interface FilterPosts {
    fullName?: string;
    event?: boolean;
}

export interface FilePath {
    originalname: string | null;
    mimetype: string;
    buffer: Buffer | string | null;
    path: string | null;
}

export interface CreatePostUseCaseRequest {
    fullName: string;
    description: string;
    contact: string;
    images: FilePath[];
    account_id: string;
}

export interface CreatePostUseCaseResponse {
    post: Post;
}

export interface FetchPostsUseCaseRequest {
    fullName?: string;
    event?: boolean;
}

export interface FetchPostsUseCaseResponse {
    posts: Post[];
}

export interface GetSpecificPostUseCaseRequest {
    id: string;
}

export interface GetSpecificPostUseCaseResponse {
    post: Post;
}

export interface UpdateFoundPostUseCaseRequest {
    id: string;
}

export interface UpdateFoundPostUseCaseResponse {
    post: Post;
}
