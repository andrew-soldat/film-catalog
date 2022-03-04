export const getGenre = (array, name) => {
   return array.find((i) => i.name.toLowerCase() === name.replace(/_/g, " "));
};
