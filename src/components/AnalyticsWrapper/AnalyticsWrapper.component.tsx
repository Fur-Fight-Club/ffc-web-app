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
  const { analytics, user } = useSelector(applicationState);

  const userAgent = {
    browser: {
      name: navigator.userAgent.match(
        /(Chrome|Firefox|Safari|Opera|Edge|IE)\//i
      )?.[1],
      version: navigator.userAgent.match(
        /(Chrome|Firefox|Safari|Opera|Edge|IE)\/([\d.]+)/i
      )?.[2],
    },
    os: {
      name: navigator.userAgent.match(
        /(Windows|Mac OS|Linux|iOS|Android)\s[\d_\.]+/i
      )?.[1],
      version: navigator.userAgent.match(
        /(Windows|Mac OS|Linux|iOS|Android)\s([\d_\.]+)/i
      )?.[2],
    },
    platform:
      navigator.userAgent.match(/(Mobile|Tablet|Desktop)/i)?.[1] ?? "Desktop",
    language: navigator.language,
  };

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
      userAgent,
      user: user.id,
      uuid: analytics.uuid,
    };

    console.log(analyticsWrapperPayload);
  };

  return (
    <div onClickCapture={handleClick} className={styles.fullPage}>
      {children}
    </div>
  );
};
