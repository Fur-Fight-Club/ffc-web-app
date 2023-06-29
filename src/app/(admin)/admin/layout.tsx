"use client";

import { ProSidebarProvider } from "react-pro-sidebar";
import { useSelector } from "react-redux";
import { applicationState } from "src/store/application/selector";
import { Flex } from "src/styles/flex";
import { isUserAdmin } from "src/utils/utils";
import { SidebarAdmin } from "../components/Sidebar/sidebar";

type AdminLayoutProps = {
  children: React.ReactNode;
};

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { user } = useSelector(applicationState);

  if (isUserAdmin(user)) {
    return (
      <main style={{ height: "100%" }}>
        <div style={{ display: "flex", flexDirection: "row", height: "100%" }}>
          <ProSidebarProvider>
            <SidebarAdmin />
            <Flex direction={"column"} style={{ width: "100%" }}>
              <div style={{ margin: "40px" }}>{children}</div>
            </Flex>
          </ProSidebarProvider>
        </div>
      </main>
    );
  } else {
    throw new Error("Vous devez être administrateur pour accéder à cette page");
  }
}
