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
  useCreateLeaveAppEventMutation,
  useCreateMouseClickEventMutation,
  useCreatePathnameChangeEventMutation,
} from "src/store/application/slice";
import {
  LeaveAppEvent,
  MouseClickEvent,
  PathnameChangeEvent,
} from "src/store/application/constants";
import { date } from "zod";

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
  const [createPageLeaveEvent] = useCreateLeaveAppEventMutation();
  const handleLeave = () => {
    const pageUnloadAnalyticsPayload: LeaveAppEvent = {
      event: "page_unload",
      event_id: "analyticsWrapper",
      user: user.id,
      uuid: analytics.uuid,
      timestamp: Date.now(),
      visitedPages: analytics.session.pageVisited,
      // @ts-ignore
      userAgent,
    };

    // Send the payload to the server
    analytics.enabled && createPageLeaveEvent(pageUnloadAnalyticsPayload);

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

  useEffect(() => {
    const handleUnload = (event: any) => {
      event.preventDefault();
    };

    // window.addEventListener("beforeunload", handleUnload);
    // handleLeave();

    // return () => {
    //   window.removeEventListener("beforeunload", handleUnload);
    // };
  }, []);

  /**
   * Handle the page change
   */
  const [createPathnameChangeEvent] = useCreatePathnameChangeEventMutation();
  useEffect(() => {
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
    const pageAnalyticsPayload: PathnameChangeEvent = {
      event: "pathname_change",
      event_id: pathname,
      uuid: analytics.uuid,
      timestamp: Date.now(),
      user: user.id,
      startTime: analytics.session.startTime,
      endTime: Date.now(),
      // @ts-ignore
      userAgent,
    };

    // Send the payload to the server
    analytics.enabled && createPathnameChangeEvent(pageAnalyticsPayload);

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
  const [createClickEvent] = useCreateMouseClickEventMutation();
  const handleClick = (event: any) => {
    const analyticsWrapperPayload: MouseClickEvent = {
      event: "mouse_click",
      event_id: "analyticsWrapper",
      timestamp: Date.now(),
      pathname,
      click: {
        x: event.clientX,
        y: event.clientY,
      },
      window: {
        width: window !== undefined ? window.innerWidth : 0,
        height: window !== undefined ? window.innerHeight : 0,
      },
      // @ts-ignore
      userAgent,
      user: user.id,
      uuid: analytics.uuid,
    };

    analytics.enabled && createClickEvent(analyticsWrapperPayload);
  };

  return (
    <div onClickCapture={handleClick} className={styles.fullPage}>
      {children}
    </div>
  );
};
