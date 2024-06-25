import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

// Import the native module. On web, it will be resolved to ExpoFileViewer.web.ts
// and on native platforms to ExpoFileViewer.ts
import ExpoFileViewerModule from './ExpoFileViewerModule';
import ExpoFileViewerView from './ExpoFileViewerView';
import { ChangeEventPayload, ExpoFileViewerViewProps } from './ExpoFileViewer.types';

// Get the native constant value.
export const PI = ExpoFileViewerModule.PI;

export function hello(): string {
  return ExpoFileViewerModule.hello();
}

export async function setValueAsync(value: string) {
  return await ExpoFileViewerModule.setValueAsync(value);
}

const emitter = new EventEmitter(ExpoFileViewerModule ?? NativeModulesProxy.ExpoFileViewer);

export function addChangeListener(listener: (event: ChangeEventPayload) => void): Subscription {
  return emitter.addListener<ChangeEventPayload>('onChange', listener);
}

export { ExpoFileViewerView, ExpoFileViewerViewProps, ChangeEventPayload };
