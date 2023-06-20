"use client";

import * as React from "react";
// @ts-ignore
import styles from "./AnalyticsWrapper.module.scss";
import { useSelector } from "react-redux";
import { applicationState } from "src/store/application/selector";

interface AnalyticsWrapperProps {
  children: any;
}

export const AnalyticsWrapper: React.FunctionComponent<
  AnalyticsWrapperProps
> = ({ children }) => {
  const { uuid, user } = useSelector(applicationState);

  const handleClick = (event: any) => {
    const analyticsWrapperPayload = {
      event: "mouse_click",
      id: "analyticsWrapper",
      timestamp: Date.now(),
      pathname: window.location.pathname,
      click: {
        x: event.clientX,
        y: event.clientY,
      },
      window: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
      user: user.id,
      uuid,
    };

    console.log(analyticsWrapperPayload);
  };

  return (
    <div onClickCapture={handleClick} className={styles.fullPage}>
      {children}
    </div>
  );
};
