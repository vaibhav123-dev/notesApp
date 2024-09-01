import { Router } from "express";
import {
  addNote,
  deleteNote,
  editNote,
  getAllNotes,
  searchNote,
  updatePinnedStatus,
} from "../controllers/note.controller.js";
import { verifyJWT } from "./../middlewares/auth.middleware.js";

const router = Router();

//notes routes
router.route("/get_all_notes").get(verifyJWT, getAllNotes);
router.route("/add_note").post(verifyJWT, addNote);
router.route("/edit_note/:noteId").put(verifyJWT, editNote);
router.route("/update_pinned_note/:noteId").put(verifyJWT, updatePinnedStatus);
router.route("/search_note").get(verifyJWT, searchNote);
router.route("/delete_note/:noteId").delete(verifyJWT, deleteNote);

export default router;
