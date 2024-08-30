import { Router } from "express";
import { createPostController } from "./create-post-controller";
import { authorizationMiddleware } from "../../middlewares/authorization";
import { fetchPostsController } from "./fetch-posts-controller";
import { getSpecificPostController } from "./get-specific-post-controller";
import { upload } from "@/app/lib/multer";
import { updateFoundPostController } from "./found-post-controller";

export function postsRoutes(router: Router) {
    //* Routes Privates */
    router.post("/account/:account_id/posts/create", upload.array('images', 10),
    authorizationMiddleware, createPostController);
  
    //* Routes Publics */
    router.get("/posts", authorizationMiddleware, fetchPostsController);
    router.get("/posts/:id", authorizationMiddleware, getSpecificPostController);
    router.patch("/posts/:id/found", authorizationMiddleware, updateFoundPostController);
}
