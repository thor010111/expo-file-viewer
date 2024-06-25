import * as React from 'react';

import { ExpoFileViewerViewProps } from './ExpoFileViewer.types';

export default function ExpoFileViewerView(props: ExpoFileViewerViewProps) {
  return (
    <div>
      <span>{props.name}</span>
    </div>
  );
}
