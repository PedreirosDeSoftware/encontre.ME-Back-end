import { FilterPosts, PostRepository } from "@/app/interfaces/post-interfaces";
import { Post, Prisma } from "@prisma/client";
import { randomUUID } from "node:crypto";
import { InMemoryWeatherEventRepository } from "./in-memory-weather-event-repository";

export class InMemoryPostRepository implements PostRepository {
    public posts: Post[] = [];

    constructor(private weatherEventRepository: InMemoryWeatherEventRepository) {}

    async create(data: Prisma.PostUncheckedCreateInput) {
        const post = {
            id: randomUUID(),
            fullName: data.fullName,
            description: data.description,
            contact: data.contact,
            photo: data.photo ?? null,
            user_id: data.user_id,
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

        // const weatherEvent = this.weatherEventRepository.events
        //     .filter((item) => item.status === event)            

        // if (!event) {
        //     return this.posts;
        // }

        // const posts = this.posts
        //     .filter((item) => weatherEvent.some((event) => event.id === item.weather_event_id));
        const posts = this.posts
            .filter((item) => query.fullName ? item.fullName.toLowerCase() === query.fullName.toLowerCase() : true)
        
        return posts;
    }

    async findById(id: string) {
        const post = this.posts.find(item => item.id === id);
        if (!post) return null;

        return post;
    }

}