// @ts-nocheck
import { GraphQLResolveInfo, SelectionSetNode, FieldNode, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { gql } from '@graphql-mesh/utils';

import type { GetMeshOptions } from '@graphql-mesh/runtime';
import type { YamlConfig } from '@graphql-mesh/types';
import { PubSub } from '@graphql-mesh/utils';
import { DefaultLogger } from '@graphql-mesh/utils';
import MeshCache from "@graphql-mesh/cache-localforage";
import { fetch as fetchFn } from '@whatwg-node/fetch';

import { MeshResolvedSource } from '@graphql-mesh/runtime';
import { MeshTransform, MeshPlugin } from '@graphql-mesh/types';
import GraphqlHandler from "@graphql-mesh/graphql"
import UsePollingLive from "@graphprotocol/client-polling-live";
import BareMerger from "@graphql-mesh/merger-bare";
import { printWithCache } from '@graphql-mesh/utils';
import { createMeshHTTPHandler, MeshHTTPHandler } from '@graphql-mesh/http';
import { getMesh, ExecuteMeshFn, SubscribeMeshFn, MeshContext as BaseMeshContext, MeshInstance } from '@graphql-mesh/runtime';
import { MeshStore, FsStoreStorageAdapter } from '@graphql-mesh/store';
import { path as pathModule } from '@graphql-mesh/cross-helpers';
import { ImportFn } from '@graphql-mesh/types';
import type { UnionTypes } from './sources/union/types';
import * as importedModule$0 from "./sources/union/introspectionSchema";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };



/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigDecimal: any;
  BigInt: any;
  Bytes: any;
};

export type Application = {
  id: Scalars['Bytes'];
  union: Union;
  user: User;
  approved: Scalars['Boolean'];
};

export type Application_filter = {
  id?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  union?: InputMaybe<Scalars['String']>;
  union_not?: InputMaybe<Scalars['String']>;
  union_gt?: InputMaybe<Scalars['String']>;
  union_lt?: InputMaybe<Scalars['String']>;
  union_gte?: InputMaybe<Scalars['String']>;
  union_lte?: InputMaybe<Scalars['String']>;
  union_in?: InputMaybe<Array<Scalars['String']>>;
  union_not_in?: InputMaybe<Array<Scalars['String']>>;
  union_contains?: InputMaybe<Scalars['String']>;
  union_contains_nocase?: InputMaybe<Scalars['String']>;
  union_not_contains?: InputMaybe<Scalars['String']>;
  union_not_contains_nocase?: InputMaybe<Scalars['String']>;
  union_starts_with?: InputMaybe<Scalars['String']>;
  union_starts_with_nocase?: InputMaybe<Scalars['String']>;
  union_not_starts_with?: InputMaybe<Scalars['String']>;
  union_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  union_ends_with?: InputMaybe<Scalars['String']>;
  union_ends_with_nocase?: InputMaybe<Scalars['String']>;
  union_not_ends_with?: InputMaybe<Scalars['String']>;
  union_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  union_?: InputMaybe<Union_filter>;
  user?: InputMaybe<Scalars['String']>;
  user_not?: InputMaybe<Scalars['String']>;
  user_gt?: InputMaybe<Scalars['String']>;
  user_lt?: InputMaybe<Scalars['String']>;
  user_gte?: InputMaybe<Scalars['String']>;
  user_lte?: InputMaybe<Scalars['String']>;
  user_in?: InputMaybe<Array<Scalars['String']>>;
  user_not_in?: InputMaybe<Array<Scalars['String']>>;
  user_contains?: InputMaybe<Scalars['String']>;
  user_contains_nocase?: InputMaybe<Scalars['String']>;
  user_not_contains?: InputMaybe<Scalars['String']>;
  user_not_contains_nocase?: InputMaybe<Scalars['String']>;
  user_starts_with?: InputMaybe<Scalars['String']>;
  user_starts_with_nocase?: InputMaybe<Scalars['String']>;
  user_not_starts_with?: InputMaybe<Scalars['String']>;
  user_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  user_ends_with?: InputMaybe<Scalars['String']>;
  user_ends_with_nocase?: InputMaybe<Scalars['String']>;
  user_not_ends_with?: InputMaybe<Scalars['String']>;
  user_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  user_?: InputMaybe<User_filter>;
  approved?: InputMaybe<Scalars['Boolean']>;
  approved_not?: InputMaybe<Scalars['Boolean']>;
  approved_in?: InputMaybe<Array<Scalars['Boolean']>>;
  approved_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Application_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Application_filter>>>;
};

export type Application_orderBy =
  | 'id'
  | 'union'
  | 'union__id'
  | 'union__name'
  | 'union__logo'
  | 'union__description'
  | 'union__votingAddress'
  | 'user'
  | 'user__id'
  | 'user__metadata'
  | 'approved';

