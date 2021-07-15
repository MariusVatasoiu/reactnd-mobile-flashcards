import { AsyncStorage as Storage } from "react-native";
import * as Notifications from "expo-notifications";

const NOTIFICATION_KEY = "Flashcards:notifications";

// ONLY FOR WEB TESTING
// Storage = localStorage;

export function generateUID() {
  return Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
}

export function timeToString(time = Date.now()) {
  const date = new Date(time);
  const todayUTC = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
  );
  return todayUTC.toISOString().split("T")[0];
}

export function clearLocalNotification() {
  // ONLY FOR WEB
  // Storage.removeItem(NOTIFICATION_KEY);
  // return Notifications.cancelAllScheduledNotificationsAsync();

  return Promise.resolve(Storage.removeItem(NOTIFICATION_KEY))
    .then(Notifications.cancelAllScheduledNotificationsAsync);
}

function createNotification() {
  return {
    title: "Start a quiz!",
    body: "👋 don't forget to do a quiz for today!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: "high",
      sticky: false,
      vibrate: true,
    },
  };
}

export function setLocalNotification() {
  Promise.resolve(Storage.getItem(NOTIFICATION_KEY))
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Notifications.requestPermissionsAsync()
          .then(({ status }) => {
            if (status === "granted") {
              Notifications.cancelAllScheduledNotificationsAsync();

              let tomorrow = new Date();
              tomorrow.setDate(tomorrow.getDate() + 1);
              tomorrow.setHours(20);
              tomorrow.setMinutes(0);

              Notifications.scheduleNotificationAsync({
                content: {
                  title: "Start a quiz!",
                },
                trigger: {
                  type: "daily",
                  hour: 23,
                  minute: 0,
                },
              });

              Storage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
            }
          }).catch((error) => console.warn(error));
      }
    });
}
