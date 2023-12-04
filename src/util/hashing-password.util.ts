import * as crypto from 'crypto';

export function hashWithSHA256(data: string): string {
  const hash = crypto.createHash('sha256');
  hash.update(data);
  return hash.digest('hex');
}
