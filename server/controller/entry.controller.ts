import { APILogger } from "../logger/api.logger";
import { EntryService } from "../service/entry.service";

export class EntryController {
  private entryService: EntryService;
  private logger: APILogger;

  constructor() {
    this.entryService = new EntryService();
    this.logger = new APILogger();
  }

  async getEntries() {
    this.logger.info("Controller: getEntries", null);
    return await this.entryService.getEntries();
  }

  async createEntry(entry) {
    this.logger.info("Controller: createEntry", entry);
    return await this.entryService.createEntry(entry);
  }

  async updateEntry(entry) {
    this.logger.info("Controller: updateEntry", entry);
    return await this.entryService.updateEntry(entry);
  }

  async deleteEntry(entryId) {
    this.logger.info("Controller: deleteEntry", entryId);
    return await this.entryService.deleteEntry(entryId);
  }
}
