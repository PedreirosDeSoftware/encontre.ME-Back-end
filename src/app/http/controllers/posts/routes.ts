import { Router } from "express";
import { createPostController } from "./create-post-controller";
import { authorizationMiddleware } from "../../middlewares/authorization";
import { fetchPostsController } from "./fetch-posts-controller";
import { getSpecificPostPostController } from "./get-specific-controller";

export function postsRoutes(router: Router) {
    router.post("/user/:user_id/posts", authorizationMiddleware, createPostController);
  
    router.get("/posts", fetchPostsController);
    router.get("/posts/specific", getSpecificPostPostController);
}
