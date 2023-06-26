import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { useEffect, useState } from "react";
import * as React from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { applicationState } from "src/store/application/selector";
import { useUpsertNotificationTokenMutation } from "src/store/application/slice";

const firebaseConfig = {
  apiKey: "AIzaSyCZ1viKnJtYQfHEYAUHZTLCdnulMu-bfsI",
  authDomain: "fury-fight-club.firebaseapp.com",
  projectId: "fury-fight-club",
  storageBucket: "fury-fight-club.appspot.com",
  messagingSenderId: "510153483100",
  appId: "1:510153483100:web:e360384b28ebfe20fad799",
  measurementId: "G-HZ4QKHSPDM",
};

interface NotificationsProps {}

export const NotificationComponent: React.FunctionComponent<
  NotificationsProps
> = ({}) => {
  const dispatch = useDispatch();
  const { user, token, notification_token } = useSelector(applicationState);
  const [upsertNotificationToken] = useUpsertNotificationTokenMutation();
  const [notificationToken, setNotificationToken] = useState("");

  initializeApp(firebaseConfig);

  const messaging = getMessaging();

  const requestForToken = () => {
    return getToken(messaging, {
      vapidKey:
        "BB4FVTfiYmFxJfgg-8wIzn1liHiEnwomMVrjYU9wG_4kCNVReIYkjikuATPWzvDjLc3E-7n9KW_RqEEiP4HO8qo",
    })
      .then((currentToken) => {
        if (currentToken) {
          setNotificationToken(currentToken);
        } else {
          console.log(
            "No registration token available. Request permission to generate one."
          );
        }
      })
      .catch((err) => {
        console.log("An error occurred while retrieving token. ", err);
      });
  };

  const [permission, setPermission] = useState(Notification.permission);

  const handlePermissionRequest = async () => {
    try {
      const newPermission = await Notification.requestPermission();
      setPermission(newPermission);
    } catch (error) {
      console.error(
        "Erreur lors de la demande de permission de notification:",
        error
      );
    }
  };

  const onMessageListener = () =>
    new Promise((resolve) => {
      onMessage(messaging, (payload) => {
        toast.success(payload.notification?.body ?? "");
        resolve(payload);
      });
    });

  useEffect(() => {
    if (!("Notification" in window)) {
      console.log("Ce navigateur ne prend pas en charge les notifications");
    } else {
      handlePermissionRequest();
    }

    if ("serviceWorker" in navigator) {
      window.addEventListener("load", function () {
        navigator.serviceWorker
          .register("/firebase-messaging-sw.js")
          .then(function (registration) {
            console.log("Service worker enregistré avec succès:", registration);
          })
          .catch(function (error) {
            console.log(
              "Erreur lors de l'enregistrement du service worker:",
              error
            );
          });
      });
    }
  }, []);

  onMessageListener();

  useEffect(() => {
    if (permission === "granted") {
      requestForToken();
    }
  }, [permission]);

  useEffect(() => {
    if (token !== "" && token !== "") {
      upsertNotificationToken({
        token: notificationToken,
        platform: "WEB",
      });
    }
  }, [token, notificationToken]);

  return <div></div>;
};
