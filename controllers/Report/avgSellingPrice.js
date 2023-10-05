// const property = require("../../models/Bookings/bookings");
// const rate = require("../../models/Rooms/ratePlan")
// const room = require("../../models/Rooms/roomTypeDetails")
// const {
//   format,
//   subMonths,
//   subDays,
//   startOfMonth,
//   endOfMonth,
//   parse,
//   isBefore,
// } = require("date-fns");

// module.exports = async (req, res) => {
//   try {
//     const allBooking = await property.find({
//       propertyId: req.query.propertyId,
//     });
//     const currentDate = new Date();
//     const days = req.query.days;
//     let totalGrossRevenue = 0;
//     let averageRevenue = 0;
//     if (days === "6 months" || days === "3 months") {
//       if (days === "6 months") {
//         b = parseInt(days.slice(0, 2));
//         if (b === 6) {
//           var g = 6;
//         }
//       } else if (days === "3 months") {
//         b = parseInt(days.slice(0, 2));
//         if (b === 3) {
//           var g = 3;
//         }
//       }

//       function getPreviousMonths(currentDate, g) {
//         const previousMonths = [];

//         for (let i = 0; i < g; i++) {
//           const startDate = startOfMonth(subMonths(currentDate, i));
//           const endDate = isBefore(currentDate, endOfMonth(startDate))
//             ? currentDate
//             : endOfMonth(startDate);

//           const startDateFormatted = format(startDate, "d MMM");
//           const endDateFormatted = format(endDate, "d MMM");

//           previousMonths.push(`${startDateFormatted} - ${endDateFormatted}`);
//         }

//         return previousMonths;
//       }

//       const previousMonths = getPreviousMonths(currentDate, g);
//       const dateCounts = {};
//       for (const booking of allBooking) {
//         for (const bookingDetails of booking.roomDetails) {
//           const bookingDate = parse(
//             booking.createdAt,
//             "dd/M/yyyy, hh:mm:ss a",
//             new Date()
//           );

//           for (const dateRange of previousMonths) {
//             const [startDateStr, endDateStr] = dateRange.split(" - ");
//             const startDate = parse(startDateStr, "d MMM", currentDate);
//             const endDate = parse(endDateStr, "d MMM", currentDate);

//             if (
//               isBefore(bookingDate, endDate) &&
//               isBefore(startDate, bookingDate)
//             ) {
//               if (!dateCounts[dateRange]) {
//                 dateCounts[dateRange] = {};
//               }

//               // Calculate and accumulate the roomPrice for this room type
//               const roomTypeId = bookingDetails.roomTypeId;
//               const roomPrice = bookingDetails.roomPrice;

//               if (!dateCounts[dateRange][roomTypeId]) {
//                 dateCounts[dateRange][roomTypeId] = 0;
//               }

//               // Add roomPrice to the existing value for this roomTypeId
//               dateCounts[dateRange][roomTypeId] += parseInt(roomPrice);
//             }
//           }
//         }
//       }

//       const dateCountArrayformonth = previousMonths.map((dateRange) => ({
//         date: dateRange,
//         count: dateCounts[dateRange] || 0,
//       }));

//       const dates = [];

//       for (const item of dateCountArrayformonth) {
//         dates.push(item.date);
//       }

//       const revenue = [];
//       for (const dateRange of previousMonths) {
//         if (dateCounts[dateRange]) {
//           const totalRoomPrice = Object.values(dateCounts[dateRange]).reduce(
//             (acc, val) => acc + val,
//             0
//           );
//           revenue.push(totalRoomPrice);
//           totalGrossRevenue += totalRoomPrice;
//         } else {
//           revenue.push(0);
//         }
//       }

//       var percentage = (revenue[revenue.length - 1] - revenue[0]) / revenue[0];

//       if (isNaN(percentage) || percentage === 0 || percentage === undefined) {
//         percentage = 0;
//       }

//       const response = {
//         dates: dates,
//         revenue: revenue,
//         totalRoomPrice: totalGrossRevenue,
//         percentage: percentage,
//       };

//       //console.log(revenue);

//       return res.status(200).json(response);
//     } else {
//       const dateFormat = "dd/M/yyyy"; // Change the date format to "dd/M/yyyy"
//       const counts = [];

//       if (days === "7 days" || days === "15 days" || days === "30 days") {
//         const b = parseInt(days.slice(0, 2));
//         if (b === 7) {
//           var g = 7;
//         } else if (b === 15) {
//           var g = 15;
//         } else if (b === 30) {
//           var g = 30;
//         }

//         //const dateFormat = "dd/M/yyyy"; // Change the date format to "dd/M/yyyy"
//         const currentDateFormatted = format(currentDate, dateFormat); // Get current date in "dd/M/yyyy" format

//         const add = getPastDays(currentDateFormatted, g);

//         function getPastDays(inputDate, numDays) {
//           const startDate = parse(inputDate, dateFormat, new Date());
//           const dateArray = [];

//           for (let i = 0; i < numDays; i++) {
//             const date = subDays(startDate, i);
//             const formattedDate = format(date, dateFormat);
//             dateArray.push(formattedDate);
//           }

