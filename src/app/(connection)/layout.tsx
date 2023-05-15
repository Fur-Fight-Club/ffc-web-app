type LoginLayoutProps = {
  children: React.ReactNode;
};

export default function LoginLayout({ children }: LoginLayoutProps) {
  return (
    <main>
      <div>CONNECTION LAYOUT</div>
      <div>{children}</div>
    </main>
  );
}
