import crypto from 'crypto';

// Generate a secret
export function generateSecret(length: number) {
    return crypto.randomBytes(length).toString('hex');
  };