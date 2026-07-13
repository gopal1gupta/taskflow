export interface Upload {
  id: string;
  user_id: string;
  file_name: string;
  s3_key: string;
  s3_url: string;
  content_type: string;
  file_size: number;
  created_at: Date;
}

export interface CreateUploadDto {
  user_id: string;
  file_name: string;
  s3_key: string;
  s3_url: string;
  content_type: string;
  file_size: number;
}