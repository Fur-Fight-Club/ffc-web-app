import {
  ButtonClickEvent,
  LeaveAppEvent,
  MouseClickEvent,
  OS,
  PathnameChangeEvent,
  UserAgent,
} from "src/store/application/constants";

// Function that count how many uuids are unique
export const countUniqueUuids = (closeAppEvents: LeaveAppEvent[]) => {
  const uuids = closeAppEvents.map((event) => event.uuid);
  const uniqueUuids = new Set(uuids);
  return uniqueUuids.size;
};

// Function that calculate the debounce rate
export const calculateDebounceRate = (
  closeAppEvents: LeaveAppEvent[]
): number => {
  const eventWithOneVisitedPage = closeAppEvents.filter(
    (event) => event.visitedPages.length === 1
  );
  return +(eventWithOneVisitedPage.length / closeAppEvents.length).toFixed(2);
};

// Function that calculate the average number of page visisted per session
export const calculateAveragePageVisited = (
  closeAppEvents: LeaveAppEvent[]
): number => {
  const totalVisitedPages = closeAppEvents.reduce(
    (acc, event) => acc + event.visitedPages.length,
    0
  );
  return +(totalVisitedPages / closeAppEvents.length).toFixed(0);
};

// Calculate average time spent on each page
export const calculateAverageTimeSpentOnEachPage = (
  pathnameEvents: PathnameChangeEvent[]
) => {
  // Map unique pages
  const uniquePages = new Set(pathnameEvents.map((event) => event.event_id));

  // For each unique page, calculate the average time spent
  const averageTimeSpentOnEachPage = Array.from(uniquePages).map((page) => {
    const events = pathnameEvents.filter((event) => event.event_id === page);
    // Add all startTime and divide by the number of events
    const totalTimeSpent = events.reduce(
      (acc, event) => acc + (event.endTime - event.startTime),
      0
    );
    return {
      page,
      averageTimeSpent: +(totalTimeSpent / events.length).toFixed(0),
      readableTimeSpent: formatDuration(totalTimeSpent / events.length),
    };
  });

  return averageTimeSpentOnEachPage;
};

function formatDuration(milliseconds: number) {
  const seconds = Math.floor((milliseconds / 1000) % 60);
  const minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
  const hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24);

  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = seconds.toString().padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

function aggregateAllUserAgents(
  leaveAppEvent: LeaveAppEvent[],
  pathnameEvents: PathnameChangeEvent[],
  mouseClickEvents: MouseClickEvent[]
) {
  const allUserAgents = leaveAppEvent.map((event) => event.userAgent);
  const allUserAgents2 = pathnameEvents.map((event) => event.userAgent);
  const allUserAgents3 = mouseClickEvents.map((event) => event.userAgent);
  return [...allUserAgents, ...allUserAgents2, ...allUserAgents3];
}

function getProportionOfLanguage(userAgents: UserAgent[]) {
  const languages = userAgents.map((userAgent) => userAgent.language);
  const uniqueLanguages = new Set(languages);
  const languageCount = Array.from(uniqueLanguages).map((language) => {
    const count = languages.filter((lang) => lang === language).length;
    return {
      language,
      count,
      proportion: +(count / languages.length).toFixed(2),
    };
  });
  return languageCount;
}

function getProportionOfPlatform(userAgents: UserAgent[]) {
  const platforms = userAgents.map((userAgent) => userAgent.platform);
  const uniquePlatforms = new Set(platforms);
  const platformCount = Array.from(uniquePlatforms).map((platform) => {
    const count = platforms.filter((plat) => plat === platform).length;
    return {
      platform,
      count,
      proportion: +(count / platforms.length).toFixed(2),
    };
  });
  return platformCount;
}

function getProportionOfOS(userAgents: UserAgent[]) {
  const osArray = userAgents.map(
    (userAgent) => userAgent.os.name ?? "Unknown OS"
  );
  const uniqueOS = new Set(osArray);
  const osCount = Array.from(uniqueOS).map((os) => {
    const count = osArray.filter((os) => os === os).length;
    return {
      os,
      count,
      proportion: +(count / osArray.length).toFixed(2),
    };
  });
  return osCount;
}

function getProportionOfOSVersion(osArray: OS[]) {
  const osVersions = osArray.map((os) => os.version);
  const uniqueOSVersions = new Set(osVersions);
  const osVersionCount = Array.from(uniqueOSVersions).map((osVersion) => {
    const count = osVersions.filter((os) => os === osVersion).length;
    return {
      osVersion,
      count,
      proportion: +(count / osVersions.length).toFixed(2),
    };
  });
  return osVersionCount;
}

function getProportionOfBrowser(userAgents: UserAgent[]) {
  const browsers = userAgents.map(
    (userAgent) => userAgent.browser.name ?? "Unknown browser"
  );
  const uniqueBrowsers = new Set(browsers);
  const browserCount = Array.from(uniqueBrowsers).map((browser) => {
    const count = browsers.filter((brow) => brow === browser).length;
    return {
      browser,
      count,
      proportion: +(count / browsers.length).toFixed(2),
    };
  });
  return browserCount;
}

function getButtonClickEventsCount(buttonClickEvents: ButtonClickEvent[]) {
  // Get individual button click events
  const bce = buttonClickEvents.map((event) => event.event_id);
  // Get unique button click events
  const uniqueButtonClickEvents = new Set(bce);

  // Return the number of unique button click events
  const uniqueButtons = Array.from(uniqueButtonClickEvents).map((event) => {
    const count = buttonClickEvents.filter(
      (ev) => ev.event_id === event
    ).length;
    return {
      event,
      count,
      content: buttonClickEvents.find((ev) => ev.event_id === event)
        ?.buttonContent,
    };
  });

  // Sort by count
  uniqueButtons.sort((a, b) => b.count - a.count);

  return uniqueButtons;
}

export const analytics = {
  uniqueVisitor: countUniqueUuids,
  uniqueButtonClicked: getButtonClickEventsCount,
  debounceRate: calculateDebounceRate,
  averagePageVisited: calculateAveragePageVisited,
  averageTimeSpentOnEachPage: calculateAverageTimeSpentOnEachPage,
  aggregateUserAgents: aggregateAllUserAgents,
  proportion: {
    language: getProportionOfLanguage,
    platform: getProportionOfPlatform,
    browser: getProportionOfBrowser,
    //os: getProportionOfOS,
  },
};
