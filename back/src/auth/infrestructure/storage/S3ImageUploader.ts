// infrastructure/services/S3ImageUploader.ts
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import 'dotenv/config';

export default class S3ImageUploader {
    private s3: S3Client;
    private bucket: string;

    constructor() {
        this.validateEnvironmentVariables();

        this.s3 = new S3Client({
            region: process.env.AWS_REGION!,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
                sessionToken: process.env.AWS_SESSION_TOKEN!, 
            },
        });

        this.bucket = process.env.AWS_S3_BUCKET!;
    }

    private validateEnvironmentVariables(): void {
        const requiredVars = [
            'AWS_REGION',
            'AWS_ACCESS_KEY_ID', 
            'AWS_SECRET_ACCESS_KEY',
            'AWS_SESSION_TOKEN', 
            'AWS_S3_BUCKET'
        ];

        const missing = requiredVars.filter(varName => !process.env[varName]);
        
        if (missing.length > 0) {
            throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
        }
    }

    async upload(buffer: Buffer, originalName: string, mimeType: string, userId: string): Promise<string> {
        try {
            console.log('🔧 Uploading image to S3...');
            console.log('📍 Region:', process.env.AWS_REGION);
            console.log('🪣 Bucket:', this.bucket);
            console.log('🔑 Access Key:', process.env.AWS_ACCESS_KEY_ID?.substring(0, 10) + '...');
            
            const key = `profile-images/${userId}/${uuidv4()}-${originalName}`;
            
            const command = new PutObjectCommand({
                Bucket: this.bucket,
                Key: key,
                Body: buffer,
                ContentType: mimeType,
                ACL: "public-read",
            });

            const result = await this.s3.send(command);
            
            const imageUrl = `https://${this.bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
            
            console.log('✅ Image uploaded successfully:', imageUrl);
            console.log('📋 ETag:', result.ETag);
            
            return imageUrl;
            
        } catch (error) {
            console.error('❌ Error uploading image to S3:', error);
            
            if (error instanceof Error) {
                // Errores comunes y sus soluciones
                if (error.message.includes('InvalidAccessKeyId')) {
                    throw new Error('Invalid AWS credentials. Please check your AWS Academy lab credentials.');
                }
                if (error.message.includes('TokenRefreshRequired')) {
                    throw new Error('AWS session token expired. Please refresh your AWS Academy lab credentials.');
                }
                if (error.message.includes('NoSuchBucket')) {
                    throw new Error(`S3 bucket '${this.bucket}' does not exist or is not accessible.`);
                }
            }
            
            throw new Error(`Failed to upload image: ${error}`);
        }
    }
    async testConnection(): Promise<boolean> {
        try {
            const { ListBucketsCommand } = await import("@aws-sdk/client-s3");
            const command = new ListBucketsCommand({});
            await this.s3.send(command);
            console.log('✅ S3 connection successful');
            return true;
        } catch (error) {
            console.error('❌ S3 connection failed:', error);
            return false;
        }
    }
}