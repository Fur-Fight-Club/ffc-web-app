'use client';

import SidebarTest from '../components/Sidebar/sidebar';

type AdminLayoutProps = {
  children: React.ReactNode;
};

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <main style={{ height: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
        <SidebarTest>
          <div>{children}</div>
        </SidebarTest>
      </div>
    </main>
  );
}
