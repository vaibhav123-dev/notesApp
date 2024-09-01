import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Note } from "./../models/note.model.js";

const addNote = asyncHandler(async (req, res) => {
  const { title, content, tags } = req.body;
  const user = req.user;

  if (!title) {
    throw new ApiError(400, "Title is required");
  }

  if (!content) {
    throw new ApiError(400, "Content is required");
  }

  try {
    const note = await Note.create({
      title,
      content,
      tags: tags || [],
      userId: user._id,
    });

    return res.status(201).json(new ApiResponse(200, note, "Note added successfully"));
  } catch (error) {
    throw new ApiError(500, error?.message || "Something went wrong while adding note");
  }
});

const editNote = asyncHandler(async (req, res) => {
  const noteId = req.params.noteId;
  const { title, content, tags, isPinned } = req.body;
  const user = req.user;

  if (!title && !content && !tags) {
    throw new ApiError(400, "All fields are required");
  }

  try {
    const note = await Note.findByIdAndUpdate(
      { _id: noteId, userId: user._id },
      { title, content, tags, isPinned },
      { new: true, runValidators: true }
    );

    if (!note) {
      throw new ApiError(404, "Note not found");
    }

    return res.status(201).json(new ApiResponse(200, note, "Note update successfully"));
  } catch (error) {
    throw new ApiError(500, error?.message || "Something went wrong while updating note");
  }
});

const updatePinnedStatus = asyncHandler(async (req, res) => {
  const noteId = req.params.noteId;
  const { isPinned } = req.body;
  const user = req.user;

  try {
    const note = await Note.findByIdAndUpdate(
      { _id: noteId, userId: user._id },
      { isPinned },
      { new: true, runValidators: true }
    );

    return res.status(201).json(new ApiResponse(200, note, "Note pinned successfully"));
  } catch (error) {
    throw new ApiError(500, error?.message || "Something went wrong while updating note");
  }
});

const getAllNotes = asyncHandler(async (req, res) => {
  const user = req.user;

  try {
    const notes = await Note.find({ userId: user._id }).sort({ isPinned: -1 });

    return res.status(201).json(new ApiResponse(200, notes, "All notes retrieved successfully"));
  } catch (error) {
    throw new ApiError(500, error?.message || "Something went wrong while getting notes");
  }
});

const deleteNote = asyncHandler(async (req, res) => {
  const noteId = req.params.noteId;
  const user = req.user;
  try {
    const note = await Note.findOneAndDelete({ _id: noteId, userId: user._id });

    if (!note) {
      return res.status(404).json({ error: true, message: "Note not found" });
    }

    return res.status(201).json(new ApiResponse(200, "Note delete successfully"));
  } catch (error) {
    throw new ApiError(500, error?.message || "Something went wrong while deleting notes");
  }
});

const searchNote = asyncHandler(async (req, res) => {
  const user = req.user;
  const { query } = req.query;

  if (!query) {
    throw new ApiError(400, "Search query is required");
  }

  try {
    const regex = new RegExp(query, "i");
    const matchingNotes = await Note.find({
      userId: user._id,
      $or: [{ title: regex }, { content: regex }],
    });

    return res
      .status(201)
      .json(
        new ApiResponse(
          200,
          matchingNotes,
          "Notes matching the search query retrieved successfully"
        )
      );
  } catch (error) {
    throw new ApiError(500, error?.message || "Something went wrong while searching notes");
  }
});

export { addNote, editNote, updatePinnedStatus, getAllNotes, deleteNote, searchNote };
