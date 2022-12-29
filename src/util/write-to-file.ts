import { writeFileSync } from 'fs';
import { join } from 'path';

export function writeToFile(data: unknown, relativePath: string) {
  const path = join(__dirname, relativePath);

  writeFileSync(path, JSON.stringify(data), {
    flag: 'w'
  });
}
