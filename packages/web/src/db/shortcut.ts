// shortcut.ts

export interface Shortcut {
  id?: number;

  screenshot: string;

  videoRecording?: string;

  screenRecording?: string;

  audioRecording?: string;

  userId: number;

  createdAt?: Date;

  createdBy?: number;

  updatedAt?: Date;

  updatedBy?: number;
}

export const defaultShortcut = {
  screenshot: 'Alt+Shift+Q',
  createdAt: new Date(),
  updatedAt: new Date(),
};
