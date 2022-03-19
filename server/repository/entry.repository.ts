import { connect, disconnect } from "../config/db.config";
import { EntryModel } from "../model/entry.model";
import { APILogger } from "../logger/api.logger";

export class EntryRepository {
  private logger: APILogger;

  constructor() {
    connect();
    this.logger = new APILogger();
  }

  async getEntries() {
    const entries = await EntryModel.find({});
    console.log("entries:::", entries);
    return entries;
  }

  async createEntry(entry) {
    let data = {};
    try {
      data = await EntryModel.create(entry);
    } catch (err) {
      this.logger.error("Error::" + err);
    }
    return data;
  }

  async updateEntry(entry) {
    let data = {};
    try {
      data = await EntryModel.updateOne(entry);
    } catch (err) {
      this.logger.error("Error::" + err);
    }
    return data;
  }

  async deleteEntry(entryId) {
    let data: any = {};
    try {
      data = await EntryModel.deleteOne({ _id: entryId });
    } catch (err) {
      this.logger.error("Error::" + err);
    }
    return { status: `${data.deletedCount > 0 ? true : false}` };
  }
}
