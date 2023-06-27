
export const getImageByAmount = (amount: number): string => {
    let imageName = '';
  
    if (amount >= 0 && amount <= 475) {
      imageName = '1.png';
    } else if (amount > 475 && amount <= 1000) {
      imageName = '2.png';
    } else if (amount > 1000 && amount <= 2050) {
      imageName = '3.png';
    } else if (amount > 2050 && amount <= 3500) {
      imageName = '4.png';
    } else if (amount > 3500 && amount <= 4000) {
      imageName = '5.png';
    } else if (amount > 4000 && amount <= 5000) {
        imageName = '6.png';
    } else {
      imageName = '1.png';
    }
  
    return imageName;
  };