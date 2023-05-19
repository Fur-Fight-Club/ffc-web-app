import {
  CreditCard,
  House,
  MapPin,
  UserRectangle,
} from '@phosphor-icons/react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, MenuItem, Sidebar, useProSidebar } from 'react-pro-sidebar';
import { Flex } from 'src/styles/flex';

export const SidebarAdmin = () => {
  const { collapseSidebar } = useProSidebar();

  return (
    <>
      <Sidebar breakPoint="lg" backgroundColor="white">
        <Menu>
          <Flex justify={'center'} style={{ margin: '1rem' }}>
            <Image src="/test.png" alt="logo" width={40} height={40} />
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
        </Menu>
        <main>
          <button onClick={() => collapseSidebar()}>Collapse</button>
        </main>
      </Sidebar>
    </>
  );
};
