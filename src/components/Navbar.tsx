'use client';
import { Button, Link, Navbar, Text, useTheme } from '@nextui-org/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const NavbarTest = () => {
  const [variant, setVariant] = useState('default');
  const [activeColor, setActiveColor] = useState('primary');

  const { isDark } = useTheme();
  const router = useRouter();

  return (
    <Navbar isBordered={isDark} variant="floating" maxWidth="fluid">
      <Navbar.Brand>
        <Image src="/logo_test.png" alt="Acme Logo" width={50} height={50} />
        <Text b color="inherit" hideIn="xs">
          ACME
        </Text>
      </Navbar.Brand>
      <Navbar.Content
        activeColor="primary"
        hideIn="xs"
        variant="highlight-rounded"
      >
        <Navbar.Link href="#"> Features</Navbar.Link>
        <Navbar.Link isActive href="#">
          Customers
        </Navbar.Link>
        <Navbar.Link href="#">Pricing</Navbar.Link>
        <Navbar.Link href="#">Company</Navbar.Link>
      </Navbar.Content>
      <Navbar.Content>
        <Navbar.Link color="inherit" onClick={() => router.push('/login')}>
          Login
        </Navbar.Link>
        <Navbar.Item>
          <Button
            auto
            flat
            as={Link}
            color="primary"
            onClick={() => router.push('/register')}
          >
            Sign Up
          </Button>
        </Navbar.Item>
      </Navbar.Content>
    </Navbar>
  );
};

export default NavbarTest;
