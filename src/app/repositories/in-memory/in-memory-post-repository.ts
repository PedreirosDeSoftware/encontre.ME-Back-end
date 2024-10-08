import { FilterPosts, PostRepository } from "@/app/interfaces/post-interfaces";
import { Post, Prisma } from "@prisma/client";
import { randomUUID } from "node:crypto";
import { InMemoryEventRepository } from "./in-memory-event-repository";

export class InMemoryPostRepository implements PostRepository {
    public posts: Post[] = [];

    constructor(private eventRepository: InMemoryEventRepository) {}

    async create(data: Prisma.PostUncheckedCreateInput) {
        const post = {
            id: randomUUID(),
            fullName: data.fullName,
            description: data.description,
            contact: data.contact,
            photo: data.photo ?? null,
            found: data.found ? new Date( data.found ) : null,
            account_id: data.account_id,
            event_id: data.event_id ?? null,
            createdAt: new Date()
        }

        this.posts.push(post);
        return post;
    }

    async findByName(name: string) {
        const post = this.posts.find(item => item.fullName.toLowerCase() === name.toLowerCase());
        if (!post) return null;

        return post;
    }

    async findAll(query: FilterPosts) {

        const event = this.eventRepository.events  
            .filter((item) => query.event ? item.status === query.event : false)          
        
        if (event.length > 0) {

            const postsWithEvent = this.posts
                .filter((item) => event.some((e) => e.id === item.event_id))
                .filter((item) => query.fullName ? item.fullName.toLowerCase() === query.fullName.toLowerCase() : true)
                    
            return postsWithEvent
        }

        const posts = this.posts
            .filter((item) => query.fullName ? item.fullName.toLowerCase() === query.fullName.toLowerCase() : true)
   
        return posts

    }

    async findById(id: string) {
        const post = this.posts.find(item => item.id === id);
        if (!post) return null;

        return post;
    }

    async updateFoundPost(id: string){
        const post = this.posts.find(item => item.id === id);
        if (!post) return null;

        post.found = new Date();

        return post;
    }

    async delete(id: string) {
        const postIndex = this.posts.findIndex(item => item.id === id);
        if (postIndex > -1) {
            this.posts.splice(postIndex, 1);
        };
    }

}