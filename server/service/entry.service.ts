import { EntryRepository } from "../repository/entry.repository";

export class EntryService {
  private entryRepository: EntryRepository;

  constructor() {
    this.entryRepository = new EntryRepository();
  }

  async getEntries() {
    return await this.entryRepository.getEntries();
  }

  async createEntry(entry) {
    return await this.entryRepository.createEntry(entry);
  }

  async updateEntry(entry) {
    return await this.entryRepository.updateEntry(entry);
  }

  async deleteEntry(entryId) {
    return await this.entryRepository.deleteEntry(entryId);
  }
}
