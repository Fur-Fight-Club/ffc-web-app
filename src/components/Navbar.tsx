"use client";

import { Link, Navbar, Switch, Text, useTheme } from "@nextui-org/react";
import { useTheme as useNextTheme } from "next-themes";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "src/store/application/slice";
import { Button } from "./UI/Button/Button.component";

const NavbarTest = () => {
  const [variant, setVariant] = useState("default");
  const [activeColor, setActiveColor] = useState("primary");

  const dispatch = useDispatch();

  const { isDark } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const { setTheme } = useNextTheme();

  return (
    <Navbar isBordered={isDark} variant="floating" maxWidth="fluid">
      <Navbar.Brand>
        <Image
          src="/images/ffc-logo.svg"
          alt="Acme Logo"
          width={50}
          height={50}
        />
        <Text b color="inherit" hideIn="xs">
          ACME
        </Text>
      </Navbar.Brand>
      <Navbar.Content
        activeColor="primary"
        hideIn="xs"
        variant="highlight-rounded"
      >
        <Navbar.Link
          href="#"
          {...(pathname === "/dashboard" && { isActive: true })}
          onPress={() => router.push("/dashboard")}
        >
          Dashboard
        </Navbar.Link>
        <Navbar.Link
          href="#"
          {...(pathname === "/wallet" && { isActive: true })}
          onPress={() => router.push("/wallet")}
        >
          Portefeuille
        </Navbar.Link>
        <Navbar.Link
          href="#"
          {...(pathname === "/profile" && { isActive: true })}
          onPress={() => router.push("/profile")}
        >
          Profile
        </Navbar.Link>
      </Navbar.Content>
      <Navbar.Content>
        <Switch
          checked={isDark}
          onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
        />
        <Navbar.Link color="inherit" onClick={() => router.push("/admin")}>
          ADMIN
        </Navbar.Link>
        <Navbar.Link color="inherit" onClick={() => router.push("/login")}>
          Login
        </Navbar.Link>
        <Navbar.Item>
          <Button
            auto
            flat
            as={Link}
            color="primary"
            onClick={() => router.push("/register")}
          >
            Sign Up
          </Button>
        </Navbar.Item>
        <Navbar.Item>
          <Button
            auto
            flat
            as={Link}
            color="secondary"
            onClick={() => dispatch(logout())}
          >
            Disconnected
          </Button>
        </Navbar.Item>
      </Navbar.Content>
    </Navbar>
  );
};

export default NavbarTest;
