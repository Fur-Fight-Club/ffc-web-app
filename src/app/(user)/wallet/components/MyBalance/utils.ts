
export const getImageByAmount = (amount: number): string => {
    let imageName = '';
  
    if (amount >= 0 && amount <= 475) {
      imageName = '1.png';
    } else if (amount > 475 && amount <= 1000) {
      imageName = '2.png';
    } else if (amount > 1000 && amount <= 2050) {
      imageName = '3.png';
    } else if (amount > 2050 && amount <= 3650) {
      imageName = '4.png';
    } else if (amount > 3650 && amount <= 5350) {
      imageName = '5.png';
    } else if (amount > 5350 && amount > 11000) {
        imageName = '6.png';
    } else {
      imageName = '1.png';
    }
  
    return imageName;
  };