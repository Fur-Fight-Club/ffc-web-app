"use client";

import * as React from "react";
import { useEffect } from "react";
// @ts-ignore
import styles from "./AnalyticsWrapper.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { applicationState } from "src/store/application/selector";
import { usePathname } from "next/navigation";
import {
  setSessionPagesVisited,
  setSessionTime,
} from "src/store/application/slice";

interface AnalyticsWrapperProps {
  children: any;
}

export const AnalyticsWrapper: React.FunctionComponent<
  AnalyticsWrapperProps
> = ({ children }) => {
  const dispatch = useDispatch();
  const { analytics, user } = useSelector(applicationState);

  const pathname = usePathname();

  /**
   * User Agent data
   */
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

  /**
   * Handle page leave
   */
  useEffect(() => {
    const handleUnload = (event: any) => {
      event.preventDefault();
      // Prepare the payload for the server
      const pageUnloadAnalyticsPayload = {
        event: "page_unload",
        id: "analyticsWrapper",
        user: user.id,
        uuid: analytics.uuid,
        timestamp: Date.now(),
        visitedPages: analytics.session.pageVisited,
        userAgent,
      };

      // Send the payload to the server
      console.log(pageUnloadAnalyticsPayload);
      // TODO: Send the payload to the server

      // Clean visited pages
      dispatch(setSessionPagesVisited([]));

      // Reset session time
      dispatch(
        setSessionTime({
          startTime: -1,
          endTime: -1,
        })
      );
    };

    window.addEventListener("beforeunload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);

  /**
   * Handle the page change
   */
  useEffect(() => {
    console.log("Pathname changed to: ", pathname);
    // Add the visited page to the state
    dispatch(
      setSessionPagesVisited([
        ...analytics.session.pageVisited,
        { page: pathname, timestamp: Date.now() },
      ])
    );

    // Update the endTime of the visited page
    dispatch(
      setSessionTime({
        startTime: analytics.session.startTime,
        endTime: Date.now(),
      })
    );

    // Prepare the payload for the server
    const pageAnalyticsPayload = {
      event: "pathname_change",
      id: pathname,
      uuid: analytics.uuid,
      timestamp: Date.now(),
      user: user.id,
      startTime: analytics.session.startTime,
      endTime: analytics.session.endTime,
      userAgent,
    };

    // Send the payload to the server
    console.log(pageAnalyticsPayload);
    // TODO: Send the payload to the server

    // Reset the startTime of the visited page
    dispatch(
      setSessionTime({
        startTime: Date.now(),
        endTime: -1,
      })
    );
  }, [pathname]);

  /**
   * Handle the click for heatmaps
   */
  const handleClick = (event: any) => {
    const analyticsWrapperPayload = {
      event: "mouse_click",
      id: "analyticsWrapper",
      timestamp: Date.now(),
      pathname,
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