export type BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type Block_height = {
  hash?: InputMaybe<Scalars['Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

/** Defines the order direction, either ascending or descending */
export type OrderDirection =
  | 'asc'
  | 'desc';

export type Proposal = {
  id: Scalars['Bytes'];
  union: Union;
  numOptions: Scalars['Int'];
  metadata: Scalars['String'];
  options: Array<ProposalOption>;
};


export type ProposaloptionsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ProposalOption_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ProposalOption_filter>;
};

export type ProposalOption = {
  id: Scalars['String'];
  proposal: Proposal;
  votes: Scalars['Int'];
};

export type ProposalOption_filter = {
  id?: InputMaybe<Scalars['String']>;
  id_not?: InputMaybe<Scalars['String']>;
  id_gt?: InputMaybe<Scalars['String']>;
  id_lt?: InputMaybe<Scalars['String']>;
  id_gte?: InputMaybe<Scalars['String']>;
  id_lte?: InputMaybe<Scalars['String']>;
  id_in?: InputMaybe<Array<Scalars['String']>>;
  id_not_in?: InputMaybe<Array<Scalars['String']>>;
  id_contains?: InputMaybe<Scalars['String']>;
  id_contains_nocase?: InputMaybe<Scalars['String']>;
  id_not_contains?: InputMaybe<Scalars['String']>;
  id_not_contains_nocase?: InputMaybe<Scalars['String']>;
  id_starts_with?: InputMaybe<Scalars['String']>;
  id_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id_not_starts_with?: InputMaybe<Scalars['String']>;
  id_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id_ends_with?: InputMaybe<Scalars['String']>;
  id_ends_with_nocase?: InputMaybe<Scalars['String']>;
  id_not_ends_with?: InputMaybe<Scalars['String']>;
  id_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  proposal?: InputMaybe<Scalars['String']>;
  proposal_not?: InputMaybe<Scalars['String']>;
  proposal_gt?: InputMaybe<Scalars['String']>;
  proposal_lt?: InputMaybe<Scalars['String']>;
  proposal_gte?: InputMaybe<Scalars['String']>;
  proposal_lte?: InputMaybe<Scalars['String']>;
  proposal_in?: InputMaybe<Array<Scalars['String']>>;
  proposal_not_in?: InputMaybe<Array<Scalars['String']>>;
  proposal_contains?: InputMaybe<Scalars['String']>;
  proposal_contains_nocase?: InputMaybe<Scalars['String']>;
  proposal_not_contains?: InputMaybe<Scalars['String']>;
  proposal_not_contains_nocase?: InputMaybe<Scalars['String']>;
  proposal_starts_with?: InputMaybe<Scalars['String']>;
  proposal_starts_with_nocase?: InputMaybe<Scalars['String']>;
  proposal_not_starts_with?: InputMaybe<Scalars['String']>;
  proposal_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  proposal_ends_with?: InputMaybe<Scalars['String']>;
  proposal_ends_with_nocase?: InputMaybe<Scalars['String']>;
  proposal_not_ends_with?: InputMaybe<Scalars['String']>;
  proposal_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  proposal_?: InputMaybe<Proposal_filter>;
  votes?: InputMaybe<Scalars['Int']>;
  votes_not?: InputMaybe<Scalars['Int']>;
  votes_gt?: InputMaybe<Scalars['Int']>;
  votes_lt?: InputMaybe<Scalars['Int']>;
  votes_gte?: InputMaybe<Scalars['Int']>;
  votes_lte?: InputMaybe<Scalars['Int']>;
  votes_in?: InputMaybe<Array<Scalars['Int']>>;
  votes_not_in?: InputMaybe<Array<Scalars['Int']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<ProposalOption_filter>>>;
  or?: InputMaybe<Array<InputMaybe<ProposalOption_filter>>>;
};

export type ProposalOption_orderBy =
  | 'id'
  | 'proposal'
  | 'proposal__id'
  | 'proposal__numOptions'
  | 'proposal__metadata'
  | 'votes';

export type Proposal_filter = {
  id?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  union?: InputMaybe<Scalars['String']>;
  union_not?: InputMaybe<Scalars['String']>;
  union_gt?: InputMaybe<Scalars['String']>;
  union_lt?: InputMaybe<Scalars['String']>;
  union_gte?: InputMaybe<Scalars['String']>;
  union_lte?: InputMaybe<Scalars['String']>;
  union_in?: InputMaybe<Array<Scalars['String']>>;
  union_not_in?: InputMaybe<Array<Scalars['String']>>;
  union_contains?: InputMaybe<Scalars['String']>;
  union_contains_nocase?: InputMaybe<Scalars['String']>;
  union_not_contains?: InputMaybe<Scalars['String']>;
  union_not_contains_nocase?: InputMaybe<Scalars['String']>;
  union_starts_with?: InputMaybe<Scalars['String']>;
  union_starts_with_nocase?: InputMaybe<Scalars['String']>;
  union_not_starts_with?: InputMaybe<Scalars['String']>;
  union_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  union_ends_with?: InputMaybe<Scalars['String']>;
  union_ends_with_nocase?: InputMaybe<Scalars['String']>;
  union_not_ends_with?: InputMaybe<Scalars['String']>;
  union_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  union_?: InputMaybe<Union_filter>;
  numOptions?: InputMaybe<Scalars['Int']>;
  numOptions_not?: InputMaybe<Scalars['Int']>;
  numOptions_gt?: InputMaybe<Scalars['Int']>;
  numOptions_lt?: InputMaybe<Scalars['Int']>;
  numOptions_gte?: InputMaybe<Scalars['Int']>;
  numOptions_lte?: InputMaybe<Scalars['Int']>;
  numOptions_in?: InputMaybe<Array<Scalars['Int']>>;
  numOptions_not_in?: InputMaybe<Array<Scalars['Int']>>;
  metadata?: InputMaybe<Scalars['String']>;
  metadata_not?: InputMaybe<Scalars['String']>;
  metadata_gt?: InputMaybe<Scalars['String']>;
  metadata_lt?: InputMaybe<Scalars['String']>;
  metadata_gte?: InputMaybe<Scalars['String']>;
  metadata_lte?: InputMaybe<Scalars['String']>;
  metadata_in?: InputMaybe<Array<Scalars['String']>>;
  metadata_not_in?: InputMaybe<Array<Scalars['String']>>;
  metadata_contains?: InputMaybe<Scalars['String']>;
  metadata_contains_nocase?: InputMaybe<Scalars['String']>;
  metadata_not_contains?: InputMaybe<Scalars['String']>;
  metadata_not_contains_nocase?: InputMaybe<Scalars['String']>;
  metadata_starts_with?: InputMaybe<Scalars['String']>;
  metadata_starts_with_nocase?: InputMaybe<Scalars['String']>;
  metadata_not_starts_with?: InputMaybe<Scalars['String']>;
  metadata_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  metadata_ends_with?: InputMaybe<Scalars['String']>;
  metadata_ends_with_nocase?: InputMaybe<Scalars['String']>;
  metadata_not_ends_with?: InputMaybe<Scalars['String']>;
  metadata_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  options_?: InputMaybe<ProposalOption_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Proposal_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Proposal_filter>>>;
};

export type Proposal_orderBy =
  | 'id'
  | 'union'
  | 'union__id'
  | 'union__name'
  | 'union__logo'
  | 'union__description'
  | 'union__votingAddress'
  | 'numOptions'
  | 'metadata'
  | 'options';

export type Query = {
  union?: Maybe<Union>;
  unions: Array<Union>;
  application?: Maybe<Application>;
  applications: Array<Application>;
  userRole?: Maybe<UserRole>;
  userRoles: Array<UserRole>;
  user?: Maybe<User>;
  users: Array<User>;
  proposal?: Maybe<Proposal>;
  proposals: Array<Proposal>;
  proposalOption?: Maybe<ProposalOption>;
  proposalOptions: Array<ProposalOption>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type QueryunionArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryunionsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Union_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Union_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryapplicationArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryapplicationsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Application_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Application_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryuserRoleArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryuserRolesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserRole_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<UserRole_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryuserArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryusersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<User_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<User_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryproposalArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryproposalsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Proposal_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Proposal_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryproposalOptionArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryproposalOptionsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ProposalOption_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ProposalOption_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Query_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type Subscription = {
  union?: Maybe<Union>;
  unions: Array<Union>;
  application?: Maybe<Application>;
  applications: Array<Application>;
  userRole?: Maybe<UserRole>;
  userRoles: Array<UserRole>;
  user?: Maybe<User>;
  users: Array<User>;
  proposal?: Maybe<Proposal>;
  proposals: Array<Proposal>;
  proposalOption?: Maybe<ProposalOption>;
  proposalOptions: Array<ProposalOption>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type SubscriptionunionArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionunionsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Union_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Union_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionapplicationArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionapplicationsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Application_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Application_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionuserRoleArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionuserRolesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserRole_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<UserRole_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionuserArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionusersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<User_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<User_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionproposalArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionproposalsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Proposal_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Proposal_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionproposalOptionArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionproposalOptionsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ProposalOption_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ProposalOption_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscription_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type Union = {
  id: Scalars['Bytes'];
  name: Scalars['String'];
  logo: Scalars['String'];
  description: Scalars['String'];
  votingAddress: Scalars['Bytes'];
  pendingApplications: Array<Application>;
  users: Array<UserRole>;
  proposals: Array<Proposal>;
};


export type UnionpendingApplicationsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Application_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Application_filter>;
};


export type UnionusersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserRole_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<UserRole_filter>;
};


export type UnionproposalsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Proposal_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Proposal_filter>;
};

