"use client";

import { Link, Navbar, Switch, Text, useTheme } from "@nextui-org/react";
import { Moon, Sun } from "@phosphor-icons/react";
import { useTheme as useNextTheme } from "next-themes";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { applicationState } from "src/store/application/selector";
import { logout } from "src/store/application/slice";
import { isUserAdmin, isUserLoggedIn } from "src/utils/utils";
import { Button } from "./UI/Button/Button.component";

const NavbarTest = () => {
  const [variant, setVariant] = useState("default");
  const [activeColor, setActiveColor] = useState("primary");

  const { isDark } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const { setTheme } = useNextTheme();
  const dispatch = useDispatch();

  const { user } = useSelector(applicationState);

  const [isUserLogged, setIsUserLogged] = useState(false);
  const [isUserisAdmin, setIsUserisAdmin] = useState(false);

  useEffect(() => {
    setIsUserLogged(isUserLoggedIn(user));
    setIsUserisAdmin(isUserAdmin(user));
  }, [user]);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  const isInUrl = (path: string) => {
    return pathname.includes(path);
  };

  if (isUserLogged) {
    return (
      <Navbar isBordered={isDark} variant="floating" maxWidth="fluid">
        <Navbar.Brand>
          <Image
            src="/images/ffc-logo.svg"
            alt="Acme Logo"
            width={50}
            height={50}
          />
          <Text b color="inherit" hideIn="xs" css={{ marginLeft: "0.5rem" }}>
            Fury Fight Club
          </Text>
        </Navbar.Brand>
        <Navbar.Content
          activeColor="primary"
          hideIn="xs"
          variant="highlight-rounded"
        >
          <Navbar.Link
            {...(isInUrl("dashboard") && { isActive: true })}
            onPress={() => router.push("/dashboard")}
          >
            Dashboard
          </Navbar.Link>
          <Navbar.Link
            {...(isInUrl("wallet") && { isActive: true })}
            onPress={() => router.push("/wallet")}
          >
            Portefeuille
          </Navbar.Link>
          <Navbar.Link
            {...(isInUrl("profile") && { isActive: true })}
            onPress={() => router.push("/profile")}
          >
            Profile
          </Navbar.Link>
          <Navbar.Link
            {...(isInUrl("match") && { isActive: true })}
            onPress={() => router.push("/match")}
          >
            Match
          </Navbar.Link>
          <Navbar.Link
            {...(isInUrl("monster") && { isActive: true })}
            onPress={() => router.push("/monster")}
          >
            Monster
          </Navbar.Link>
        </Navbar.Content>
        <Navbar.Content></Navbar.Content>
        <Navbar.Content>
          <Switch
            checked={isDark}
            iconOn={<Moon />}
            iconOff={<Sun />}
            onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
          />
          {isUserisAdmin && (
            <Navbar.Link color="inherit" onClick={() => router.push("/admin")}>
              Dashboard Admin
            </Navbar.Link>
          )}

          <Navbar.Link href="#">
            <Button bordered auto onPress={handleLogout}>
              Déconnexion
            </Button>
          </Navbar.Link>
        </Navbar.Content>
      </Navbar>
    );
  } else {
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
            Fury Fight Club
          </Text>
        </Navbar.Brand>
        <Navbar.Content>
          <Switch
            checked={isDark}
            iconOn={<Moon />}
            iconOff={<Sun />}
            onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
          />
          <Navbar.Link color="inherit" onClick={() => router.push("/login")}>
            Connexion
          </Navbar.Link>
          <Navbar.Item>
            <Button
              auto
              flat
              as={Link}
              color="primary"
              onClick={() => router.push("/register")}
            >
              {"S'inscrire"}
            </Button>
          </Navbar.Item>
        </Navbar.Content>
      </Navbar>
    );
  }
};

export default NavbarTest;
