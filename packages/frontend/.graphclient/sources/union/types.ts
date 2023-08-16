// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace UnionTypes {
  export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
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
  metadata?: Maybe<ProposalMetadata>;
};

export type ProposalMetadata = {
  id: Scalars['String'];
  description: Scalars['String'];
  options: Array<ProposalMetadataOption>;
};


export type ProposalMetadataoptionsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ProposalMetadataOption_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ProposalMetadataOption_filter>;
};

export type ProposalMetadataOption = {
  id: Scalars['String'];
  proposal: ProposalMetadata;
  description: Scalars['String'];
};

export type ProposalMetadataOption_filter = {
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
  proposal_?: InputMaybe<ProposalMetadata_filter>;
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
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<ProposalMetadataOption_filter>>>;
  or?: InputMaybe<Array<InputMaybe<ProposalMetadataOption_filter>>>;
};

export type ProposalMetadataOption_orderBy =
  | 'id'
  | 'proposal'
  | 'proposal__id'
  | 'proposal__description'
  | 'description';

export type ProposalMetadata_filter = {
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
  options_?: InputMaybe<ProposalMetadataOption_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<ProposalMetadata_filter>>>;
  or?: InputMaybe<Array<InputMaybe<ProposalMetadata_filter>>>;
};

export type ProposalMetadata_orderBy =
  | 'id'
  | 'description'
  | 'options';

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
  metadata_?: InputMaybe<ProposalMetadata_filter>;
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
  | 'numOptions'
  | 'metadata'
  | 'metadata__id'
  | 'metadata__description';

export type Query = {
  union?: Maybe<Union>;
  unions: Array<Union>;
  userRole?: Maybe<UserRole>;
  userRoles: Array<UserRole>;
  user?: Maybe<User>;
  users: Array<User>;
  proposal?: Maybe<Proposal>;
  proposals: Array<Proposal>;
  proposalMetadata: Array<ProposalMetadata>;
  proposalMetadataOption?: Maybe<ProposalMetadataOption>;
  proposalMetadataOptions: Array<ProposalMetadataOption>;
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


export type QueryproposalMetadataArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ProposalMetadata_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ProposalMetadata_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryproposalMetadataOptionArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryproposalMetadataOptionsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ProposalMetadataOption_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ProposalMetadataOption_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Query_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type Subscription = {
  union?: Maybe<Union>;
  unions: Array<Union>;
  userRole?: Maybe<UserRole>;
  userRoles: Array<UserRole>;
  user?: Maybe<User>;
  users: Array<User>;
  proposal?: Maybe<Proposal>;
  proposals: Array<Proposal>;
  proposalMetadata: Array<ProposalMetadata>;
  proposalMetadataOption?: Maybe<ProposalMetadataOption>;
  proposalMetadataOptions: Array<ProposalMetadataOption>;
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


export type SubscriptionproposalMetadataArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ProposalMetadata_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ProposalMetadata_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionproposalMetadataOptionArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionproposalMetadataOptionsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ProposalMetadataOption_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ProposalMetadataOption_filter>;
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
  users: Array<UserRole>;
  proposals: Array<Proposal>;
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
  | 'users'
  | 'proposals';

export type User = {
  id: Scalars['Bytes'];
  name: Scalars['String'];
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
  | 'user'
  | 'user__id'
  | 'user__name'
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
  roles_?: InputMaybe<UserRole_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<User_filter>>>;
  or?: InputMaybe<Array<InputMaybe<User_filter>>>;
};

export type User_orderBy =
  | 'id'
  | 'name'
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

  export type QuerySdk = {
      /** null **/
  union: InContextSdkMethod<Query['union'], QueryunionArgs, MeshContext>,
  /** null **/
  unions: InContextSdkMethod<Query['unions'], QueryunionsArgs, MeshContext>,
  /** null **/
  userRole: InContextSdkMethod<Query['userRole'], QueryuserRoleArgs, MeshContext>,
  /** null **/
  userRoles: InContextSdkMethod<Query['userRoles'], QueryuserRolesArgs, MeshContext>,
  /** null **/
  user: InContextSdkMethod<Query['user'], QueryuserArgs, MeshContext>,
  /** null **/
  users: InContextSdkMethod<Query['users'], QueryusersArgs, MeshContext>,
  /** null **/
  proposal: InContextSdkMethod<Query['proposal'], QueryproposalArgs, MeshContext>,
  /** null **/
  proposals: InContextSdkMethod<Query['proposals'], QueryproposalsArgs, MeshContext>,
  /** null **/
  proposalMetadata: InContextSdkMethod<Query['proposalMetadata'], QueryproposalMetadataArgs, MeshContext>,
  /** null **/
  proposalMetadataOption: InContextSdkMethod<Query['proposalMetadataOption'], QueryproposalMetadataOptionArgs, MeshContext>,
  /** null **/
  proposalMetadataOptions: InContextSdkMethod<Query['proposalMetadataOptions'], QueryproposalMetadataOptionsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  _meta: InContextSdkMethod<Query['_meta'], Query_metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  union: InContextSdkMethod<Subscription['union'], SubscriptionunionArgs, MeshContext>,
  /** null **/
  unions: InContextSdkMethod<Subscription['unions'], SubscriptionunionsArgs, MeshContext>,
  /** null **/
  userRole: InContextSdkMethod<Subscription['userRole'], SubscriptionuserRoleArgs, MeshContext>,
  /** null **/
  userRoles: InContextSdkMethod<Subscription['userRoles'], SubscriptionuserRolesArgs, MeshContext>,
  /** null **/
  user: InContextSdkMethod<Subscription['user'], SubscriptionuserArgs, MeshContext>,
  /** null **/
  users: InContextSdkMethod<Subscription['users'], SubscriptionusersArgs, MeshContext>,
  /** null **/
  proposal: InContextSdkMethod<Subscription['proposal'], SubscriptionproposalArgs, MeshContext>,
  /** null **/
  proposals: InContextSdkMethod<Subscription['proposals'], SubscriptionproposalsArgs, MeshContext>,
  /** null **/
  proposalMetadata: InContextSdkMethod<Subscription['proposalMetadata'], SubscriptionproposalMetadataArgs, MeshContext>,
  /** null **/
  proposalMetadataOption: InContextSdkMethod<Subscription['proposalMetadataOption'], SubscriptionproposalMetadataOptionArgs, MeshContext>,
  /** null **/
  proposalMetadataOptions: InContextSdkMethod<Subscription['proposalMetadataOptions'], SubscriptionproposalMetadataOptionsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  _meta: InContextSdkMethod<Subscription['_meta'], Subscription_metaArgs, MeshContext>
  };

  export type Context = {
      ["union"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