export type Union_filter = {
  id?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  name?: InputMaybe<Scalars['String']>;
  name_not?: InputMaybe<Scalars['String']>;
  name_gt?: InputMaybe<Scalars['String']>;
  name_lt?: InputMaybe<Scalars['String']>;
  name_gte?: InputMaybe<Scalars['String']>;
  name_lte?: InputMaybe<Scalars['String']>;
  name_in?: InputMaybe<Array<Scalars['String']>>;
  name_not_in?: InputMaybe<Array<Scalars['String']>>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_contains_nocase?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_not_contains_nocase?: InputMaybe<Scalars['String']>;
  name_starts_with?: InputMaybe<Scalars['String']>;
  name_starts_with_nocase?: InputMaybe<Scalars['String']>;
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  name_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  name_ends_with?: InputMaybe<Scalars['String']>;
  name_ends_with_nocase?: InputMaybe<Scalars['String']>;
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  name_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  logo?: InputMaybe<Scalars['String']>;
  logo_not?: InputMaybe<Scalars['String']>;
  logo_gt?: InputMaybe<Scalars['String']>;
  logo_lt?: InputMaybe<Scalars['String']>;
  logo_gte?: InputMaybe<Scalars['String']>;
  logo_lte?: InputMaybe<Scalars['String']>;
  logo_in?: InputMaybe<Array<Scalars['String']>>;
  logo_not_in?: InputMaybe<Array<Scalars['String']>>;
  logo_contains?: InputMaybe<Scalars['String']>;
  logo_contains_nocase?: InputMaybe<Scalars['String']>;
  logo_not_contains?: InputMaybe<Scalars['String']>;
  logo_not_contains_nocase?: InputMaybe<Scalars['String']>;
  logo_starts_with?: InputMaybe<Scalars['String']>;
  logo_starts_with_nocase?: InputMaybe<Scalars['String']>;
  logo_not_starts_with?: InputMaybe<Scalars['String']>;
  logo_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  logo_ends_with?: InputMaybe<Scalars['String']>;
  logo_ends_with_nocase?: InputMaybe<Scalars['String']>;
  logo_not_ends_with?: InputMaybe<Scalars['String']>;
  logo_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  description_not?: InputMaybe<Scalars['String']>;
  description_gt?: InputMaybe<Scalars['String']>;
  description_lt?: InputMaybe<Scalars['String']>;
  description_gte?: InputMaybe<Scalars['String']>;
  description_lte?: InputMaybe<Scalars['String']>;
  description_in?: InputMaybe<Array<Scalars['String']>>;
  description_not_in?: InputMaybe<Array<Scalars['String']>>;
  description_contains?: InputMaybe<Scalars['String']>;
  description_contains_nocase?: InputMaybe<Scalars['String']>;
  description_not_contains?: InputMaybe<Scalars['String']>;
  description_not_contains_nocase?: InputMaybe<Scalars['String']>;
  description_starts_with?: InputMaybe<Scalars['String']>;
  description_starts_with_nocase?: InputMaybe<Scalars['String']>;
  description_not_starts_with?: InputMaybe<Scalars['String']>;
  description_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  description_ends_with?: InputMaybe<Scalars['String']>;
  description_ends_with_nocase?: InputMaybe<Scalars['String']>;
  description_not_ends_with?: InputMaybe<Scalars['String']>;
  description_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  votingAddress?: InputMaybe<Scalars['Bytes']>;
  votingAddress_not?: InputMaybe<Scalars['Bytes']>;
  votingAddress_gt?: InputMaybe<Scalars['Bytes']>;
  votingAddress_lt?: InputMaybe<Scalars['Bytes']>;
  votingAddress_gte?: InputMaybe<Scalars['Bytes']>;
  votingAddress_lte?: InputMaybe<Scalars['Bytes']>;
  votingAddress_in?: InputMaybe<Array<Scalars['Bytes']>>;
  votingAddress_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  votingAddress_contains?: InputMaybe<Scalars['Bytes']>;
  votingAddress_not_contains?: InputMaybe<Scalars['Bytes']>;
  pendingApplications_?: InputMaybe<Application_filter>;
  users_?: InputMaybe<UserRole_filter>;
  proposals_?: InputMaybe<Proposal_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Union_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Union_filter>>>;
};

