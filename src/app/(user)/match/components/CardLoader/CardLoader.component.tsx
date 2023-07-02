"use client";

import { Loading } from "@nextui-org/react";
import * as React from "react";

interface CardLoaderProps {}

export const CardLoader: React.FunctionComponent<CardLoaderProps> = ({}) => {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Loading color="primary" size="xl" />
    </div>
  );
};
