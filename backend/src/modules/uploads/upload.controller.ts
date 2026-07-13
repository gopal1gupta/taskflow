import { Request, Response } from "express";

import { UploadService } from "./upload.service";

const service = new UploadService();

export class UploadController {
  async upload(req: Request, res: Response) {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No file uploaded",
        });
      }

      const file = await service.uploadFile(
        (req as any).currentUser.id,
        req.file
      );

      return res.status(201).json({
        success: true,
        data: file,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message: "Upload failed",
      });
    }
  }

  async list(req: Request, res: Response) {
    const files =
      await service.listFiles(
        (req as any).currentUser.id
      );

    res.json({
      success: true,
      data: files,
    });
  }

  async delete(req: Request, res: Response) {
    const fileId = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    await service.deleteFile(fileId);

    res.json({
      success: true,
      message: "File deleted successfully",
    });
  }
}