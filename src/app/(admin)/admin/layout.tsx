'use client';

import { ProSidebarProvider } from 'react-pro-sidebar';
import { Flex } from 'src/styles/flex';
import { SidebarAdmin } from '../components/Sidebar/sidebar';

type AdminLayoutProps = {
  children: React.ReactNode;
};

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <main style={{ height: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
        <ProSidebarProvider>
          <SidebarAdmin />
          <Flex direction={'column'}>{children}</Flex>
        </ProSidebarProvider>
      </div>
    </main>
  );
}
