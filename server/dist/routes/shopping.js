"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const ShoppingList_1 = __importDefault(require("../models/ShoppingList"));
const jwt_1 = require("../config/jwt");
const router = (0, express_1.Router)();
// Add item
router.post("/", jwt_1.authRequired, (0, express_validator_1.body)("name").isLength({ min: 1 }), async (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });
    const item = await ShoppingList_1.default.create({
        userId: req.auth.sub,
        name: req.body.name,
        quantity: req.body.quantity,
        notes: req.body.notes,
    });
    res.status(201).json(item);
});
// Get items
router.get("/", jwt_1.authRequired, async (req, res) => {
    const items = await ShoppingList_1.default.find({ userId: req.auth.sub }).sort({ updatedAt: -1 });
    res.json(items);
});
// Update item
router.patch("/:id", jwt_1.authRequired, (0, express_validator_1.param)("id").isMongoId(), async (req, res) => {
    const { name, quantity, notes } = req.body;
    const set = {};
    if (typeof name === "string")
        set.name = name;
    if (typeof quantity === "string")
        set.quantity = quantity;
    if (typeof notes === "string")
        set.notes = notes;
    const item = await ShoppingList_1.default.findOneAndUpdate({ _id: req.params.id, userId: req.auth.sub }, { $set: set }, { new: true });
    if (!item)
        return res.status(404).json({ error: "Nie znaleziono produktu" });
    res.json(item);
});
// Toggle have
router.patch("/:id/toggle", jwt_1.authRequired, (0, express_validator_1.param)("id").isMongoId(), async (req, res) => {
    const item = await ShoppingList_1.default.findOne({ _id: req.params.id, userId: req.auth.sub });
    if (!item)
        return res.status(404).json({ error: "Nie znaleziono produktu" });
    item.have = !item.have;
    await item.save();
    res.json(item);
});
// Delete item
router.delete("/:id", jwt_1.authRequired, (0, express_validator_1.param)("id").isMongoId(), async (req, res) => {
    const result = await ShoppingList_1.default.deleteOne({ _id: req.params.id, userId: req.auth.sub });
    if (result.deletedCount === 0)
        return res.status(404).json({ error: "Nie znaleziono produktu" });
    res.json({ ok: true });
});
exports.default = router;
