import { MigrationInterface, QueryRunner } from "typeorm";

export class EliminandoMailTableUser1795655533523 implements MigrationInterface {
    name = 'EliminandoMailTableUser1795655533523'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "mail"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "mail" character varying NOT NULL`);
    }

}
