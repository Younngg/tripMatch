import { FestivalModel } from '../models';
import { openAPI } from '../utils';

class FestivalService {
  private festivalModel = new FestivalModel();

  private async updateDaily() {
    const festival = await this.festivalModel.findOne();
    const today =
      new Date().getFullYear().toString() +
      ('00' + (new Date().getMonth() + 1).toString()).slice(-2) +
      ('00' + new Date().getDate().toString()).slice(-2);

    const createdAt = festival?.createdAt || new Date('1999-99-99');

    if (
      today ===
      createdAt.getFullYear().toString() +
        ('00' + (createdAt.getMonth() + 1).toString()).slice(-2) +
        ('00' + createdAt.getDate().toString()).slice(-2)
    )
      return;
    const festivalInfoes = await openAPI(today);
    await this.festivalModel.deleteMany();
    await this.festivalModel.create(festivalInfoes);
  }
  async getAll() {
    await this.updateDaily();
    const festivals = await this.festivalModel.findMany();
    if (festivals.length === 0) throw new Error('204');
    return festivals;
  }
}

const festivalService = new FestivalService();

export default festivalService;
