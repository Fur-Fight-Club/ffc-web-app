export const mergeClassNames = (
  classNames: (string | null | undefined | false)[]
) => {
  return classNames.filter(Boolean).join(' ');
};
