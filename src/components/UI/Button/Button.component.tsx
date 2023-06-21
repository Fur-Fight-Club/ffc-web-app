"use client";

import * as React from "react";
// @ts-ignore
import styles from "./Button.module.scss";
import {
  Button as NUIButton,
  ButtonProps as NUIButtonProps,
  PressEvent,
} from "@nextui-org/react";
import { useSelector } from "react-redux";
import { applicationState } from "src/store/application/selector";
import { usePathname } from "next/navigation";
import { ButtonClickEvent } from "src/store/application/constants";
import { useCreateButtonClickEventMutation } from "src/store/application/slice";

export type ButtonProps = NUIButtonProps & {
  analyticsId?: string;
};

export const Button: React.FunctionComponent<ButtonProps> = ({
  analyticsId,
  onPress,
  ...props
}) => {
  const pathname = usePathname();
  const { analytics, user } = useSelector(applicationState);
  const [createButtonClickEvent] = useCreateButtonClickEventMutation();
  const handleClick = (e: PressEvent) => {
    onPress && onPress(e);
    const analyticsPayload: ButtonClickEvent = {
      event: "button_click",
      event_id: analyticsId ?? "default",
      user: user.id,
      uuid: analytics.uuid,
      timestamp: Date.now(),
      pathname,
      buttonContent: props.children as string,
    };
    analytics.enabled && createButtonClickEvent(analyticsPayload);
  };
  return <NUIButton {...props} onPress={handleClick} />;
};
