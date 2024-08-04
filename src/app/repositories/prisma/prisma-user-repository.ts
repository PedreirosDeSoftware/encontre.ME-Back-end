import { UserRepository } from "@/app/interfaces/user-interfaces";
import { prisma } from "@/app/lib/prisma";
import { Prisma } from "@prisma/client";

export class PrismaUserRepository implements UserRepository {

    async create(data: Prisma.UserCreateInput) {
        const user = await prisma.user.create({
            data
        });
        return user;
    }

    async findByEmail(email: string){
        const user = await prisma.user.findUnique({
            where: { email }
        });
        if (!user) return null;

        return user;
    }

    async findById(id: string) {
        const user = await prisma.user.findUnique({
            where: { id }
        });

        return user
    }
}