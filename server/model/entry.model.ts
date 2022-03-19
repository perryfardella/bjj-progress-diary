import { model, Schema, Model, Document } from "mongoose";

export interface IEntry extends Document {
  sessionType: string;
  entry: string;
  entryDate: string;
  createDate: string;
  updatedDate: string;
  user: string;
}

const EntrySchema: Schema = new Schema({
  sessionType: { type: String, required: false },
  entry: { type: String, required: true },
  entryDate: { type: Date, default: Date.now },
  createDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now },
  user: { type: String, required: false },
});

export const EntryModel: Model<IEntry> = model<IEntry>("entries", EntrySchema);
