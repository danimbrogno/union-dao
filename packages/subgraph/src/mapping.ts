import {
  AdminAdded,
  AdminRemoved,
  MemberAdded,
  MemberRemoved,
  UnionCreated,
} from '../generated/UnionFacet/UnionFacet';
import { ProposalCreated } from '../generated/ProposalFacet/ProposalFacet';
import {
  Proposal,
  ProposalMetadata,
  ProposalMetadataOption,
  Union,
  User,
  UserRole,
} from '../generated/schema';
import { ProposalMetadata as ProposalMetadataTemplate } from '../generated/templates';

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
    ProposalMetadataTemplate.create(ev.params.metadataCID);
    proposal.save();
    log.info('handleProposalCreated: proposal saved', []);
  }
  log.info('handleProposalCreated: proposal already exists', []);
}

export function handleProposalMetadata(content: Bytes): void {
  log.info('Enters handleProposalMetadata handler', []);
  const proposalId = dataSource.stringParam();
  const value = json.fromBytes(content).toObject();
  log.info('got data', []);
  if (value) {
    const options = value.get('options');
    if (options && options.kind === JSONValueKind.ARRAY) {
      log.info('got options, is array', []);
      const opts = options.toArray();

      let k = 0;
      for (let k = 0; k < opts.length; k++) {
        const opt = opts[k];
        log.info('got option', []);
        if (opt.kind === JSONValueKind.OBJECT) {
          const valueObj = opt.toObject();
          const optionId = proposalId + '-' + k.toString();
          const optDescription = valueObj.get('description');

          if (optDescription) {
            log.info('got option as object with description', []);
            const option = new ProposalMetadataOption(optionId);
            option.description = optDescription.toString();
            option.proposal = proposalId;
            option.save();
          }
        }
      }
    }

    const description = value.get('description');

    if (description) {
      const proposalMetadata = new ProposalMetadata(proposalId);
      proposalMetadata.description = description.toString() || '';
      proposalMetadata.save();
    }
  }
}
