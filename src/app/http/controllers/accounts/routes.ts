import { Router } from "express";
import { registerController } from "./register-controller";
import { authenticateController } from "./authenticate-controller";
import { getAccountController } from "./get-account-controller";
import { upload } from "@/app/lib/multer";
import { authTokenController } from "./auth-token-controller";
import { authorizationMiddleware } from "../../middlewares/authorization";
import { activationAccountController } from "./activation-account-controller";
import { deleteAccountController } from "./delete-account-controller";
import { editAccountController } from "./edit-account-controller";

export function accountsRoutes(route: Router) {
    //* Routes Publics */
    route.post("/register", registerController);
    route.post("/login", authenticateController);
    route.get("/account/:id/activation", activationAccountController);

    //* Routes Privates */
    route.get("/account/authorization", authorizationMiddleware, authTokenController);
    route.get("/account/:id", authorizationMiddleware, getAccountController);
    route.put("/account/:id/edit", authorizationMiddleware, upload.single('avatar'), editAccountController);
    route.delete("/account/:id/delete", authorizationMiddleware, deleteAccountController);
}