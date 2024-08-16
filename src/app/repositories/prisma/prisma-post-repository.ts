import { FilterPosts, PostRepository } from "@/app/interfaces/post-interfaces";
import { Prisma } from "@prisma/client";
import { prisma } from "@/app/lib/prisma";

export class PrismaPostRepository implements PostRepository {
   
    async create(data: Prisma.PostUncheckedCreateInput) {
        const post = await prisma.post.create({
            data
          });

        return post;
    }

    async findByName(name: string) {
        const post = await prisma.post.findFirst({
            where: { 
                fullName: name
            }    
        })
        if (!post) return null;

        return post;
    }

    async findAll(query: FilterPosts) {

        const posts = await prisma.post.findMany({
            where: {
                fullName: {
                    contains: query.fullName,
                    mode: 'insensitive'
                },
                Event: {
                    status: query.event
                }
            }, 
        })

        return posts;
    }

    async findById(id: string) {
        const post = await prisma.post.findUnique({
            where: { id }
        });
        if (!post) return null;

        return post;
    }
}