import { writeFileSync, readFileSync } from 'fs';

export function createFile(appPackageId: string, appPackageFile) {
  writeFileSync(`data/packages/${appPackageId}`, appPackageFile);
};

export function readFile(appPackageId: string) {
  return readFileSync(`data/packages/${appPackageId}`);
}