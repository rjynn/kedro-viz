import React from 'react';
import { useApolloQuery } from '../../../apollo/utils';
import classnames from 'classnames';
import RunMetadata from '../run-metadata';
import RunDataset from '../run-dataset';
import {
  GET_RUN_METADATA,
  GET_RUN_TRACKING_DATA,
} from '../../../apollo/queries';

import './details.css';

const Details = ({
  enableShowChanges,
  pinnedRun,
  selectedRuns,
  setPinnedRun,
  sidebarVisible,
}) => {
  const { data: { runMetadata } = [], error } = useApolloQuery(
    GET_RUN_METADATA,
    {
      skip: selectedRuns.length === 0,
      variables: { runIds: selectedRuns },
    }
  );

  const { data: { runTrackingData } = [], error: trackingError } =
    useApolloQuery(GET_RUN_TRACKING_DATA, {
      skip: selectedRuns.length === 0,
      variables: { runIds: selectedRuns, showDiff: false },
    });

  if (error || trackingError) {
    return null;
  }

  const isSingleRun = runMetadata && runMetadata.length === 1 ? true : false;

  return (
    <>
      <div
        className={classnames('kedro', 'details-mainframe', {
          'details-mainframe--sidebar-visible': sidebarVisible,
        })}
      >
        <RunMetadata
          enableShowChanges={enableShowChanges}
          isSingleRun={isSingleRun}
          pinnedRun={pinnedRun}
          runs={runMetadata}
          setPinnedRun={setPinnedRun}
        />
        <RunDataset
          enableShowChanges={enableShowChanges}
          isSingleRun={isSingleRun}
          pinnedRun={pinnedRun}
          trackingData={runTrackingData}
        />
      </div>
    </>
  );
};

export default Details;