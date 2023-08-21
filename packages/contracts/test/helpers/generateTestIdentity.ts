import { Identity } from '@semaphore-protocol/identity';
import { Group } from '@semaphore-protocol/group';
import { generateProof, verifyProof } from '@semaphore-protocol/proof';

import fs from 'fs';
import path from 'path';

const main = async () => {
  const identity = new Identity('my-identity');

  const { trapdoor, nullifier, commitment, secret } = identity;

  const group = new Group('0', 20, [commitment]);

  const proof = await generateProof(identity, group, 1, 1, {
    wasmFilePath: path.resolve('./test/helpers/semaphore.wasm'),
    zkeyFilePath: path.resolve('./test/helpers/semaphore.zkey'),
  });

  const res = await verifyProof(proof, 20);

  const { nullifierHash } = proof;

  if (res === false) {
    console.error('proof invalid');
    process.exit(1);
  }

  // monkey patch big int
  (BigInt.prototype as any).toJSON = function () {
    return this.toString();
  };

  fs.writeFileSync(
    path.resolve('./test/helpers/identity.json'),
    JSON.stringify({
      trapdoor,
      nullifier,
      nullifierHash,
      commitment,
      secret,
      signal: proof.signal,
      proof: proof.proof,
    })
  );
};

main().then(() => process.exit(0));
