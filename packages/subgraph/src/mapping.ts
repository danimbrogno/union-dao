import {
  AdminAdded,
  AdminRemoved,
  MemberAdded,
  MemberRemoved,
  UnionCreated,
} from '../generated/UnionFacet/UnionFacet';
import {
  ProposalCreated,
  VoteCast,
} from '../generated/ProposalFacet/ProposalFacet';
import {
  Proposal,
  ProposalOption,
  Union,
  User,
  UserRole,
} from '../generated/schema';

import {
  log,
  Bytes,
  dataSource,
  json,
  JSONValueKind,
} from '@graphprotocol/graph-ts';

export function handleUnionCreated(ev: UnionCreated): void {
  log.info('Enters handleUnionCreated handler', []);
  log.info('handleUnionCreated: {}', [ev.params.index.toString()]);
  const unionId = ev.params.index;
  let union = Union.load(unionId);

  if (!union) {
    log.info('handleUnionCreated: union not found', []);
    log.info('handleUnionCreated: creating new union', []);
    union = new Union(unionId);

    union.name = ev.params.name.toString();
    union.description = ev.params.description.toString();
    union.logo = ev.params.logo.toString();
    union.votingAddress = ev.params.voting;
    union.save();
    log.info('handleUnionCreated: union saved', []);
  }
  log.info('handleUnionCreated: union already exists', []);
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

export function handleProposalCreated(ev: ProposalCreated): void {
  log.info('Enters handleProposalCreated handler', []);
  log.info('handleProposalCreated: {}', [ev.params.index.toString()]);
  const proposalId = ev.params.index;
  let proposal = Proposal.load(proposalId);

  if (!proposal) {
    log.info('handleProposalCreated: proposal not found', []);
    log.info('handleProposalCreated: creating new proposal', []);
    proposal = new Proposal(proposalId);
    proposal.union = ev.params.union;
    proposal.numOptions = ev.params.numOptions;
    proposal.metadata = ev.params.metadataCID;

    for (let i = 0; i < ev.params.numOptions; i++) {
      const optionId =
        ev.params.union.toString() +
        '-' +
        ev.params.index.toString() +
        '-' +
        i.toString();

      const option = new ProposalOption(optionId);
      option.votes = 0;
      option.proposal = proposalId;
      option.save();
    }

    proposal.save();
    log.info('handleProposalCreated: proposal saved', []);
  }
  log.info('handleProposalCreated: proposal already exists', []);
}

export function handleVoteCast(ev: VoteCast): void {
  log.info('Enters handleVoteCast handler', []);
  log.info('handleVoteCast: {}', [ev.params.index.toString()]);

  const optionId =
    ev.params.union.toString() +
    '-' +
    ev.params.index.toString() +
    '-' +
    ev.params.option.toString();

  let option = ProposalOption.load(optionId);

  if (option) {
    log.info('handleVoteCast: proposal option found', []);
    log.info('handleVoteCast: updating proposal vote count', []);
    option.votes = ev.params.numVotes.toI32();
    option.save();
    log.info('handleVoteCast: proposal option saved', []);
  }
}
