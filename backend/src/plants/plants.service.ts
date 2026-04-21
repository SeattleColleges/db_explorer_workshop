import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class PlantsService implements OnModuleInit {
  private readonly logger = new Logger(PlantsService.name);
  private pool: Pool | null = null;

  constructor() {
    const url = process.env.DATABASE_URL;
    if (!url) {
      this.logger.warn('DATABASE_URL is not set');
      return;
    }
    // SSL required for Supabase hosted PostgreSQL.
    this.pool = new Pool({ connectionString: url, ssl: { rejectUnauthorized: false } });
  }

  // Test the connection as soon as the module loads so misconfiguration is
  // caught at startup rather than on the first incoming request.
  async onModuleInit() {
    if (!this.pool) return;
    try {
      const client = await this.pool.connect();
      client.release();
      this.logger.log('Database connected');
    } catch (err: any) {
      this.logger.error(`Database connection failed: ${err.message}`);
    }
  }

  async findAll() {
    if (!this.pool) {
      return { configured: false, reason: 'missing_env' };
    }
    const tableName = process.env.TABLE_NAME || 'plants';
    try {
      const result = await this.pool.query(
        `SELECT * FROM ${tableName} ORDER BY 1`,
      );
      return { configured: true, tableName, plants: result.rows };
    } catch (error: any) {
      this.logger.error(`Query failed: ${error.message}`);
      return { configured: false, reason: 'db_error', message: error.message };
    }
  }
}
