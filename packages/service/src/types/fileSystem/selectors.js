import { readFile as readFileFs } from 'fs';
import { promisify } from 'util';

const readFileAsync = promisify(readFileFs);

const readFile = (filePath) => readFileAsync(filePath, { flag: 'r' });

export { readFile };
