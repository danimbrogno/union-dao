export type ProposalMetadata = {
  title?: string;
  description?: string;
  options?: Array<ProposalMetadataOption>;
};

export type ProposalMetadataOption = {
  description?: string;
};

export type UnionMetadata = {
  name?: string;
  description?: string;
  logo?: string;
};

export type UserMetadata = {
  name?: string;
};
