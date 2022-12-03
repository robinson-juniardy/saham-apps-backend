import fs from "fs";
import path from "path";
import { DataSource } from "typeorm";

export function loadEntities<T extends string>(entity_path: T) {
  const entityPath = fs.readdirSync(entity_path);

  let entities: Array<new (...args: any[]) => any> = [];
  for (let entity of entityPath) {
    entities = entities.concat(require(path.join(entity_path, entity)).default);
  }

  return entities;
}

/**
 * Perform to Connect DataSource object
 */

export class PerformConnection {
  constructor(private dataSource: DataSource) {
    this.connect();
  }

  connect() {
    this.dataSource.initialize().catch((error) => {
      console.error("Error during Data Source initialization", error);
    });
  }
}
