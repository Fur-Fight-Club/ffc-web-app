type AdminLayoutProps = {
  children: React.ReactNode;
};

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <main>
      <div>ADMIN LAYOUT</div>
      <div>{children}</div>
    </main>
  );
}
