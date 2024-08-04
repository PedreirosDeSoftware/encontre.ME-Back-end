import { Router } from "express";
import { createPostController } from "./create-post-controller";
import { authorizationMiddleware } from "../../middlewares/authorization";
import { fetchPostsController } from "./fetch-posts-controller";
import { getSpecificPostPostController } from "./get-specific-controller";

export function postsRoutes(route: Router) {
    route.post("user/:userId/posts",  authorizationMiddleware, createPostController);
    route.post("weather-event/:weatherId/posts", createPostController);


    route.get("/posts", fetchPostsController);
    route.get("/posts/specific", getSpecificPostPostController);
}