export const getPagesCount = (totalCount, limit) => {
   return Math.ceil(totalCount / limit);
};

export const getPagesArray = (totalCount) => {
   const totalPages = [];
   for (let i = 1; i <= totalCount; i++) {
      totalPages.push(i);
   }
   return totalPages;
};
