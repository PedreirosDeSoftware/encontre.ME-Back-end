import { Router } from "express";
import { createPostController } from "./create-post-controller";
import { authorizationMiddleware } from "../../middlewares/authorization";
import { fetchPostsController } from "./fetch-posts-controller";
import { getSpecificPostController } from "./get-specific-controller";
import { searchPostController } from "./search-posts-controller";

export function postsRoutes(router: Router) {
    router.post("/user/:user_id/posts", authorizationMiddleware, createPostController);
  
    router.get("/posts", fetchPostsController);
    router.get("/posts/", searchPostController)
    router.get("/posts/:id", getSpecificPostController);
}