export type Union_orderBy =
  | 'id'
  | 'name'
  | 'logo'
  | 'description'
  | 'votingAddress'
  | 'pendingApplications'
  | 'users'
  | 'proposals';

export type User = {
  id: Scalars['Bytes'];
  metadata?: Maybe<Scalars['String']>;
  roles: Array<UserRole>;
};


export type UserrolesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserRole_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<UserRole_filter>;
};

export type UserRole = {
  id: Scalars['Bytes'];
  union: Union;
  user: User;
  isMember: Scalars['Boolean'];
  isAdmin: Scalars['Boolean'];
};

export type UserRole_filter = {
  id?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  union?: InputMaybe<Scalars['String']>;
  union_not?: InputMaybe<Scalars['String']>;
  union_gt?: InputMaybe<Scalars['String']>;
  union_lt?: InputMaybe<Scalars['String']>;
  union_gte?: InputMaybe<Scalars['String']>;
  union_lte?: InputMaybe<Scalars['String']>;
  union_in?: InputMaybe<Array<Scalars['String']>>;
  union_not_in?: InputMaybe<Array<Scalars['String']>>;
  union_contains?: InputMaybe<Scalars['String']>;
  union_contains_nocase?: InputMaybe<Scalars['String']>;
  union_not_contains?: InputMaybe<Scalars['String']>;
  union_not_contains_nocase?: InputMaybe<Scalars['String']>;
  union_starts_with?: InputMaybe<Scalars['String']>;
  union_starts_with_nocase?: InputMaybe<Scalars['String']>;
  union_not_starts_with?: InputMaybe<Scalars['String']>;
  union_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  union_ends_with?: InputMaybe<Scalars['String']>;
  union_ends_with_nocase?: InputMaybe<Scalars['String']>;
  union_not_ends_with?: InputMaybe<Scalars['String']>;
  union_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  union_?: InputMaybe<Union_filter>;
  user?: InputMaybe<Scalars['String']>;
  user_not?: InputMaybe<Scalars['String']>;
  user_gt?: InputMaybe<Scalars['String']>;
  user_lt?: InputMaybe<Scalars['String']>;
  user_gte?: InputMaybe<Scalars['String']>;
  user_lte?: InputMaybe<Scalars['String']>;
  user_in?: InputMaybe<Array<Scalars['String']>>;
  user_not_in?: InputMaybe<Array<Scalars['String']>>;
  user_contains?: InputMaybe<Scalars['String']>;
  user_contains_nocase?: InputMaybe<Scalars['String']>;
  user_not_contains?: InputMaybe<Scalars['String']>;
  user_not_contains_nocase?: InputMaybe<Scalars['String']>;
  user_starts_with?: InputMaybe<Scalars['String']>;
  user_starts_with_nocase?: InputMaybe<Scalars['String']>;
  user_not_starts_with?: InputMaybe<Scalars['String']>;
  user_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  user_ends_with?: InputMaybe<Scalars['String']>;
  user_ends_with_nocase?: InputMaybe<Scalars['String']>;
  user_not_ends_with?: InputMaybe<Scalars['String']>;
  user_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  user_?: InputMaybe<User_filter>;
  isMember?: InputMaybe<Scalars['Boolean']>;
  isMember_not?: InputMaybe<Scalars['Boolean']>;
  isMember_in?: InputMaybe<Array<Scalars['Boolean']>>;
  isMember_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  isAdmin?: InputMaybe<Scalars['Boolean']>;
  isAdmin_not?: InputMaybe<Scalars['Boolean']>;
  isAdmin_in?: InputMaybe<Array<Scalars['Boolean']>>;
  isAdmin_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<UserRole_filter>>>;
  or?: InputMaybe<Array<InputMaybe<UserRole_filter>>>;
};

export type UserRole_orderBy =
  | 'id'
  | 'union'
  | 'union__id'
  | 'union__name'
  | 'union__logo'
  | 'union__description'
  | 'union__votingAddress'
  | 'user'
  | 'user__id'
  | 'user__metadata'
  | 'isMember'
  | 'isAdmin';

export type User_filter = {
  id?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  metadata?: InputMaybe<Scalars['String']>;
  metadata_not?: InputMaybe<Scalars['String']>;
  metadata_gt?: InputMaybe<Scalars['String']>;
  metadata_lt?: InputMaybe<Scalars['String']>;
  metadata_gte?: InputMaybe<Scalars['String']>;
  metadata_lte?: InputMaybe<Scalars['String']>;
  metadata_in?: InputMaybe<Array<Scalars['String']>>;
  metadata_not_in?: InputMaybe<Array<Scalars['String']>>;
  metadata_contains?: InputMaybe<Scalars['String']>;
  metadata_contains_nocase?: InputMaybe<Scalars['String']>;
  metadata_not_contains?: InputMaybe<Scalars['String']>;
  metadata_not_contains_nocase?: InputMaybe<Scalars['String']>;
  metadata_starts_with?: InputMaybe<Scalars['String']>;
  metadata_starts_with_nocase?: InputMaybe<Scalars['String']>;
  metadata_not_starts_with?: InputMaybe<Scalars['String']>;
  metadata_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  metadata_ends_with?: InputMaybe<Scalars['String']>;
  metadata_ends_with_nocase?: InputMaybe<Scalars['String']>;
  metadata_not_ends_with?: InputMaybe<Scalars['String']>;
  metadata_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  roles_?: InputMaybe<UserRole_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<User_filter>>>;
  or?: InputMaybe<Array<InputMaybe<User_filter>>>;
};

export type User_orderBy =
  | 'id'
  | 'metadata'
  | 'roles';

export type _Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean'];
};

