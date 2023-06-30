import { DemographicData } from "src/store/application/application.model";
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

function filterPathnameEventsFromRegexp(pathnameEvents: PathnameChangeEvent[]) {
  // remove everything that contains "/admin" or "/monster/" in the pathname
  const filteredPathnameEvents = pathnameEvents.filter(
    (event) =>
      !/\/admin/.test(event.event_id) &&
      !/\/monster\//.test(event.event_id) &&
      !/\/payments\//.test(event.event_id)
  );

  return filteredPathnameEvents;
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

function getAverageSessionTime(leaveAppEvents: LeaveAppEvent[]) {
  if (leaveAppEvents.length === 0) return "—";
  let timeSpent = 0;

  leaveAppEvents.forEach((event) => {
    if (event.visitedPages.length === 0) return;

    timeSpent +=
      event.visitedPages[event.visitedPages.length - 1].timestamp -
      event.visitedPages[0].timestamp;
  });

  return formatDuration(timeSpent / leaveAppEvents.length);
}

function getLast7DayVisitCount(appLeaveEvents: LeaveAppEvent[]) {
  const D1 = [
    new Date().setHours(0, 0, 0, 0),
    new Date().setHours(23, 59, 59, 999),
  ];
  const D2 = [
    new Date().setHours(0, 0, 0, 0) - 86400000,
    new Date().setHours(23, 59, 59, 999) - 86400000,
  ];
  const D3 = [
    new Date().setHours(0, 0, 0, 0) - 86400000 * 2,
    new Date().setHours(23, 59, 59, 999) - 86400000 * 2,
  ];
  const D4 = [
    new Date().setHours(0, 0, 0, 0) - 86400000 * 3,
    new Date().setHours(23, 59, 59, 999) - 86400000 * 3,
  ];
  const D5 = [
    new Date().setHours(0, 0, 0, 0) - 86400000 * 4,
    new Date().setHours(23, 59, 59, 999) - 86400000 * 4,
  ];
  const D6 = [
    new Date().setHours(0, 0, 0, 0) - 86400000 * 5,
    new Date().setHours(23, 59, 59, 999) - 86400000 * 5,
  ];
  const D7 = [
    new Date().setHours(0, 0, 0, 0) - 86400000 * 6,
    new Date().setHours(23, 59, 59, 999) - 86400000 * 6,
  ];

  const day1 = appLeaveEvents.filter((event) => {
    return event.timestamp >= D1[0] && event.timestamp <= D1[1];
  });

  const day2 = appLeaveEvents.filter((event) => {
    return event.timestamp >= D2[0] && event.timestamp <= D2[1];
  });

  const day3 = appLeaveEvents.filter((event) => {
    return event.timestamp >= D3[0] && event.timestamp <= D3[1];
  });

  const day4 = appLeaveEvents.filter((event) => {
    return event.timestamp >= D4[0] && event.timestamp <= D4[1];
  });

  const day5 = appLeaveEvents.filter((event) => {
    return event.timestamp >= D5[0] && event.timestamp <= D5[1];
  });

  const day6 = appLeaveEvents.filter((event) => {
    return event.timestamp >= D6[0] && event.timestamp <= D6[1];
  });

  const day7 = appLeaveEvents.filter((event) => {
    return event.timestamp >= D7[0] && event.timestamp <= D7[1];
  });

  return [
    {
      day: 7,
      count: day7.length,
    },
    {
      day: 6,
      count: day6.length,
    },
    {
      day: 5,
      count: day5.length,
    },
    {
      day: 4,
      count: day4.length,
    },
    {
      day: 3,
      count: day3.length,
    },
    {
      day: 2,
      count: day2.length,
    },
    {
      day: 1,
      count: day1.length,
    },
  ];
}

function getProportionOfCountries(demographicData: DemographicData[]) {
  const countries = demographicData.map((data) => data.country);
  const uniqueCountries = new Set(countries);
  const countryCount = Array.from(uniqueCountries).map((country) => {
    const count = countries.filter((c) => c === country).length;
    return {
      country,
      count,
      proportion: +(count / countries.length).toFixed(2),
    };
  });
  return countryCount;
}

function getProportionOfISPs(demographicData: DemographicData[]) {
  const isps = demographicData.map((data) => data.isp);
  const uniqueIsps = new Set(isps);
  const ispCount = Array.from(uniqueIsps).map((isp) => {
    const count = isps.filter((c) => c === isp).length;
    return {
      isp,
      count,
      proportion: +(count / isps.length).toFixed(2),
    };
  });
  return ispCount;
}

export const analytics = {
  uniqueVisitor: countUniqueUuids,
  uniqueButtonClicked: getButtonClickEventsCount,
  debounceRate: calculateDebounceRate,
  averagePageVisited: calculateAveragePageVisited,
  averageTimeSpentOnEachPage: calculateAverageTimeSpentOnEachPage,
  averageSessionTime: getAverageSessionTime,
  aggregateUserAgents: aggregateAllUserAgents,
  getLastVisitors: getLast7DayVisitCount,
  filter: {
    pathname: filterPathnameEventsFromRegexp,
  },
  proportion: {
    language: getProportionOfLanguage,
    platform: getProportionOfPlatform,
    browser: getProportionOfBrowser,
    countries: getProportionOfCountries,
    isps: getProportionOfISPs,
    //os: getProportionOfOS,
  },
};
