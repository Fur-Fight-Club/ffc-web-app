/* eslint-disable @next/next/no-sync-scripts */
"use client";
import { NextUIProvider, createTheme } from "@nextui-org/react";
import styles from "@styles/_colors.module.scss";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Poppins } from "next/font/google";
import * as React from "react";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { store } from "src/store/store";

import { AnalyticsWrapper } from "@components/AnalyticsWrapper/AnalyticsWrapper.component";
import { AnalyticsCookieBar } from "@components/UI/AnalyticsCookieBar/AnalyticsCookieBar.component";
import { NotificationComponent } from "src/services/firebase.service";
import "./globals.scss";
import { PerformanceWidget } from "@components/PerformanceWidget/PerformanceWidget.component";
import { SocketContext } from "src/contexts/socket.context";
import { UserHydrator } from "@components/UserHydrator.component";
const poppins = Poppins({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const lightTheme = createTheme({
  type: "light",
  theme: {
    colors: {
      primaryLight: styles.primaryT200,
      primaryLightHover: styles.primaryT200,
      primaryLightActive: styles.primaryT200,
      primaryLightContrast: styles.white,
      primary: styles.primary,
      primaryBorder: styles.primaryS100,
      primaryBorderHover: styles.primaryS200,
      primarySolidHover: styles.primaryS300,
      primarySolidContrast: styles.white,
      primaryShadow: styles.primary,

      gradient:
        "linear-gradient(112deg, $blue100 -25%, $pink500 -10%, $purple500 80%)",
      link: "#5E1DAD",
    },
    space: {},
    fonts: {},
  },
});

const darkTheme = createTheme({
  type: "dark",
  theme: {
    colors: {
      primaryLight: "$green200",
      primaryLightHover: "$green300",
      primaryLightActive: "$green400",
      primaryLightContrast: "$green600",
      primary: "#b91919",
      primaryBorder: "$green500",
      primaryBorderHover: "$green600",
      primarySolidHover: "$green700",
      primarySolidContrast: "$white",
      primaryShadow: "$green500",

      gradient:
        "linear-gradient(112deg, $blue100 -25%, $pink500 -10%, $purple500 80%)",
      link: "#5E1DAD",

      myColor: "#ff4ecd",
    },
    space: {},
    fonts: {},
  },
});

type RootLayoutProps = {
  children: React.ReactNode;
};

let persistor = persistStore(store);

export default function RootLayout({ children }: RootLayoutProps) {
  const socket = React.useContext(SocketContext);
  return (
    <html lang="fr">
      <body className={poppins.className} style={{ minHeight: "100vh" }}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <UserHydrator />
            <SocketContext.Provider value={socket}>
              <PerformanceWidget />
              <AnalyticsWrapper>
                <AnalyticsCookieBar />
                {/* <NotificationComponent /> */}

                <NextThemesProvider
                  defaultTheme="light"
                  attribute="class"
                  value={{
                    light: lightTheme.className,
                    dark: darkTheme.className,
                  }}
                >
                  <Toaster
                    position="bottom-left"
                    reverseOrder={false}
                    gutter={8}
                    containerClassName=""
                    containerStyle={{}}
                    toastOptions={{
                      className: "",
                      duration: 5000,
                    }}
                  />
                  <NextUIProvider theme={lightTheme}>{children}</NextUIProvider>
                </NextThemesProvider>
                {/* <ReactQueryDevtools initialIsOpen={false} /> */}
              </AnalyticsWrapper>
            </SocketContext.Provider>
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
