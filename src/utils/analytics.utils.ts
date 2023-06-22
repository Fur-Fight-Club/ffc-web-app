import {
  LeaveAppEvent,
  PathnameChangeEvent,
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
      averageTimeSpent: +(totalTimeSpent / events.length),
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

export const analytics = {
  uniqueVisitor: countUniqueUuids,
  debounceRate: calculateDebounceRate,
  averagePageVisited: calculateAveragePageVisited,
  averageTimeSpentOnEachPage: calculateAverageTimeSpentOnEachPage,
};
