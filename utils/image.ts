
export const imageMap: Record<string, any> = {
    '1.jpg': require('@/assets/images/1.jpg'),
    '2.jpg': require('@/assets/images/2.jpg'),
    '3.jpg': require('@/assets/images/3.jpg'),
    '4.jpg': require('@/assets/images/4.jpg'),
    '5.jpg': require('@/assets/images/5.jpg'),
  };
  
  export type ImageKey = keyof typeof imageMap;