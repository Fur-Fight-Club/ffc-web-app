"use client";

import { Card, Input, Modal, Row, Spacer, Text } from "@nextui-org/react";
import colors from "@styles/_colors.module.scss";
import { Button } from "@components/UI/Button/Button.component";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { CaretRight } from "@phosphor-icons/react";

type MenuProfileProps = {};

const MenuProfile = ({}: MenuProfileProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const isInUrl = (path: string) => {
    return pathname.includes(path);
  };

  const pasth = [
    {
      name: "Informations personnelles",
      path: "/profile",
    },
    {
      name: "Mon portefeuille",
      path: "/wallet",
    },
  ];

  return (
    <Card>
      <Card.Body css={{ p: "inherit" }}>
        {pasth.map((item) => (
          <Link key={item.path} href={item.path}>
            <Row
              align="center"
              justify="space-between"
              css={{
                p: "$10",
                background: isInUrl(item.path) == true ? colors.primary : "",
              }}
            >
              <Text
                css={{
                  color: isInUrl(item.path) == true ? colors.white : "",
                }}
              >
                {item.name}
              </Text>
              <CaretRight
                size={20}
                color={isInUrl(item.path) == true ? colors.white : ""}
              />
            </Row>
          </Link>
        ))}
      </Card.Body>
      <Card.Divider />
      <Card.Footer>
        <Row align="flex-end" justify="flex-end" css={{ m: "$5" }}>
          <Button auto>Se déconnecter</Button>
        </Row>
      </Card.Footer>
    </Card>
  );
};

export default MenuProfile;
