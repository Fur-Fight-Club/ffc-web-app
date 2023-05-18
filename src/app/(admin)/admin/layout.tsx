'use client';

import { Layout } from 'antd';

type AdminLayoutProps = {
  children: React.ReactNode;
};

const { Header, Content, Footer, Sider } = Layout;

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'row' }}>
      <div>{children}</div>
    </main>
  );
}
