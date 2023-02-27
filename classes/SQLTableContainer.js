import knex from "knex";
import logger from "../loggerConfig.js";

export class SQLTableContainer {
  constructor(options, name, columns) {
    this.knex = knex(options);
    this.name = name;
    this.columns = columns;
  }

  async hasTable() {
    const existTable = await this.knex.schema.hasTable(this.name);
    return existTable;
  }

  async createTable() {
    const existTable = await this.hasTable();
    if (existTable) return;
    return this.knex.schema
      .createTable(this.name, (table) => {
        this.columns.forEach((column) => {
          const { type, name } = column;
          if (type === "increments") table.increments(name);
          if (type === "string") table.string(name);
          if (type === "integer") table.integer(name);
          if (type === "date") table.date(name);
        });
        table.timestamp("created_at").defaultTo(this.knex.fn.now());
      })
      .then(() => {
        console.log(`Table ${this.name} has been created`);
      })
      .catch((err) => {
        logger.error(`error: ${err}`);
      });
  }

  async insertValues(data) {
    const existTable = await this.hasTable();
    if (!existTable) {
      await this.createTable();
    }

    return this.knex(this.name)
      .insert(data)
      .then(() => {
        console.log("Values inserted");
      })
      .catch((err) => {
        logger.error(`error: ${err}`);
      });
  }

  async selectAllData(orderBy = "id") {
    const existTable = await this.hasTable();
    if (!existTable) {
      await this.createTable();
    }
    return this.knex.from(this.name).select("*").orderBy(orderBy, "asc");
  }

  deleteData(filterBy, operator, value) {
    return this.knex
      .from(this.name)
      .where(filterBy, operator, value)
      .del()
      .then(() => console.log("Registry deleted"))
      .catch((err) => {
        logger.error(`error: ${err}`);
      });
  }

  updateData(column, row, valueToUpdate) {
    return this.knex
      .from(this.name)
      .where({ [column]: row })
      .update({ ...valueToUpdate })
      .then(() => console.log("Registry updated"))
      .catch((err) => {
        logger.error(`error: ${err}`);
      });
  }

  async destroyKnex() {
    this.knex.destroy();
  }
}
