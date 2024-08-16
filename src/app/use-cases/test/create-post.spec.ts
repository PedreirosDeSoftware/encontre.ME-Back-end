import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryPostRepository } from "../../repositories/in-memory/in-memory-post-repository";
import { CreatePostUseCase } from "../create-post";
import { PostAlreadyExistsError } from "../../exceptions/post-already-exist-error";
import { InMemoryEventRepository } from "../../repositories/in-memory/in-memory-event-repository";
import { InMemoryImageRepository } from "@/app/repositories/in-memory/in-memory-image-repository";
import { InvalidRequestError } from "@/app/exceptions/invalid-request-images-error";


let postRepository: InMemoryPostRepository;
let eventRepository: InMemoryEventRepository;
let imageRepository: InMemoryImageRepository;
let sut: CreatePostUseCase; 

describe('Create Post Use Case', () => {

    beforeEach(() => {
        eventRepository = new InMemoryEventRepository();
        imageRepository = new InMemoryImageRepository();
        postRepository = new InMemoryPostRepository(eventRepository);
        sut = new CreatePostUseCase(postRepository, imageRepository);

    });

    const images = [
        {
            id: "1",
            url: 'https://example.com/image1.jpg',
        },
        {
            id: "2",
            url: 'https://example.com/image2.jpg',
        }
    ]

    it('should be able to create post', async () => { 
        const { post } = await sut.execute({
            fullName: 'desaparecido',
            description: 'é uma pessoa desaparecida',
            contact: '55 61 9999-9999',
            images,
            user_id: 'user-1',
        });
        
        expect(post.id).toEqual(expect.any(String));
    });

    it('should not be able to create post with same full name', async () => { 

        const images = [
            {
                id: "1",
                url: 'https://example.com/image1.jpg',
            },
            {
                id: "2",
                url: 'https://example.com/image2.jpg',
            }
        ]

        await sut.execute({
            fullName: 'desaparecido',
            description: 'é uma pessoa desaparecida',
            contact: '55 61 9999-9999',
            images,
            user_id: 'user-1',
        });
        
        await expect(() => 
            sut.execute({
                fullName: 'desaparecido',
                description: 'é uma pessoa desaparecida',
                contact: '55 61 9999-9999',
                images,
                user_id: 'user-1',
            })
        ).rejects.toBeInstanceOf(PostAlreadyExistsError);
    });

    it('should not be able to create post without image', async () => { 
       const images = [
            {
                id: "1",
                url: 'https://example.com/image1.jpg',
            },
            {
                id: "2",
                url: 'https://example.com/image2.jpg',
            }
        ];

        await sut.execute({
            fullName: 'desaparecido test',
            description: 'é uma pessoa desaparecida',
            contact: '55 61 9999-9999',
            images,
            user_id: 'user-1',
        });
        
        await expect(() => 
            sut.execute({
                fullName: 'desaparecido',
                description: 'é uma pessoa desaparecida',
                contact: '55 61 9999-9999',
                images: [],
                user_id: 'user-1',
            })
        ).rejects.toBeInstanceOf(InvalidRequestError);
    });
});