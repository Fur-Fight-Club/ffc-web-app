type LoginLayoutProps = {
  children: React.ReactNode;
};

export default function LoginLayout({ children }: LoginLayoutProps) {
  return (
    <main>
      <div>ceci est le layout Login</div>
      <div>{children}</div>
    </main>
  );
}
