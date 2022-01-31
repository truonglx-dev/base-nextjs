import * as React from 'react';
import { LayoutProps } from './typeLayout';

export default function GuestLayout({ children }: LayoutProps) {
  return <div className="flex flex-col">{children}</div>;
}
