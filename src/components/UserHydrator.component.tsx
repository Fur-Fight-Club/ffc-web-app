"use client";

import { usePathname } from "next/navigation";
import * as React from "react";
import { useEffect } from "react";
import { useGetUserQuery } from "src/store/application/slice";

interface UserHydratorProps {}

export const UserHydrator: React.FunctionComponent<
  UserHydratorProps
> = ({}) => {
  const pathname = usePathname();
  const { refetch } = useGetUserQuery("");
  useEffect(() => {
    refetch();
  }, [pathname]);
  return null;
};
