import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class ApiTokens extends BaseSchema {
  protected tableName = 'api_tokens';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id').primary().notNullable();
      table.bigInteger('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE');
      table.string('name').notNullable();
      table.string('type').notNullable();
      table.string('token', 64).notNullable().unique();
      table.timestamp('expires_at', { useTz: true }).nullable();
      table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now());
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
