import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

import { ExpoFileViewerViewProps } from './ExpoFileViewer.types';

const NativeView: React.ComponentType<ExpoFileViewerViewProps> =
  requireNativeViewManager('ExpoFileViewer');

export default function ExpoFileViewerView(props: ExpoFileViewerViewProps) {
  return <NativeView {...props} />;
}
