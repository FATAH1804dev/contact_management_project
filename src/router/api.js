import express from "express";
import { authMiddleware } from "../middleware/middleware-auth.js";
import controllerUser from "../controller/controller-user.js";
import controllerContact from "../controller/controller-contact.js";
import controllerAddress from "../controller/controller-address.js";

const userRouter = new express.Router();
userRouter.use(authMiddleware);

//api user
userRouter.get("/api/users/current", controllerUser.get);
userRouter.patch("/api/users/current", controllerUser.update);
userRouter.delete("/api/users/logout", controllerUser.logout);

//api contact
userRouter.post("/api/contacts", controllerContact.create);
userRouter.get("/api/contacts/:contactId", controllerContact.get);
userRouter.put("/api/contacts/:contactId", controllerContact.update);
userRouter.delete("/api/contacts/:contactId", controllerContact.remove);
userRouter.get("/api/contacts/", controllerContact.search);

//api address
userRouter.post("/api/contacts/:contactId/address", controllerAddress.create);
userRouter.get(
  "/api/contacts/:contactId/address/:addressId",
  controllerAddress.get,
);
userRouter.put(
  "/api/contacts/:contactId/address/:addressId",
  controllerAddress.update,
);
userRouter.delete(
  "/api/contacts/:contactId/address/:addressId",
  controllerAddress.remove,
);
userRouter.get("/api/contacts/:contactId/address", controllerAddress.list);

export { userRouter };
