import { join } from 'path';
import { FileSystem } from 'types/fileSystem';

const make = async () => {
  const certDir = join(__dirname, '../../../../../.ini/certs');
  const certFilePath = join(certDir, 'cert.pem');
  const keyFilePath = join(certDir, 'key.pem');

  const [cert, key] = await Promise.all([
    FileSystem.readFile(certFilePath),
    FileSystem.readFile(keyFilePath),
  ]);

  return { cert, key };
};

export { make };
