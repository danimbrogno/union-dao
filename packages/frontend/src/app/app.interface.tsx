export type ProposalMetadata = {
  title?: string;
  description?: string;
  options?: Array<ProposalMetadataOption>;
};

export type ProposalMetadataOption = {
  description?: string;
};
