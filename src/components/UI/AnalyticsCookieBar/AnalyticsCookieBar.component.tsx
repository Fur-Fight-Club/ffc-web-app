"use client";

import * as React from "react";
// @ts-ignore
import styles from "./AnalyticsCookieBar.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { applicationState } from "src/store/application/selector";
import { Card, Spacer, Text } from "@nextui-org/react";
import { Button } from "../Button/Button.component";
import { setAnalyticsEnable } from "src/store/application/slice";

interface AnalyticsCookieBarProps {}

export const AnalyticsCookieBar: React.FunctionComponent<
  AnalyticsCookieBarProps
> = ({}) => {
  const { analytics } = useSelector(applicationState);
  const dispatch = useDispatch();

  return analytics.firstTimeVisiting ? (
    <div className={styles.fullBar}>
      <Card>
        <Card.Body>
          <div className={styles.innerCardBody}>
            <Text>
              Bienvenue sur Fury Fight Club ! Nous souhaitons récolter des
              données (statistique de navigation, user agent...) à des fins de
              statistiques. Êtes-vous d'accord ?
            </Text>
            <div className={styles.buttonsContainer}>
              <Button
                auto
                analyticsId="refuse-analytics-usage"
                onPress={() => dispatch(setAnalyticsEnable(false))}
                light
              >
                Je refuse
              </Button>
              <Spacer x={1} />
              <Button
                auto
                analyticsId="accept-analytics-usage"
                onPress={() => dispatch(setAnalyticsEnable(true))}
                color={"success"}
              >
                J'accepte
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  ) : (
    <div></div>
  );
};
