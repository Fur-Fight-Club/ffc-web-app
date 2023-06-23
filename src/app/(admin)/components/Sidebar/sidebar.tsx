import { Button } from "@components/UI/Button/Button.component";
import {
  CaretCircleLeft,
  CreditCard,
  House,
  MapPin,
  SignOut,
  UserRectangle,
} from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, MenuItem, Sidebar, useProSidebar } from "react-pro-sidebar";
import { useDispatch } from "react-redux";
import { logout } from "src/store/application/slice";
import { Flex } from "src/styles/flex";

export const SidebarAdmin = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { collapseSidebar } = useProSidebar();
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
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
  }, [collapseSidebar, collapsed]);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

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

          {/* <SubMenu label="Utilisateur" icon={<User />}>
          <MenuItem> Documentation</MenuItem>
          <MenuItem> Calendar</MenuItem>
        </SubMenu> */}
          <MenuItem
            icon={<House size={25} color="#e0dfdb" weight="fill" />}
            component={<Link href="/admin" />}
          >
            Dashboard
          </MenuItem>
          <MenuItem
            icon={<UserRectangle size={25} color="#e0dfdb" weight="fill" />}
            component={<Link href="/admin/accounts" />}
          >
            Utilisateurs
          </MenuItem>
          <MenuItem
            icon={<MapPin size={25} color="#e0dfdb" weight="fill" />}
            component={<Link href="/admin/arena" />}
          >
            Arènes
          </MenuItem>
          <MenuItem
            icon={<CreditCard size={25} color="#e0dfdb" weight="fill" />}
          >
            Payements
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
