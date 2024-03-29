"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "src/store/application/slice";

import { Button } from "@components/UI/Button/Button.component";
import {
  CaretCircleLeft,
  ChartDonut,
  CreditCard,
  Ghost,
  House,
  MapPin,
  SignOut,
  UserRectangle,
  UsersFour,
} from "@phosphor-icons/react";
import { Menu, MenuItem, Sidebar, useProSidebar } from "react-pro-sidebar";
import { Flex } from "src/styles/flex";

export const SidebarAdmin = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isRedirecting, setIsRedirecting] = useState(false);

  const dispatch = useDispatch();
  const { collapseSidebar } = useProSidebar();
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const updateWindowWidth = () => {
        const width = window.innerWidth;
        if (width > 768 && collapsed) {
          collapseSidebar(false);
          setCollapsed(false);
        }
        if (width < 768) {
          collapseSidebar(true);
          setCollapsed(true);
        }
      };
      window.addEventListener("resize", updateWindowWidth);

      return () => window.removeEventListener("resize", updateWindowWidth);
    }
  }, [collapseSidebar, collapsed, window]);

  const redirectTo = (path: string) => {
    setIsRedirecting(true);
    router.push(path);
  };

  const handleLogout = () => {
    redirectTo("/");
  };

  useEffect(() => {
    if (isRedirecting) {
      setTimeout(() => {
        dispatch(logout());
      }, 700);
    }
  }, [isRedirecting]);

  const handleToggleSidebar = () => {
    collapseSidebar(!collapsed);
    setCollapsed(!collapsed);
  };

  return (
    <>
      <Sidebar backgroundColor="white">
        <Menu>
          <Flex justify={"center"} style={{ margin: "1rem" }}>
            <Image
              src="/images/ffc-logo.svg"
              alt="logo"
              width={80}
              height={80}
            />
          </Flex>

          <MenuItem
            component={<Link href="/admin" />}
            icon={
              pathname === "/admin" ? (
                <ChartDonut size={25} color="black" weight="fill" />
              ) : (
                <ChartDonut size={25} color="#e0dfdb" weight="light" />
              )
            }
            style={pathname === "/admin" ? { fontWeight: "bold" } : {}}
          >
            Dashboard
          </MenuItem>
          <MenuItem
            component={<Link href="/admin/accounts" />}
            icon={
              pathname === "/admin/accounts" ? (
                <UserRectangle size={25} color="black" weight="fill" />
              ) : (
                <UserRectangle size={25} color="#e0dfdb" weight="light" />
              )
            }
            style={pathname === "/admin/accounts" ? { fontWeight: "bold" } : {}}
          >
            Utilisateurs
          </MenuItem>
          <MenuItem
            component={<Link href="/admin/arena" />}
            icon={
              pathname === "/admin/arena" ? (
                <MapPin size={25} color="black" weight="fill" />
              ) : (
                <MapPin size={25} color="#e0dfdb" weight="light" />
              )
            }
            style={pathname === "/admin/arena" ? { fontWeight: "bold" } : {}}
          >
            Arènes
          </MenuItem>
          <MenuItem
            component={<Link href="/admin/tournaments" />}
            icon={
              pathname === "/admin/tournaments" ? (
                <UsersFour size={25} color="black" weight="fill" />
              ) : (
                <UsersFour size={25} color="#e0dfdb" weight="light" />
              )
            }
            style={
              pathname === "/admin/tournaments" ? { fontWeight: "bold" } : {}
            }
          >
            Tournois
          </MenuItem>

          <MenuItem
            component={<Link href="/admin/monster" />}
            icon={
              pathname === "/admin/monster" ? (
                <Ghost size={25} color="black" weight="fill" />
              ) : (
                <Ghost size={25} color="#e0dfdb" weight="light" />
              )
            }
            style={pathname === "/admin/monster" ? { fontWeight: "bold" } : {}}
          >
            Monstres
          </MenuItem>

          <MenuItem
            component={<Link href="/admin/payement" />}
            icon={
              pathname === "/admin/payement" ? (
                <CreditCard size={25} color="black" weight="fill" />
              ) : (
                <CreditCard size={25} color="#e0dfdb" weight="light" />
              )
            }
            style={pathname === "/admin/payement" ? { fontWeight: "bold" } : {}}
          >
            Payements
          </MenuItem>

          <MenuItem
            icon={<House size={25} color="#e0dfdb" weight="light" />}
            onClick={() => router.push("/")}
          >
            Retour page d'accueil
          </MenuItem>

          <MenuItem
            icon={<SignOut size={25} color="#e0dfdb" weight="light" />}
            onClick={handleLogout}
          >
            Se déconnecter
          </MenuItem>
        </Menu>

        <Flex justify={"center"} style={{ margin: "1rem" }}>
          <Button
            auto
            light
            ripple={false}
            icon={<CaretCircleLeft size={32} color="#889096" weight="fill" />}
            onPress={() => handleToggleSidebar()}
            style={collapsed ? { transform: "rotate(180deg)" } : {}}
            analyticsId="btn-toggle-sidebar"
          >
            {""}
          </Button>
        </Flex>
      </Sidebar>
    </>
  );
};