export type _SubgraphErrorPolicy_ =
  /** Data will be returned even if the subgraph has indexing errors */
  | 'allow'
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  | 'deny';

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string | ((fieldNode: FieldNode) => SelectionSetNode);
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Application: ResolverTypeWrapper<Application>;
  Application_filter: Application_filter;
  Application_orderBy: Application_orderBy;
  BigDecimal: ResolverTypeWrapper<Scalars['BigDecimal']>;
  BigInt: ResolverTypeWrapper<Scalars['BigInt']>;
  BlockChangedFilter: BlockChangedFilter;
  Block_height: Block_height;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Bytes: ResolverTypeWrapper<Scalars['Bytes']>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  OrderDirection: OrderDirection;
  Proposal: ResolverTypeWrapper<Proposal>;
  ProposalOption: ResolverTypeWrapper<ProposalOption>;
  ProposalOption_filter: ProposalOption_filter;
  ProposalOption_orderBy: ProposalOption_orderBy;
  Proposal_filter: Proposal_filter;
  Proposal_orderBy: Proposal_orderBy;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Subscription: ResolverTypeWrapper<{}>;
  Union: ResolverTypeWrapper<Union>;
  Union_filter: Union_filter;
  Union_orderBy: Union_orderBy;
  User: ResolverTypeWrapper<User>;
  UserRole: ResolverTypeWrapper<UserRole>;
  UserRole_filter: UserRole_filter;
  UserRole_orderBy: UserRole_orderBy;
  User_filter: User_filter;
  User_orderBy: User_orderBy;
  _Block_: ResolverTypeWrapper<_Block_>;
  _Meta_: ResolverTypeWrapper<_Meta_>;
  _SubgraphErrorPolicy_: _SubgraphErrorPolicy_;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Application: Application;
  Application_filter: Application_filter;
  BigDecimal: Scalars['BigDecimal'];
  BigInt: Scalars['BigInt'];
  BlockChangedFilter: BlockChangedFilter;
  Block_height: Block_height;
  Boolean: Scalars['Boolean'];
  Bytes: Scalars['Bytes'];
  Float: Scalars['Float'];
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  Proposal: Proposal;
  ProposalOption: ProposalOption;
  ProposalOption_filter: ProposalOption_filter;
  Proposal_filter: Proposal_filter;
  Query: {};
  String: Scalars['String'];
  Subscription: {};
  Union: Union;
  Union_filter: Union_filter;
  User: User;
  UserRole: UserRole;
  UserRole_filter: UserRole_filter;
  User_filter: User_filter;
  _Block_: _Block_;
  _Meta_: _Meta_;
}>;

export type entityDirectiveArgs = { };

export type entityDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = entityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type subgraphIdDirectiveArgs = {
  id: Scalars['String'];
};

export type subgraphIdDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = subgraphIdDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type derivedFromDirectiveArgs = {
  field: Scalars['String'];
};

export type derivedFromDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = derivedFromDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type ApplicationResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Application'] = ResolversParentTypes['Application']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  union?: Resolver<ResolversTypes['Union'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  approved?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface BigDecimalScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigDecimal'], any> {
  name: 'BigDecimal';
}

export interface BigIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
  name: 'BigInt';
}

export interface BytesScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Bytes'], any> {
  name: 'Bytes';
}

export type ProposalResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Proposal'] = ResolversParentTypes['Proposal']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  union?: Resolver<ResolversTypes['Union'], ParentType, ContextType>;
  numOptions?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  metadata?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  options?: Resolver<Array<ResolversTypes['ProposalOption']>, ParentType, ContextType, RequireFields<ProposaloptionsArgs, 'skip' | 'first'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProposalOptionResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['ProposalOption'] = ResolversParentTypes['ProposalOption']> = ResolversObject<{
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  proposal?: Resolver<ResolversTypes['Proposal'], ParentType, ContextType>;
  votes?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  union?: Resolver<Maybe<ResolversTypes['Union']>, ParentType, ContextType, RequireFields<QueryunionArgs, 'id' | 'subgraphError'>>;
  unions?: Resolver<Array<ResolversTypes['Union']>, ParentType, ContextType, RequireFields<QueryunionsArgs, 'skip' | 'first' | 'subgraphError'>>;
  application?: Resolver<Maybe<ResolversTypes['Application']>, ParentType, ContextType, RequireFields<QueryapplicationArgs, 'id' | 'subgraphError'>>;
  applications?: Resolver<Array<ResolversTypes['Application']>, ParentType, ContextType, RequireFields<QueryapplicationsArgs, 'skip' | 'first' | 'subgraphError'>>;
  userRole?: Resolver<Maybe<ResolversTypes['UserRole']>, ParentType, ContextType, RequireFields<QueryuserRoleArgs, 'id' | 'subgraphError'>>;
  userRoles?: Resolver<Array<ResolversTypes['UserRole']>, ParentType, ContextType, RequireFields<QueryuserRolesArgs, 'skip' | 'first' | 'subgraphError'>>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryuserArgs, 'id' | 'subgraphError'>>;
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryusersArgs, 'skip' | 'first' | 'subgraphError'>>;
  proposal?: Resolver<Maybe<ResolversTypes['Proposal']>, ParentType, ContextType, RequireFields<QueryproposalArgs, 'id' | 'subgraphError'>>;
  proposals?: Resolver<Array<ResolversTypes['Proposal']>, ParentType, ContextType, RequireFields<QueryproposalsArgs, 'skip' | 'first' | 'subgraphError'>>;
  proposalOption?: Resolver<Maybe<ResolversTypes['ProposalOption']>, ParentType, ContextType, RequireFields<QueryproposalOptionArgs, 'id' | 'subgraphError'>>;
  proposalOptions?: Resolver<Array<ResolversTypes['ProposalOption']>, ParentType, ContextType, RequireFields<QueryproposalOptionsArgs, 'skip' | 'first' | 'subgraphError'>>;
  _meta?: Resolver<Maybe<ResolversTypes['_Meta_']>, ParentType, ContextType, Partial<Query_metaArgs>>;
}>;

