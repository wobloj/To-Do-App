import mongoose, {Schema, Document, Model, Types} from "mongoose";

export interface ITodoList extends Document {
    title: string;
    userId: Types.ObjectId;
    tasks: ITask[];
    createdAt: Date;
    updatedAt: Date;
}
export interface ITask extends Document {
    text: string;
    done: boolean;
    dueDate?: Date;
    createdAt: Date;
    updatedAt: Date;
}

const TaskSchema = new Schema<ITask>({
    text: { type: String, required: true },
    done: { type: Boolean, default: false },
    dueDate: { type: Date }
}, { timestamps: true });

const TodoListSchema = new Schema<ITodoList>({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    title: { type: String, required: true },
    tasks: { type: [TaskSchema], default: [] }
},{ timestamps: true });

const TodoList: Model<ITodoList> = mongoose.model<ITodoList>("TodoList", TodoListSchema);
export default TodoList;