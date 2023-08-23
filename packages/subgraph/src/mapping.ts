import {
  AdminAdded,
  AdminRemoved,
  ApplicationApproved,
  ApplicationSubmitted,
  MemberAdded,
  MemberRemoved,
  UnionCreated,
  UserMetadataUpdated,
} from '../generated/UnionFacet/UnionFacet';
import {
  ProposalCreated,
  VoteCast,
} from '../generated/ProposalFacet/ProposalFacet';
import {
  Application,
  Proposal,
  ProposalOption,
  Union,
  User,
  UserRole,
} from '../generated/schema';

import { log, Bytes, BigInt } from '@graphprotocol/graph-ts';

export function handleUnionCreated(ev: UnionCreated): void {
  log.info('Enters handleUnionCreated handler', []);
  log.info('handleUnionCreated: {}', [ev.params.index.toString()]);
  const unionId = ev.params.index;
  let union = Union.load(unionId);

  if (!union) {
    log.info('handleUnionCreated: union not found', []);
    log.info('handleUnionCreated: creating new union', []);
    union = new Union(unionId);

    union.metadata = ev.params.metadataCID;
    union.owner = ev.params.owner;
    union.votingAddress = ev.params.voting;
    union.save();
    log.info('handleUnionCreated: union saved', []);
  }
  log.info('handleUnionCreated: union already exists', []);
}

export function handleMemberAdded(ev: MemberAdded): void {
  log.info('Index = {}, Member = {}', [
    ev.params.index.toHexString(),
    ev.params.member.toHexString(),
  ]);
  const roleId = Bytes.fromHexString(
    ev.params.member.toHex() + ev.params.index.toHex()
  );

  const unionId = ev.params.index;

  let role = UserRole.load(roleId);

  let user = User.load(ev.params.member);

  if (!user) {
    user = new User(ev.params.member);
    user.save();
  }

  if (!role) {
    role = new UserRole(roleId);
    role.union = unionId;
    role.user = Bytes.fromHexString(ev.params.member.toHexString());
    role.isAdmin = false;
    role.isMember = true;
    role.save();
  } else {
    role.isMember = true;
    role.save();
  }
}

export function handleAdminAdded(ev: AdminAdded): void {
  log.info('Index = {}, Admin = {}', [
    ev.params.index.toHexString(),
    ev.params.admin.toHexString(),
  ]);
  const id = Bytes.fromHexString(
    ev.params.admin.toHex() + ev.params.index.toHex()
  );

  const unionId = ev.params.index;

  let role = UserRole.load(id);

  let user = User.load(ev.params.admin);

  if (!user) {
    user = new User(ev.params.admin);
    user.save();
  }

  if (!role) {
    role = new UserRole(id);
    role.union = unionId;
    role.user = Bytes.fromHexString(ev.params.admin.toHexString());
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

  const proposalId = Bytes.fromHexString(
    ev.params.union.toHex() + ev.params.index.toHex()
  );
  let proposal = Proposal.load(proposalId);

  if (!proposal) {
    log.info('handleProposalCreated: proposal not found', []);
    log.info('handleProposalCreated: creating new proposal', []);
    proposal = new Proposal(proposalId);
    proposal.union = ev.params.union;
    proposal.owner = ev.params.owner;
    proposal.numOptions = ev.params.numOptions;
    proposal.metadata = ev.params.metadataCID;

    for (let i = 0; i < ev.params.numOptions; i++) {
      let index = new BigInt(i);
      log.info('Index = {}', [index.toString()]);
      const optionId = Bytes.fromHexString(
        ev.params.union.toHex() +
          ev.params.index.toHex() +
          Bytes.fromBigInt(index).toHex()
      );
      log.info('OptionId = {}', [optionId.toString()]);

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

  const optionId = Bytes.fromHexString(
    ev.params.union.toHex() +
      ev.params.index.toHex() +
      Bytes.fromBigInt(ev.params.option).toHex()
  );

  let option = ProposalOption.load(optionId);

  if (option) {
    log.info('handleVoteCast: proposal option found', []);
    log.info('handleVoteCast: updating proposal vote count', []);
    option.votes = ev.params.numVotes.toI32();
    option.save();
    log.info('handleVoteCast: proposal option saved', []);
  }
}

export function handleApplicationSubmitted(ev: ApplicationSubmitted): void {
  log.info('Enters handleApplicationSubmitted handler', []);
  log.info('handleApplicationSubmitted: {}', [ev.params.index.toString()]);

  const applicationId = Bytes.fromHexString(
    ev.params.member.toHex() + ev.params.index.toHex()
  );

  let application = Application.load(applicationId);

  if (!application) {
    let user = User.load(ev.params.member);
    if (!user) {
      user = new User(ev.params.member);
      user.save();
    }
    const unionId = ev.params.index;
    const application = new Application(applicationId);
    application.union = unionId;
    application.user = ev.params.member;
    application.approved = false;
    application.save();
  }
}

export function handleApplicationApproved(ev: ApplicationApproved): void {
  log.info('Enters handleApplicationApproved handler', []);
  log.info('handleApplicationApproved: {}', [ev.params.index.toString()]);

  const applicationId = Bytes.fromHexString(
    ev.params.member.toHex() + ev.params.index.toHex()
  );

  let application = Application.load(applicationId);

  if (application) {
    log.info('handleApplicationApproved: application found', []);
    log.info('handleApplicationApproved: updating application', []);
    application.approved = true;
    application.save();
    log.info('handleApplicationApproved: application saved', []);
  }
}

export function handleUserMetadataUpdated(ev: UserMetadataUpdated): void {
  let user = User.load(ev.params.member);
  if (!user) {
    user = new User(ev.params.member);
    user.metadata = ev.params.metadataCID;
    user.save();
  } else {
    user.metadata = ev.params.metadataCID;
    user.save();
  }
}
