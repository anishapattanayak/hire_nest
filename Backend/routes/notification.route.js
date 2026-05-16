import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import {
  getUserNotifications,
  markAllNotificationsRead,
} from "../controllers/notification.controller.js";

const router = express.Router();

router.route("/").get(isAuthenticated, getUserNotifications);
router.route("/read-all").post(isAuthenticated, markAllNotificationsRead);

export default router;

