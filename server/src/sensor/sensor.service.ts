import { Injectable, Inject } from "@nestjs/common";

@Injectable()
export class SensorService {
  constructor(
    // database.provider.ts에서 정의한 이름을 주입받습니다.
    @Inject('DATABASE_CONNECTION') private connection: any 
  ) {}

  async getSensorList() {
    // 1. 직접 SQL 작성
    const sql = `SELECT sensor_id, sensor_code, group_id, type, name, unit, status, is_active
      , DATE_FORMAT(created_at, '%Y-%m-%d %H:%i:%s') as created_at
      , DATE_FORMAT(updated_at, '%Y-%m-%d %H:%i:%s') as updated_at
      FROM sensor
      WHERE is_active = 1`;
    
    // 2. 쿼리 실행 (mysql2/promise는 [결과데이터, 필드정보] 배열을 반환함)
    const [rows] = await this.connection.query(sql);
    
    console.log(rows);
    return rows;
  }
}