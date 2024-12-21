import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTransactionsTable1703127015000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "transactions",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()",
                    },
                    {
                        name: "card_number",
                        type: "varchar",
                        length: "255",
                        isNullable: false,
                    },
                    {
                        name: "expiration_date",
                        type: "varchar",
                        length: "7",
                        isNullable: false,
                    },
                    {
                        name: "amount",
                        type: "decimal",
                        precision: 10,
                        scale: 2,
                        isNullable: false,
                    },
                    {
                        name: "merchant_id",
                        type: "varchar",
                        length: "255",
                        isNullable: false,
                    },
                    {
                        name: "status",
                        type: "varchar",
                        length: "50",
                        default: "'pending'",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                        onUpdate: "CURRENT_TIMESTAMP",
                    }
                ],
                indices: [
                    {
                        name: "IDX_MERCHANT",
                        columnNames: ["merchant_id"]
                    },
                    {
                        name: "IDX_STATUS",
                        columnNames: ["status"]
                    }
                ]
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("transactions");
    }
}
