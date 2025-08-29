import { Router, Request, Response } from "express";
import { body, param, validationResult } from "express-validator";
import ShoppingList from "../models/ShoppingList";
import { authRequired } from "../config/jwt";

const router = Router();

// Add item
router.post("/", authRequired, body("name").isLength({ min: 1 }), async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const item = await ShoppingList.create({
    userId: req.auth!.sub,
    name: req.body.name,
    quantity: req.body.quantity,
    notes: req.body.notes,
  });
  res.status(201).json(item);
});

// Get items
router.get("/", authRequired, async (req: Request, res: Response) => {
  const items = await ShoppingList.find({ userId: req.auth!.sub }).sort({ updatedAt: -1 });
  res.json(items);
});

// Update item
router.patch("/:id", authRequired, param("id").isMongoId(), async (req: Request, res: Response) => {
  const { name, quantity, notes } = req.body as { name?: string; quantity?: string; notes?: string };
  const set: Record<string, any> = {};
  if (typeof name === "string") set.name = name;
  if (typeof quantity === "string") set.quantity = quantity;
  if (typeof notes === "string") set.notes = notes;
  const item = await ShoppingList.findOneAndUpdate({ _id: req.params.id, userId: req.auth!.sub }, { $set: set }, { new: true });
  if (!item) return res.status(404).json({ error: "Nie znaleziono produktu" });
  res.json(item);
});

// Toggle have
router.patch("/:id/toggle", authRequired, param("id").isMongoId(), async (req: Request, res: Response) => {
  const item = await ShoppingList.findOne({ _id: req.params.id, userId: req.auth!.sub });
  if (!item) return res.status(404).json({ error: "Nie znaleziono produktu" });
  item.have = !item.have;
  await item.save();
  res.json(item);
});

// Delete item
router.delete("/:id", authRequired, param("id").isMongoId(), async (req: Request, res: Response) => {
  const result = await ShoppingList.deleteOne({ _id: req.params.id, userId: req.auth!.sub });
  if (result.deletedCount === 0) return res.status(404).json({ error: "Nie znaleziono produktu" });
  res.json({ ok: true });
});

export default router;