//           return dateArray;
//         }

//         const dateCounts = {};
//         const totalGrossRevenueByRoomType = {}; // Store total gross revenue for each room type
//         const percentageByRoomType = {}; // Store percentage for each room type

//         for (const booking of allBooking) {
//             for (const bookingDetails of booking.roomDetails) {
//               const datePortion = booking.createdAt.split(",")[0].trim();

//               if (add.includes(datePortion)) {
//                 if (!dateCounts[datePortion]) {
//                   dateCounts[datePortion] = {};
//                 }

//                 const roomTypeId = bookingDetails.roomTypeId;
//                 const ratePlane = await rate.findOne({ roomTypeId: roomTypeId });
//                 const roomname = await room.findOne({roomTypeId :roomTypeId})

//                 const { ratePlaneName } = ratePlane;
//                 const ratePlaneNameArray = Array.isArray(ratePlaneName) ? ratePlaneName : []; // Convert to an array if not already
//                 const ratePlanname = ratePlaneNameArray.length > 0 ? ratePlaneNameArray[0].ratePlaneName : "Unknown";

//                 const roomTypeName = roomname.roomName[0].roomName; // Get the roomTypeName here
//                 const roomPrice = bookingDetails.roomPrice;

//                 if (!dateCounts[datePortion][roomTypeId]) {
//                   dateCounts[datePortion][roomTypeId] = 0;
//                 }

//                 // Add roomPrice to the existing value for this roomTypeId
//                 dateCounts[datePortion][roomTypeId] += parseInt(roomPrice);

//                 // Calculate totalGrossRevenue and percentage for this room type
//                 if (!totalGrossRevenueByRoomType[roomTypeId]) {
//                   totalGrossRevenueByRoomType[roomTypeId] = 0;
//                 }

//                 totalGrossRevenueByRoomType[roomTypeId] += parseInt(roomPrice);

//                 if (!percentageByRoomType[roomTypeId]) {
//                   percentageByRoomType[roomTypeId] = {
//                     roomTypeName: roomTypeName,
//                     ratePlanname: ratePlanname,
//                     percentage: 0, // Initialize percentage
//                   };
//                 }

//                 percentageByRoomType[roomTypeId].percentage =
//                   ((totalGrossRevenueByRoomType[roomTypeId] - counts[0]) /
//                     counts[0]) *
//                   100;
//               }
//             }
//           }

//         // Now you have totalGrossRevenue and percentage for each room type in the respective objects

//         //console.log(totalcount)

//         const dateCountArray = add.map((date) => ({
//           date: date,
//           count: dateCounts[date]
//             ? typeof dateCounts[date] === "object"
//               ? Object.values(dateCounts[date]).reduce(
//                   (acc, val) => acc + val,
//                   0
//                 )
//               : dateCounts[date]
//             : 0,
//         }));

//         const dates = [];

//         for (const item of dateCountArray) {
//           dates.push(item.date);
//         }

//         const revenue = [];
//         for (const datePortion of add) {
//           if (dateCounts[datePortion]) {
//             const totalRoomPrice = Object.values(
//               dateCounts[datePortion]
//             ).reduce((acc, val) => acc + val, 0);
//             revenue.push(totalRoomPrice);
//             totalGrossRevenue += totalRoomPrice;
//           } else {
//             revenue.push(0);
//           }
//         }

//         // var percentage =
//         //   (revenue[revenue.length - 1] - revenue[0]) / revenue[0];

//         // if (isNaN(percentage) || percentage === 0 || percentage === undefined) {
//         //   percentage = 0;
//         // }

//         const response = {
//             totalGrossRevenue: totalGrossRevenue,
//             percentage: percentage,
//             percentageByRoomType: percentageByRoomType,
//         };

//         return res.status(200).json(response);
//       }
//     }
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// };

const bookingDetails = require("../../models/Bookings/bookings");
const { parse, format, parseISO,subDays,isBefore,subMonths,endOfMonth,startOfMonth, differenceInDays } = require("date-fns");


