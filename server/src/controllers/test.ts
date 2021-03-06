// const logger = Logger.create('analytic-api.ts');

// const cloneDate = (
//   orgDate: Date,
//   yearsDiff?: number,
//   monthsDiff?: number,
//   daysDiff?: number,
// ): Date => {
//   const clonedDate = new Date(orgDate);
//   if (yearsDiff) clonedDate.setUTCFullYear(clonedDate.getUTCFullYear() + yearsDiff);
//   if (monthsDiff) clonedDate.setUTCMonth(clonedDate.getUTCMonth() + monthsDiff);
//   if (daysDiff) clonedDate.setUTCDate(clonedDate.getUTCDate() + daysDiff);
//   return clonedDate;
// };

// const apis: expressHandler[] = [
//   // @done, GetBinsOfAge
//   {
//     path: '/analytic/age',
//     method: 'GET',
//     customMiddleWares: [verifyAccessToken],
//     action: async (req, res) => {
//       try {
//         logger.info(req.originalUrl, req.method, req.params, req.query, req.body);

//         const filter = req.query;

//         const customedFilter = { ...filter };
//         const groupSearchFields = ['resourceCode'];
//         groupSearchFields.forEach((field) => {
//           if (field in filter) {
//             const orgArray: string[] = filter[field].toString().split(',');
//             const regexArray = orgArray.map((v) => new RegExp(`^${v}`));
//             (customedFilter as any).resourceCode = { $in: regexArray };
//           }
//         });

//         const currentDate = new Date();
//         const totalForms = await formRepo.countFormsByFilters(customedFilter);

//         const binResults = [];
//         for (let i = 5; i <= 100; i += 5) {
//           const leftBound = cloneDate(currentDate, -i);
//           const rightBound = cloneDate(currentDate, -i + 5);
//           // eslint-disable-next-line no-await-in-loop
//           const numForms = await formRepo.countFormsByFilters({
//             ...customedFilter,
//             dob: { $gte: leftBound, $lt: rightBound },
//           });

//           const binRes = {
//             leftBound,
//             rightBound,
//             ageFrom: i - 5,
//             ageTo: i,
//             numForms,
//             totalForms,
//             percentage: totalForms ? numForms / totalForms : -1,
//           };
//           binResults.push(binRes);
//         }

//         return binResults;
//       } catch (err) {
//         console.log(err);
        
//       }
//     },
//   },
// ];

// export default apis;