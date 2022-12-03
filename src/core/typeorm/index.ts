import fs from "fs";
import path from "path";

export function loadEntities<T extends string>(entity_path: T) {
  const entityPath = fs.readdirSync(entity_path);

  let entities: Array<new (...args: any[]) => any> = [];
  for (let entity of entityPath) {
    entities = entities.concat(require(path.join(entity_path, entity)).default);
  }

  return entities;
}
