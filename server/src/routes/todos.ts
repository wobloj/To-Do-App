import { Router, Request, Response } from "express";
import { body, param, validationResult } from "express-validator";
import TodoList from "../models/TodoList";
import { authRequired } from "../config/jwt";

const router = Router();

// Create TODO list
router.post("/", authRequired, body("title").isLength({ min: 1 }), async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const todo = await TodoList.create({ userId: req.auth!.sub, title: req.body.title });
  res.status(201).json(todo);
});

// Get all TODOs
router.get("/", authRequired, async (req: Request, res: Response) => {
  const todos = await TodoList.find({ userId: req.auth!.sub }).sort({ updatedAt: -1 });
  res.json(todos);
});

// Get single TODO
router.get("/:id", authRequired, param("id").isMongoId(), async (req: Request, res: Response) => {
  const todo = await TodoList.findOne({ _id: req.params.id, userId: req.auth!.sub });
  if (!todo) return res.status(404).json({ error: "Nie znaleziono listy" });
  res.json(todo);
});

// Update title
router.patch("/:id/title", authRequired, param("id").isMongoId(), body("title").isLength({ min: 1 }), async (req: Request, res: Response) => {
  const todo = await TodoList.findOneAndUpdate(
    { _id: req.params.id, userId: req.auth!.sub },
    { $set: { title: req.body.title } },
    { new: true }
  );
  if (!todo) return res.status(404).json({ error: "Nie znaleziono listy" });
  res.json(todo);
});

// Add task
router.post("/:id/tasks", authRequired, param("id").isMongoId(), body("text").isLength({ min: 1 }), async (req: Request, res: Response) => {
  const todo = await TodoList.findOneAndUpdate(
    { _id: req.params.id, userId: req.auth!.sub },
    { $push: { tasks: { text: req.body.text } } },
    { new: true }
  );
  if (!todo) return res.status(404).json({ error: "Nie znaleziono listy" });
  res.status(201).json(todo);
});

// Update task (text or done)
router.patch("/:id/tasks/:taskId", authRequired, param("id").isMongoId(), param("taskId").isMongoId(), async (req: Request, res: Response) => {
  const { text, done } = req.body as { text?: string; done?: boolean };
  const set: Record<string, any> = {};
  if (typeof text === "string") set["tasks.$.text"] = text;
  if (typeof done === "boolean") set["tasks.$.done"] = done;
  const todo = await TodoList.findOneAndUpdate(
    { _id: req.params.id, userId: req.auth!.sub, "tasks._id": req.params.taskId },
    { $set: set },
    { new: true }
  );
  if (!todo) return res.status(404).json({ error: "Nie znaleziono zadania" });
  res.json(todo);
});

// Delete task
router.delete("/:id/tasks/:taskId", authRequired, param("id").isMongoId(), param("taskId").isMongoId(), async (req: Request, res: Response) => {
  const todo = await TodoList.findOneAndUpdate(
    { _id: req.params.id, userId: req.auth!.sub },
    { $pull: { tasks: { _id: req.params.taskId } } },
    { new: true }
  );
  if (!todo) return res.status(404).json({ error: "Nie znaleziono listy/zadania" });
  res.json(todo);
});

// Delete whole TODO list
router.delete("/:id", authRequired, param("id").isMongoId(), async (req: Request, res: Response) => {
  const result = await TodoList.deleteOne({ _id: req.params.id, userId: req.auth!.sub });
  if (result.deletedCount === 0) return res.status(404).json({ error: "Nie znaleziono listy" });
  res.json({ ok: true });
});

export default router;