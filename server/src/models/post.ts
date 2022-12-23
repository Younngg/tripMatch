import mongoose from "mongoose";
import { postSchema } from "./schemas";

class PostModel {
  private postDB = mongoose.model("communities", postSchema);

  async countPages(condition: object) {
    const total = await this.postDB.countDocuments(condition);
    return total / 10;
  }
  async findEight(page: number, condition: object) {
    const communities = await this.postDB
      .find(condition, {
        _id: 0,
        postId: 1,
        title: 1,
        region: 1,
        thumbnail: 1,
      })
      .sort({ createdAt: -1 })
      .skip(8 * (page - 1))
      .limit(8);
    return communities;
  }
  async findOne(postId: string, projection: object) {
    const posts = await this.postDB.findOne({ postId }, projection);
    return posts;
  }
  async updateOne(postId: string, postInfo: object) {
    await this.postDB.updateOne({ postId }, postInfo);
  }
  async deleteOne(postId: string) {
    await this.postDB.deleteOne({ postId });
  }
  async create(postInfo: object) {
    await this.postDB.create(postInfo);
  }
}

export default PostModel;