export type SubscriptionResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = ResolversObject<{
  union?: SubscriptionResolver<Maybe<ResolversTypes['Union']>, "union", ParentType, ContextType, RequireFields<SubscriptionunionArgs, 'id' | 'subgraphError'>>;
  unions?: SubscriptionResolver<Array<ResolversTypes['Union']>, "unions", ParentType, ContextType, RequireFields<SubscriptionunionsArgs, 'skip' | 'first' | 'subgraphError'>>;
  application?: SubscriptionResolver<Maybe<ResolversTypes['Application']>, "application", ParentType, ContextType, RequireFields<SubscriptionapplicationArgs, 'id' | 'subgraphError'>>;
  applications?: SubscriptionResolver<Array<ResolversTypes['Application']>, "applications", ParentType, ContextType, RequireFields<SubscriptionapplicationsArgs, 'skip' | 'first' | 'subgraphError'>>;
  userRole?: SubscriptionResolver<Maybe<ResolversTypes['UserRole']>, "userRole", ParentType, ContextType, RequireFields<SubscriptionuserRoleArgs, 'id' | 'subgraphError'>>;
  userRoles?: SubscriptionResolver<Array<ResolversTypes['UserRole']>, "userRoles", ParentType, ContextType, RequireFields<SubscriptionuserRolesArgs, 'skip' | 'first' | 'subgraphError'>>;
  user?: SubscriptionResolver<Maybe<ResolversTypes['User']>, "user", ParentType, ContextType, RequireFields<SubscriptionuserArgs, 'id' | 'subgraphError'>>;
  users?: SubscriptionResolver<Array<ResolversTypes['User']>, "users", ParentType, ContextType, RequireFields<SubscriptionusersArgs, 'skip' | 'first' | 'subgraphError'>>;
  proposal?: SubscriptionResolver<Maybe<ResolversTypes['Proposal']>, "proposal", ParentType, ContextType, RequireFields<SubscriptionproposalArgs, 'id' | 'subgraphError'>>;
  proposals?: SubscriptionResolver<Array<ResolversTypes['Proposal']>, "proposals", ParentType, ContextType, RequireFields<SubscriptionproposalsArgs, 'skip' | 'first' | 'subgraphError'>>;
  proposalOption?: SubscriptionResolver<Maybe<ResolversTypes['ProposalOption']>, "proposalOption", ParentType, ContextType, RequireFields<SubscriptionproposalOptionArgs, 'id' | 'subgraphError'>>;
  proposalOptions?: SubscriptionResolver<Array<ResolversTypes['ProposalOption']>, "proposalOptions", ParentType, ContextType, RequireFields<SubscriptionproposalOptionsArgs, 'skip' | 'first' | 'subgraphError'>>;
  _meta?: SubscriptionResolver<Maybe<ResolversTypes['_Meta_']>, "_meta", ParentType, ContextType, Partial<Subscription_metaArgs>>;
}>;

