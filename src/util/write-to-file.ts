import { writeFileSync } from 'fs';
import { join } from 'path';

export function writeToFile(data: unknown, fileName: string) {
  const path = join(__dirname, `../../data-files/${fileName}`);

  writeFileSync(path, JSON.stringify(data), {
    flag: 'w'
  });
}
