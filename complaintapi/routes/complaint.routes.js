import express from "express";
import {
  getComplaints,
  createComplaint,
  resolveComplaint,
  deleteComplaint
} from "../controller/complaint.controller.js";
import auth from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", getComplaints);
router.post("/", createComplaint);
router.put("/:id/resolve", auth, resolveComplaint);
router.delete("/:id", auth, deleteComplaint);

export default router;
