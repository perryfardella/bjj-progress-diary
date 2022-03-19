import { APILogger } from "../logger/api.logger";
import { EntryService } from "../service/entry.service";

export class EntryController {
  private taskService: EntryService;
  private logger: APILogger;

  constructor() {
    this.taskService = new EntryService();
    this.logger = new APILogger();
  }

  async getEntries() {
    this.logger.info("Controller: getEntries", null);
    return await this.taskService.getEntries();
  }

  async createEntry(entry) {
    this.logger.info("Controller: createEntry", entry);
    return await this.taskService.createEntry(entry);
  }

  async updateEntry(entry) {
    this.logger.info("Controller: updateEntry", entry);
    return await this.taskService.updateEntry(entry);
  }

  async deleteEntry(taskId) {
    this.logger.info("Controller: deleteEntry", taskId);
    return await this.taskService.deleteEntry(taskId);
  }
}
