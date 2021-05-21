import { Injectable } from '@nestjs/common';
import * as Sequelize from 'sequelize'; // 引入 Sequelize 库
import sequelize from '../../database/sequelize'; // 引入 Sequelize 实例

@Injectable()
export class TowerService {
  get(): string {
    return 'Hello World!';
  }

  /**
   * 查询该用户是否🈶️记录
   * @param userId 用户名
   */
   async findOne(userId: string): Promise<any | undefined> {
    const sql = `
      SELECT
        id id, score score, floor floor
      FROM
        tower_user_record
      WHERE
        user_id = '${userId}'
    `; // 一段平淡无奇的 SQL 查询语句
    try {
      const record = (
        await sequelize.query(sql, {
          type: Sequelize.QueryTypes.SELECT, // 查询方式
          raw: true, // 是否使用数组组装的方式展示结果
          logging: false, // 是否将 SQL 语句打印到控制台
        })
      )[0];
      // 若查不到用户，则 user === undefined
      return record;
    } catch (error) {
      console.error(error);
      return void 0;
    }
  }

  /**
   * 查询用户记录列表
   * @param {*} body
   * @returns {Promise<any>}
   * @memberof TowerService
   */
  async queryRecordList(body: any): Promise<any> {
    const { pageIndex = 1, pageSize = 10 } = body;
    // 分页查询条件
    const currentIndex = (pageIndex - 1) * pageSize < 0 ? 0 : (pageIndex - 1) * pageSize;
    const queryRecordListSQL = `
      SELECT
        id, user_id userId, score, floor,
        DATE_FORMAT(create_time, '%Y-%m-%d %H:%i:%s') createTime,
        DATE_FORMAT(update_time, '%Y-%m-%d %H:%i:%s') updateTime
      FROM
        tower_user_record
      ORDER BY
        score desc
      LIMIT ${currentIndex}, ${pageSize}
    `;
    const recordList: any[] = await sequelize.query(queryRecordListSQL, {
      type: Sequelize.QueryTypes.SELECT,
      raw: true,
      logging: false,
    });

    // 统计数据条数
    const countRecordListSQL = `
      SELECT
        COUNT(*) AS total
      FROM
        tower_user_record
    `;
    const count: any = (
      await sequelize.query(countRecordListSQL, {
        type: Sequelize.QueryTypes.SELECT,
        raw: true,
        logging: false,
      })
    )[0];

    return {
      code: 200,
      data: {
        recordList,
        total: count.total,
      },
    };
  }

  /**
   * 创建用户记录
   *
   * @param {*} body
   * @param {string} userId
   * @returns {Promise<any>}
   * @memberof TowerService
   */
   async createRecord(body: any, userId: string): Promise<any> {
    const { score, floor } = body;
    // 先查询是否已有记录
    const record = await this.findOne(userId);
    let sql;
    if (record) {
      // 已经有记录, 做更新
      sql = `
        UPDATE
        tower_user_record
        SET
          score = ${score},
          floor = ${floor}
        WHERE
          id = ${record.id}
      `;
    } else {
      // 没有记录，创建
      sql = `
        INSERT INTO tower_user_record
          (user_id, score, floor)
        VALUES
          ('${userId}', '${score}', '${floor}');
      `;
    }
    await sequelize.query(sql, { logging: false });
    return {
      code: 200,
      msg: 'Success',
    };
  }
}
