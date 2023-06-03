export const parseWheightCategory = (weight: string) => {
  //'A_HECKING_CHONKER' => 'A HECKING CHONKER'
  const weightCategory = weight.split('_').join(' ');
  const weightCategoryCapitalized = weightCategory
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  return weightCategoryCapitalized;
};
