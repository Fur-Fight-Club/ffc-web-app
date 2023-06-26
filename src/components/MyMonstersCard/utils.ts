export const convertApiTypeToLogo = (
  apiType: Monster["monster_type"] | string
) => {
  switch (apiType) {
    case "ELEMENTARY":
      return "🌋";
    case "FANTASTIC":
      return "🦄";
    case "MYTHOLOGICAL":
      return "🏛️";
    case "SCARY":
      return "👻";
    case "AQUATIC":
      return "🌊";
    case "WINGED":
      return "🪽";
    case "PREHISTORIC":
      return "🦖";
    case "MECHANICAL":
      return "⚙️";
    case "EXTRATERRESTRIAL":
      return "🛸";
    case "MAGICAL":
      return "🪄";
    default:
      return "❓";
  }
};

export const monsterType = [
  "ELEMENTARY",
  "FANTASTIC",
  "MYTHOLOGICAL",
  "SCARY",
  "AQUATIC",
  "WINGED",
  "PREHISTORIC",
  "MECHANICAL",
  "EXTRATERRESTRIAL",
  "MAGICAL",
];

