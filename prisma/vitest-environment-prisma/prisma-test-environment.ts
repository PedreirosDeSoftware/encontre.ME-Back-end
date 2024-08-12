import { Environment } from "vitest";
import { randomUUID } from "node:crypto";
import { execSync } from "node:child_process";
import { prisma } from "@/app/lib/prisma";
import "dotenv/config";

function generateSchema(schema:string) {
    if (!process.env.DATABASE_URL) throw new Error('Please, provide DATABASE_URL environment variable')
    
    const url = new URL(process.env.DATABASE_URL);
    url.searchParams.set('schema', schema);
    
    return url.toString();

}

export default <Environment> {
    name: 'prisma',
    transformMode: 'ssr',

    async setup() {
        const schema = randomUUID();
        const url = generateSchema(schema);
        process.env.DATABASE_URL = url;

        execSync('yarn prisma migrate deploy');

        return {
            async teardown() {
                await prisma.$executeRawUnsafe(`DROP SCHEMA If EXISTS "${schema}" CASCADE`);
                await prisma.$disconnect();   
            }
        }
    }
}