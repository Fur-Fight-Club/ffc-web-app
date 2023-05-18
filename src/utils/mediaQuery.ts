// Define breakpoints based on application needs

enum BreakpointsValues {
  mobileS = '320px',
  mobileM = '375px',
  mobileL = '425px',
  tablet = '768px',
  laptop = '1024px',
  laptopL = '1440px',
  desktop = '2560px',
}

export const devices = {
  mobileS: `(min-width: ${BreakpointsValues.mobileS})`,
  mobileM: `(min-width: ${BreakpointsValues.mobileM})`,
  mobileL: `(min-width: ${BreakpointsValues.mobileL})`,
  tablet: `(min-width: ${BreakpointsValues.tablet})`,
  laptop: `(min-width: ${BreakpointsValues.laptop})`,
  laptopL: `(min-width: ${BreakpointsValues.laptopL})`,
  desktop: `(min-width: ${BreakpointsValues.desktop})`,
};

export const mediaQuery = (key: keyof typeof devices) => {
  return (style: TemplateStringsArray | String) =>
    `@media ${devices[key]} { ${style} }`;
};
