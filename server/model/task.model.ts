import { model, Schema, Model, Document } from "mongoose";

// TO DO: Update these models once the data structures are defined for the journaling data
// The author interface can probably stay

export interface IEntry extends Document {
  sessionType: string;
  entry: string;
  entryDate: string;
  createDate: string;
  updatedDate: string;
  user: string;
}

const TaskSchema: Schema = new Schema({
  sessionType: { type: String, required: false },
  entry: { type: String, required: true },
  entryDate: { type: Date, default: Date.now },
  createDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now },
  user: { type: String, required: false },
});

export const TaskModel: Model<IEntry> = model<IEntry>("entries", TaskSchema);
