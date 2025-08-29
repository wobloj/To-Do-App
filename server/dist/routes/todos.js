"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const TodoList_1 = __importDefault(require("../models/TodoList"));
const jwt_1 = require("../config/jwt");
const router = (0, express_1.Router)();
// Create TODO list
router.post("/", jwt_1.authRequired, (0, express_validator_1.body)("title").isLength({ min: 1 }), async (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });
    const todo = await TodoList_1.default.create({ userId: req.auth.sub, title: req.body.title });
    res.status(201).json(todo);
});
// Get all TODOs
router.get("/", jwt_1.authRequired, async (req, res) => {
    const todos = await TodoList_1.default.find({ userId: req.auth.sub }).sort({ updatedAt: -1 });
    res.json(todos);
});
// Get single TODO
router.get("/:id", jwt_1.authRequired, (0, express_validator_1.param)("id").isMongoId(), async (req, res) => {
    const todo = await TodoList_1.default.findOne({ _id: req.params.id, userId: req.auth.sub });
    if (!todo)
        return res.status(404).json({ error: "Nie znaleziono listy" });
    res.json(todo);
});
// Update title
router.patch("/:id/title", jwt_1.authRequired, (0, express_validator_1.param)("id").isMongoId(), (0, express_validator_1.body)("title").isLength({ min: 1 }), async (req, res) => {
    const todo = await TodoList_1.default.findOneAndUpdate({ _id: req.params.id, userId: req.auth.sub }, { $set: { title: req.body.title } }, { new: true });
    if (!todo)
        return res.status(404).json({ error: "Nie znaleziono listy" });
    res.json(todo);
});
// Add task
router.post("/:id/tasks", jwt_1.authRequired, (0, express_validator_1.param)("id").isMongoId(), (0, express_validator_1.body)("text").isLength({ min: 1 }), async (req, res) => {
    const todo = await TodoList_1.default.findOneAndUpdate({ _id: req.params.id, userId: req.auth.sub }, { $push: { tasks: { text: req.body.text } } }, { new: true });
    if (!todo)
        return res.status(404).json({ error: "Nie znaleziono listy" });
    res.status(201).json(todo);
});
// Update task (text or done)
router.patch("/:id/tasks/:taskId", jwt_1.authRequired, (0, express_validator_1.param)("id").isMongoId(), (0, express_validator_1.param)("taskId").isMongoId(), async (req, res) => {
    const { text, done } = req.body;
    const set = {};
    if (typeof text === "string")
        set["tasks.$.text"] = text;
    if (typeof done === "boolean")
        set["tasks.$.done"] = done;
    const todo = await TodoList_1.default.findOneAndUpdate({ _id: req.params.id, userId: req.auth.sub, "tasks._id": req.params.taskId }, { $set: set }, { new: true });
    if (!todo)
        return res.status(404).json({ error: "Nie znaleziono zadania" });
    res.json(todo);
});
// Delete task
router.delete("/:id/tasks/:taskId", jwt_1.authRequired, (0, express_validator_1.param)("id").isMongoId(), (0, express_validator_1.param)("taskId").isMongoId(), async (req, res) => {
    const todo = await TodoList_1.default.findOneAndUpdate({ _id: req.params.id, userId: req.auth.sub }, { $pull: { tasks: { _id: req.params.taskId } } }, { new: true });
    if (!todo)
        return res.status(404).json({ error: "Nie znaleziono listy/zadania" });
    res.json(todo);
});
// Delete whole TODO list
router.delete("/:id", jwt_1.authRequired, (0, express_validator_1.param)("id").isMongoId(), async (req, res) => {
    const result = await TodoList_1.default.deleteOne({ _id: req.params.id, userId: req.auth.sub });
    if (result.deletedCount === 0)
        return res.status(404).json({ error: "Nie znaleziono listy" });
    res.json({ ok: true });
});
exports.default = router;