export type UnionResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Union'] = ResolversParentTypes['Union']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  logo?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  votingAddress?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  pendingApplications?: Resolver<Array<ResolversTypes['Application']>, ParentType, ContextType, RequireFields<UnionpendingApplicationsArgs, 'skip' | 'first'>>;
  users?: Resolver<Array<ResolversTypes['UserRole']>, ParentType, ContextType, RequireFields<UnionusersArgs, 'skip' | 'first'>>;
  proposals?: Resolver<Array<ResolversTypes['Proposal']>, ParentType, ContextType, RequireFields<UnionproposalsArgs, 'skip' | 'first'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  metadata?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  roles?: Resolver<Array<ResolversTypes['UserRole']>, ParentType, ContextType, RequireFields<UserrolesArgs, 'skip' | 'first'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserRoleResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['UserRole'] = ResolversParentTypes['UserRole']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  union?: Resolver<ResolversTypes['Union'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  isMember?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isAdmin?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type _Block_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['_Block_'] = ResolversParentTypes['_Block_']> = ResolversObject<{
  hash?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  number?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  timestamp?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type _Meta_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['_Meta_'] = ResolversParentTypes['_Meta_']> = ResolversObject<{
  block?: Resolver<ResolversTypes['_Block_'], ParentType, ContextType>;
  deployment?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hasIndexingErrors?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = MeshContext> = ResolversObject<{
  Application?: ApplicationResolvers<ContextType>;
  BigDecimal?: GraphQLScalarType;
  BigInt?: GraphQLScalarType;
  Bytes?: GraphQLScalarType;
  Proposal?: ProposalResolvers<ContextType>;
  ProposalOption?: ProposalOptionResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  Union?: UnionResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserRole?: UserRoleResolvers<ContextType>;
  _Block_?: _Block_Resolvers<ContextType>;
  _Meta_?: _Meta_Resolvers<ContextType>;
}>;

export type DirectiveResolvers<ContextType = MeshContext> = ResolversObject<{
  entity?: entityDirectiveResolver<any, any, ContextType>;
  subgraphId?: subgraphIdDirectiveResolver<any, any, ContextType>;
  derivedFrom?: derivedFromDirectiveResolver<any, any, ContextType>;
}>;

export type MeshContext = UnionTypes.Context & BaseMeshContext;


const baseDir = pathModule.join(typeof __dirname === 'string' ? __dirname : '/', '..');

const importFn: ImportFn = <T>(moduleId: string) => {
  const relativeModuleId = (pathModule.isAbsolute(moduleId) ? pathModule.relative(baseDir, moduleId) : moduleId).split('\\').join('/').replace(baseDir + '/', '');
  switch(relativeModuleId) {
    case ".graphclient/sources/union/introspectionSchema":
      return Promise.resolve(importedModule$0) as T;
    
    default:
      return Promise.reject(new Error(`Cannot find module '${relativeModuleId}'.`));
  }
};

const rootStore = new MeshStore('.graphclient', new FsStoreStorageAdapter({
  cwd: baseDir,
  importFn,
  fileType: "ts",
}), {
  readonly: true,
  validate: false
});

export const rawServeConfig: YamlConfig.Config['serve'] = undefined as any
export async function getMeshOptions(): Promise<GetMeshOptions> {
const pubsub = new PubSub();
const sourcesStore = rootStore.child('sources');
const logger = new DefaultLogger("GraphClient");
const cache = new (MeshCache as any)({
      ...({} as any),
      importFn,
      store: rootStore.child('cache'),
      pubsub,
      logger,
    } as any)

const sources: MeshResolvedSource[] = [];
const transforms: MeshTransform[] = [];
const additionalEnvelopPlugins: MeshPlugin<any>[] = [];
const unionTransforms = [];
const additionalTypeDefs = [] as any[];
const unionHandler = new GraphqlHandler({
              name: "union",
              config: {"endpoint":"http://localhost:8000/subgraphs/name/3VLINC/union-dao"},
              baseDir,
              cache,
              pubsub,
              store: sourcesStore.child("union"),
              logger: logger.child("union"),
              importFn,
            });
sources[0] = {
          name: 'union',
          handler: unionHandler,
          transforms: unionTransforms
        }
additionalEnvelopPlugins[0] = await UsePollingLive({
          ...({
  "defaultInterval": 1000
}),
          logger: logger.child("pollingLive"),
          cache,
          pubsub,
          baseDir,
          importFn,
        })
const additionalResolvers = [] as any[]
const merger = new(BareMerger as any)({
        cache,
        pubsub,
        logger: logger.child('bareMerger'),
        store: rootStore.child('bareMerger')
      })

  return {
    sources,
    transforms,
    additionalTypeDefs,
    additionalResolvers,
    cache,
    pubsub,
    merger,
    logger,
    additionalEnvelopPlugins,
    get documents() {
      return [
      {
        document: WatchAllUnionsDocument,
        get rawSDL() {
          return printWithCache(WatchAllUnionsDocument);
        },
        location: 'WatchAllUnionsDocument.graphql'
      },{
        document: FetchAllUnionsDocument,
        get rawSDL() {
          return printWithCache(FetchAllUnionsDocument);
        },
        location: 'FetchAllUnionsDocument.graphql'
      },{
        document: UnionDetailsDocument,
        get rawSDL() {
          return printWithCache(UnionDetailsDocument);
        },
        location: 'UnionDetailsDocument.graphql'
      },{
        document: WatchUnionDetailsDocument,
        get rawSDL() {
          return printWithCache(WatchUnionDetailsDocument);
        },
        location: 'WatchUnionDetailsDocument.graphql'
      },{
        document: UnionMembersDocument,
        get rawSDL() {
          return printWithCache(UnionMembersDocument);
        },
        location: 'UnionMembersDocument.graphql'
      },{
        document: ProposalDetailsDocument,
        get rawSDL() {
          return printWithCache(ProposalDetailsDocument);
        },
        location: 'ProposalDetailsDocument.graphql'
      },{
        document: IsUserAdminOfUnionDocument,
        get rawSDL() {
          return printWithCache(IsUserAdminOfUnionDocument);
        },
        location: 'IsUserAdminOfUnionDocument.graphql'
      }
    ];
    },
    fetchFn,
  };
}

export function createBuiltMeshHTTPHandler<TServerContext = {}>(): MeshHTTPHandler<TServerContext> {
  return createMeshHTTPHandler<TServerContext>({
    baseDir,
    getBuiltMesh: getBuiltGraphClient,
    rawServeConfig: undefined,
  })
}


let meshInstance$: Promise<MeshInstance> | undefined;

export function getBuiltGraphClient(): Promise<MeshInstance> {
  if (meshInstance$ == null) {
    meshInstance$ = getMeshOptions().then(meshOptions => getMesh(meshOptions)).then(mesh => {
      const id = mesh.pubsub.subscribe('destroy', () => {
        meshInstance$ = undefined;
        mesh.pubsub.unsubscribe(id);
      });
      return mesh;
    });
  }
  return meshInstance$;
}

export const execute: ExecuteMeshFn = (...args) => getBuiltGraphClient().then(({ execute }) => execute(...args));

export const subscribe: SubscribeMeshFn = (...args) => getBuiltGraphClient().then(({ subscribe }) => subscribe(...args));
export function getBuiltGraphSDK<TGlobalContext = any, TOperationContext = any>(globalContext?: TGlobalContext) {
  const sdkRequester$ = getBuiltGraphClient().then(({ sdkRequesterFactory }) => sdkRequesterFactory(globalContext));
  return getSdk<TOperationContext, TGlobalContext>((...args) => sdkRequester$.then(sdkRequester => sdkRequester(...args)));
}
export type WatchAllUnionsQueryVariables = Exact<{ [key: string]: never; }>;


export type WatchAllUnionsQuery = { unions: Array<Pick<Union, 'id' | 'name' | 'description' | 'logo'>>, _meta?: Maybe<{ block: Pick<_Block_, 'hash'> }> };

export type FetchAllUnionsQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchAllUnionsQuery = { unions: Array<Pick<Union, 'id' | 'name' | 'description' | 'logo'>>, _meta?: Maybe<{ block: Pick<_Block_, 'hash'> }> };

export type UnionDetailsQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type UnionDetailsQuery = { union?: Maybe<(
    Pick<Union, 'id' | 'name' | 'description' | 'logo'>
    & { pendingApplications: Array<(
      Pick<Application, 'id' | 'approved'>
      & { user: Pick<User, 'id'> }
    )>, proposals: Array<(
      Pick<Proposal, 'id' | 'numOptions'>
      & { options: Array<Pick<ProposalOption, 'id' | 'votes'>> }
    )> }
  )> };

export type ApplicationDetailFragment = (
  Pick<Application, 'id' | 'approved'>
  & { user: Pick<User, 'id'> }
);

export type WatchUnionDetailsQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type WatchUnionDetailsQuery = { union?: Maybe<(
    Pick<Union, 'id' | 'name' | 'description' | 'logo'>
    & { proposals: Array<(
      Pick<Proposal, 'id' | 'numOptions'>
      & { options: Array<Pick<ProposalOption, 'id' | 'votes'>> }
    )> }
  )> };

export type UnionMembersQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type UnionMembersQuery = { union?: Maybe<(
    Pick<Union, 'id'>
    & { users: Array<(
      Pick<UserRole, 'id' | 'isAdmin'>
      & { user: Pick<User, 'id' | 'metadata'> }
    )> }
  )> };

export type ProposalDetailsQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ProposalDetailsQuery = { proposal?: Maybe<(
    Pick<Proposal, 'id' | 'numOptions' | 'metadata'>
    & { union: Pick<Union, 'votingAddress'>, options: Array<Pick<ProposalOption, 'id' | 'votes'>> }
  )> };

export type IsUserAdminOfUnionQueryVariables = Exact<{
  id: Scalars['ID'];
  unionId: Scalars['Bytes'];
}>;


export type IsUserAdminOfUnionQuery = { user?: Maybe<(
    Pick<User, 'id'>
    & { roles: Array<{ union: Pick<Union, 'id'> }> }
  )> };

export const ApplicationDetailFragmentDoc = gql`
    fragment ApplicationDetail on Application {
  id
  user {
    id
  }
  approved
}
    ` as unknown as DocumentNode<ApplicationDetailFragment, unknown>;
export const WatchAllUnionsDocument = gql`
    query WatchAllUnions @live {
  unions(first: 50) {
    id
    name
    description
    logo
  }
  _meta {
    block {
      hash
    }
  }
}
    ` as unknown as DocumentNode<WatchAllUnionsQuery, WatchAllUnionsQueryVariables>;
export const FetchAllUnionsDocument = gql`
    query FetchAllUnions {
  unions(first: 50) {
    id
    name
    description
    logo
  }
  _meta {
    block {
      hash
    }
  }
}
    ` as unknown as DocumentNode<FetchAllUnionsQuery, FetchAllUnionsQueryVariables>;
export const UnionDetailsDocument = gql`
    query UnionDetails($id: ID!) {
  union(id: $id) {
    id
    name
    description
    logo
    pendingApplications(where: {approved: false}) {
      ...ApplicationDetail
    }
    proposals {
      id
      numOptions
      options {
        id
        votes
      }
    }
  }
}
    ${ApplicationDetailFragmentDoc}` as unknown as DocumentNode<UnionDetailsQuery, UnionDetailsQueryVariables>;
export const WatchUnionDetailsDocument = gql`
    query WatchUnionDetails($id: ID!) @live {
  union(id: $id) {
    id
    name
    description
    logo
    proposals {
      id
      numOptions
      options {
        id
        votes
      }
    }
  }
}
    ` as unknown as DocumentNode<WatchUnionDetailsQuery, WatchUnionDetailsQueryVariables>;
export const UnionMembersDocument = gql`
    query UnionMembers($id: ID!) {
  union(id: $id) {
    id
    users {
      id
      isAdmin
      user {
        id
        metadata
      }
    }
  }
}
    ` as unknown as DocumentNode<UnionMembersQuery, UnionMembersQueryVariables>;
export const ProposalDetailsDocument = gql`
    query ProposalDetails($id: ID!) {
  proposal(id: $id) {
    id
    numOptions
    union {
      votingAddress
    }
    options {
      id
      votes
    }
    metadata
  }
}
    ` as unknown as DocumentNode<ProposalDetailsQuery, ProposalDetailsQueryVariables>;
export const IsUserAdminOfUnionDocument = gql`
    query IsUserAdminOfUnion($id: ID!, $unionId: Bytes!) {
  user(id: $id) {
    id
    roles(where: {isAdmin: true, union_: {id: $unionId}}) {
      union {
        id
      }
    }
  }
}
    ` as unknown as DocumentNode<IsUserAdminOfUnionQuery, IsUserAdminOfUnionQueryVariables>;








export type Requester<C = {}, E = unknown> = <R, V>(doc: DocumentNode, vars?: V, options?: C) => Promise<R> | AsyncIterable<R>
export function getSdk<C, E>(requester: Requester<C, E>) {
  return {
    WatchAllUnions(variables?: WatchAllUnionsQueryVariables, options?: C): AsyncIterable<WatchAllUnionsQuery> {
      return requester<WatchAllUnionsQuery, WatchAllUnionsQueryVariables>(WatchAllUnionsDocument, variables, options) as AsyncIterable<WatchAllUnionsQuery>;
    },
    FetchAllUnions(variables?: FetchAllUnionsQueryVariables, options?: C): Promise<FetchAllUnionsQuery> {
      return requester<FetchAllUnionsQuery, FetchAllUnionsQueryVariables>(FetchAllUnionsDocument, variables, options) as Promise<FetchAllUnionsQuery>;
    },
    UnionDetails(variables: UnionDetailsQueryVariables, options?: C): Promise<UnionDetailsQuery> {
      return requester<UnionDetailsQuery, UnionDetailsQueryVariables>(UnionDetailsDocument, variables, options) as Promise<UnionDetailsQuery>;
    },
    WatchUnionDetails(variables: WatchUnionDetailsQueryVariables, options?: C): AsyncIterable<WatchUnionDetailsQuery> {
      return requester<WatchUnionDetailsQuery, WatchUnionDetailsQueryVariables>(WatchUnionDetailsDocument, variables, options) as AsyncIterable<WatchUnionDetailsQuery>;
    },
    UnionMembers(variables: UnionMembersQueryVariables, options?: C): Promise<UnionMembersQuery> {
      return requester<UnionMembersQuery, UnionMembersQueryVariables>(UnionMembersDocument, variables, options) as Promise<UnionMembersQuery>;
    },
    ProposalDetails(variables: ProposalDetailsQueryVariables, options?: C): Promise<ProposalDetailsQuery> {
      return requester<ProposalDetailsQuery, ProposalDetailsQueryVariables>(ProposalDetailsDocument, variables, options) as Promise<ProposalDetailsQuery>;
    },
    IsUserAdminOfUnion(variables: IsUserAdminOfUnionQueryVariables, options?: C): Promise<IsUserAdminOfUnionQuery> {
      return requester<IsUserAdminOfUnionQuery, IsUserAdminOfUnionQueryVariables>(IsUserAdminOfUnionDocument, variables, options) as Promise<IsUserAdminOfUnionQuery>;
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;