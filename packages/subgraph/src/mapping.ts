import { UnionCreated } from '../generated/Union/UnionFacet';
import { Union } from '../generated/schema';
import { log } from '@graphprotocol/graph-ts';

export function handleUnionCreated(ev: UnionCreated): void {
  log.info('Enters handleUnionCreated handler', []);
  log.info('handleUnionCreated: {}', [ev.params.name.toString()]);
  let union = Union.load(ev.params.index.toString());

  if (!union) {
    log.info('handleUnionCreated: event not found', []);
    log.info('handleUnionCreated: creating new event', []);
    union = new Union(ev.params.index.toString());
    union.name = ev.params.name.toString();
    union.save();
    log.info('handleUnionCreated: event saved', []);
  }
  log.info('handleUnionCreated: event already exists', []);
}
