import gql from 'graphql-tag';

/** query for runsList sidebar */
export const GET_RUNS = gql`
  query getRunsList {
    runsList {
      bookmark
      gitSha
      id
      timestamp
      title
    }
  }
`;

/** query for details metadata component */
export const GET_RUN_METADATA = gql`
  query getRunMetadata($runIds: [ID!]!) {
    runMetadata(runIds: $runIds) {
      id
      author
      gitBranch
      gitSha
      notes
      runCommand
      timestamp
      title
    }
  }
`;

/** query for collapsable run details component */
export const GET_RUN_TRACKING_DATA = gql`
  query getRunTrackingData($runIds: [ID!]!, $showDiff: Boolean) {
    runTrackingData(runIds: $runIds, showDiff: $showDiff) {
      datasetName
      datasetType
      data
    }
  }
`;