module.exports = async (req, res) => {
  const booking = await bookingDetails.find({
    propertyId: req.query.propertyId,
  });

  const days = req.query.days;

  const dateFormat = "dd/M/yyyy";

  if (days === "7 days" || days === "15 days" || days === "30 days") {
    const b = parseInt(days.slice(0, 2));
    if (b === 7) {
      var g = 7;
    } else if (b === 15) {
      var g = 15;
    } else if (b === 30) {
      var g = 30;
    }

    const currentDate = new Date();
    const currentDateFormatted = format(currentDate, dateFormat); // Get current date in "dd/M/yyyy" format

    const add = getPastDays(currentDateFormatted, g);

    function getPastDays(inputDate, numDays) {
      const startDate = parse(inputDate, dateFormat, new Date());
      const dateArray = [];

      for (let i = 0; i < numDays; i++) {
        const date = subDays(startDate, i);
        const formattedDate = format(date, dateFormat);
        dateArray.push(formattedDate);
      }

      return dateArray;
    }

    const ranges = ["0", "1-3", "4-7", "8-15", "16-30", "31-more"];
    const counts = [0, 0, 0, 0, 0, 0];

    for (const bookingdata of booking) {
      const checkinDate = bookingdata.checkInDate;
      const createdAtDate = bookingdata.createdAt;
      const datePortion = createdAtDate.split(",")[0].trim();

      if (add.includes(datePortion)) {
        const parsedCheckinDate = parse(checkinDate, "yyyy-MM-dd", new Date());
        const parsedCreatedAtDate = parse(datePortion, "d/M/yyyy", new Date());

        const daysDifference = differenceInDays(
          parsedCheckinDate,
          parsedCreatedAtDate
        );

        if (daysDifference === 0) {
          counts[0]++;
        }
        if (daysDifference >= 1 && daysDifference <= 3) {
          counts[1]++;
        } else if (daysDifference >= 4 && daysDifference <= 7) {
          counts[2]++;
        } else if (daysDifference >= 8 && daysDifference <= 15) {
          counts[3]++;
        } else if (daysDifference >= 16 && daysDifference <= 30) {
          counts[4]++;
        } else if(daysDifference > 31 ) {
          counts[5]++;
        }
      }
    }
    const rangesWithCounts = {};

    for (let i = 0; i < ranges.length; i++) {
      rangesWithCounts[ranges[i]] = counts[i];
    }

    const values = [];

    for (const key in rangesWithCounts) {
      if (rangesWithCounts.hasOwnProperty(key)) {
        const value = rangesWithCounts[key];
        values.push(value);
        console.log(`Key: ${key}, Value: ${value}`);
      }
    }

    return res.status(200).send(values);
  } else {
    if (days === "6 months" || days === "3 months") {
      if (days === "6 months") {
        b = parseInt(days.slice(0, 2));
        if (b === 6) {
          var g = 6;
        }
      } else if (days === "3 months") {
        b = parseInt(days.slice(0, 2));
        if (b === 3) {
          var g = 3;
        }
      }
    }

    const currentDate = new Date();
    //const currentDateFormatted = format(currentDate, dateFormat); // Get current date in "dd/M/yyyy" format
    //console.log(currentDateFormatted)

    // const add = getPastDays(currentDateFormatted, g);
    const previousMonths = getPreviousMonths(currentDate, g);

    function getPreviousMonths(currentDate, g) {
      const previousMonths = [];

      for (let i = 0; i < g; i++) {
       
        const startDate = startOfMonth(subMonths(currentDate, i));
        const endDate = isBefore(currentDate, endOfMonth(startDate))
          ? currentDate
          : endOfMonth(startDate);

        
        const startDateFormatted = format(startDate, "d MMM");
        
        const endDateFormatted = format(endDate, "d MMM");

        previousMonths.push(`${startDateFormatted} - ${endDateFormatted}`);
      }

      return previousMonths;
    }

    

    console.log(previousMonths);

    const ranges = ["0", "1-3", "4-7", "8-15", "16-30", "31-more"];
    const counts = [0, 0, 0, 0, 0, 0];

    for (const bookingdata of booking) {
      const checkinDate = bookingdata.checkInDate;
      const createdAtDate = bookingdata.createdAt;
      const datePortion = createdAtDate.split(",")[0].trim();
      
      if (isDateWithinRange(datePortion, previousMonths)) {
        const parsedCheckinDate = parse(checkinDate, "yyyy-MM-dd", new Date());
        const parsedCreatedAtDate = parse(datePortion, "d/M/yyyy", new Date());
        const daysDifference = differenceInDays(parsedCheckinDate, parsedCreatedAtDate);

        if (daysDifference === 0) {
          counts[0]++;
        }
        if (daysDifference >= 1 && daysDifference <= 3) {
          counts[1]++;
        } else if (daysDifference >= 4 && daysDifference <= 7) {
          counts[2]++;
        } else if (daysDifference >= 8 && daysDifference <= 15) {
          counts[3]++;
        } else if (daysDifference >= 16 && daysDifference <= 30) {
          counts[4]++;
        } else if(daysDifference > 31 ) {
          counts[5]++;
        }
      }
    }
    
// Then define the isDateWithinRange function
function isWithinInterval(date, startDate, endDate) {
  // console.log(date,startDate,endDate)
  return date >= startDate && date <= endDate;
}
function isDateWithinRange(date, rangeArray) {
  for (const range of rangeArray) {
    console.log(range)
    const [startStr, endStr] = range.split(" - ");
    console.log(startStr, endStr)
    if (isWithinInterval(date,startStr,endStr )) {
      return true;
    }
  }
  return false;
}

    
    const rangesWithCounts = {};

    for (let i = 0; i < ranges.length; i++) {
      console.log(ranges[i])
      rangesWithCounts[ranges[i]] = counts[i];
    }

    const values = [];

    for (const key in rangesWithCounts) {
      if (rangesWithCounts.hasOwnProperty(key)) {
        const value = rangesWithCounts[key];
        values.push(value);
        
      }
    }

    return res.status(200).send(values);
  }
};
