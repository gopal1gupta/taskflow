import {
  DeleteObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";

import { randomUUID } from "crypto";

import { s3 } from "../../config/s3";

import { UploadRepository } from "./upload.repository";

export class UploadService {
  private repository =
    new UploadRepository();

  async uploadFile(
    userId: string,
    file: Express.Multer.File
  ) {
    const key = `${userId}/${randomUUID()}-${file.originalname}`;

    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      })
    );

    const url = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;

    return this.repository.create({
      user_id: userId,
      file_name: file.originalname,
      s3_key: key,
      s3_url: url,
      content_type: file.mimetype,
      file_size: file.size,
    });
  }

  async listFiles(userId: string) {
    return this.repository.findByUser(userId);
  }

  async deleteFile(id: string) {
    const upload =
      await this.repository.findById(id);

    if (!upload) {
      throw new Error("File not found");
    }

    await s3.send(
      new DeleteObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET,
        Key: upload.s3_key,
      })
    );

    await this.repository.delete(id);
  }
}