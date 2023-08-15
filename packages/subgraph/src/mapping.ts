import {
  AdminAdded,
  AdminRemoved,
  MemberAdded,
  MemberRemoved,
  UnionCreated,
} from '../generated/UnionFacet/UnionFacet';
import { Union, User, UserRole } from '../generated/schema';
import { log, Bytes } from '@graphprotocol/graph-ts';

export function handleUnionCreated(ev: UnionCreated): void {
  log.info('Enters handleUnionCreated handler', []);
  log.info('handleUnionCreated: {}', [ev.params.name.toString()]);
  const unionId = ev.params.index;
  let union = Union.load(unionId);

  if (!union) {
    log.info('handleUnionCreated: event not found', []);
    log.info('handleUnionCreated: creating new event', []);
    union = new Union(unionId);
    union.name = ev.params.name.toString();
    union.description = ev.params.description.toString();
    union.logo = ev.params.logo.toString();
    union.save();
    log.info('handleUnionCreated: event saved', []);
  }
  log.info('handleUnionCreated: event already exists', []);
}

export function handleMemberAdded(ev: MemberAdded): void {
  const id = Bytes.fromHexString(
    ev.params.member.toHex() + ev.params.index.toHex()
  );

  const unionId = ev.params.index;

  let role = UserRole.load(id);

  let user = User.load(ev.params.member);

  if (!user) {
    user = new User(ev.params.member);
    user.name = '';
    user.save();
  }

  if (!role) {
    role = new UserRole(id);
    role.union = unionId;
    role.user = ev.params.member;
    role.isAdmin = false;
    role.isMember = true;
    role.save();
  } else {
    role.isMember = true;
    role.save();
  }
}

export function handleAdminAdded(ev: AdminAdded): void {
  const id = Bytes.fromHexString(
    ev.params.admin.toHex() + ev.params.index.toHex()
  );

  const unionId = ev.params.index;

  let role = UserRole.load(id);

  let user = User.load(ev.params.admin);

  if (!user) {
    user = new User(ev.params.admin);
    user.name = '';
    user.save();
  }

  if (!role) {
    role = new UserRole(id);
    role.union = unionId;
    role.user = ev.params.admin;
    role.isAdmin = true;
    role.isMember = false;
    role.save();
  } else {
    role.isAdmin = true;
    role.save();
  }
}
export function handleMemberRemoved(ev: MemberRemoved): void {
  const id = Bytes.fromHexString(
    ev.params.member.toHex() + ev.params.index.toHex()
  );

  let role = UserRole.load(id);

  if (role) {
    role.isMember = false;
    role.save();
  }
}

export function handleAdminRemoved(ev: AdminRemoved): void {
  const id = Bytes.fromHexString(
    ev.params.admin.toHex() + ev.params.index.toHex()
  );

  let role = UserRole.load(id);

  if (role) {
    role.isAdmin = false;
    role.save();
  }
}
