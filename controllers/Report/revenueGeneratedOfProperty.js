const property = require("../../models/Bookings/bookings");
const {
  format,
  subMonths,
  subDays,
  startOfMonth,
  endOfMonth,
  parse,
  isBefore,
} = require("date-fns");

module.exports = async (req, res) => {
  try {
    const allBooking = await property.find({
      propertyId: req.query.propertyId,
    });
    const currentDate = new Date();
    const days = req.query.days;
    let totalcount = 0;
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

      const previousMonths = getPreviousMonths(currentDate, g);
      const dateCounts = {};

      for (const booking of allBooking) {
        for (const bookingDetails of booking.roomDetails) {
          const bookingDate = parse(
            booking.createdAt,
            "dd/M/yyyy, hh:mm:ss a",
            new Date()
          );
          // const grossRevenue = bookingDetails.roomPrice
          // totalGrossRevenue = totalGrossRevenue + parseInt(grossRevenue)
         

          for (const dateRange of previousMonths) {
            const [startDateStr, endDateStr] = dateRange.split(" - ");
            const startDate = parse(startDateStr, "d MMM", currentDate);
            const endDate = parse(endDateStr, "d MMM", currentDate);

            if (isBefore(bookingDate, endDate) &&isBefore(startDate, bookingDate)) {
              if (!dateCounts[dateRange]) {
                dateCounts[dateRange] = {};
              }
              
              if (!dateCounts[dateRange][bookingDetails.roomTypeId]) {
                dateCounts[dateRange][bookingDetails.roomTypeId] = 1;
                
              } else {
                dateCounts[dateRange][bookingDetails.roomTypeId]++;
              }
            }
          }
        }
      }

      

      // const dateCountArrayformonth = previousMonths.map((dateRange) => ({
      //   date: dateRange,
      //   count: dateCounts[dateRange] || 0,
      // }));

      const dateCountArrayformonth = previousMonths.map((dateRange) => ({
        date: dateRange,
        count: dateCounts[dateRange]
          ? typeof dateCounts[dateRange] === "object"
            ? Object.values(dateCounts[dateRange]).reduce(
                (acc, val) => acc + val,
                0
              )
            : dateCounts[dateRange]
          : 0,
      }));


      console.log(dateCountArrayformonth)

      const dates = [];
      const counts = [];

      for (const item of dateCountArrayformonth) {
        dates.push(item.date);
        counts.push(item.count);
      }

      for (const number of counts) {
        totalcount += number;
      }

      var percentage = ((counts[counts.length - 1] - counts[0]) / (counts[counts.length -1] + counts[0]))*100;
     
    

      if (isNaN(percentage) || percentage === 0 || percentage === undefined) {
        percentage = 0;
      }

      // averageRevenue = totalGrossRevenue / totalcount

      const response = {
        dates: dates,
        counts: counts,
        numberOfNight: totalcount,
        percentage: percentage,
        // totalGrossRevenue :totalGrossRevenue,
        // averageRevenue :averageRevenue
      };

      return res.status(200).json(response);
    } else {
      const dateFormat = "dd/M/yyyy"; // Change the date format to "dd/M/yyyy"

      if (days === "7 days" || days === "15 days" || days === "30 days") {
        const b = parseInt(days.slice(0, 2));
        if (b === 7) {
          var g = 7;
        } else if (b === 15) {
          var g = 15;
        } else if (b === 30) {
          var g = 30;
        }

        //const dateFormat = "dd/M/yyyy"; // Change the date format to "dd/M/yyyy"
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

        const dateCounts = {};
        

        for (const booking of allBooking) {
          for (const bookingDetails of booking.roomDetails) {
            // const grossRevenue = bookingDetails.roomPrice
            // totalGrossRevenue = totalGrossRevenue + parseInt(grossRevenue)
            // console.log(totalGrossRevenue)
            const datePortion = booking.createdAt.split(",")[0].trim();

            if (add.includes(datePortion)) {
              if (!dateCounts[datePortion]) {
                dateCounts[datePortion] = {};
              }

              if (!dateCounts[datePortion][bookingDetails.roomTypeId]) {
                dateCounts[datePortion][bookingDetails.roomTypeId] = 1;
                
              } else {
                dateCounts[datePortion][bookingDetails.roomTypeId]++;
              }

            }
          }
        }

        

        const dateCountArray = add.map((date) => ({
          date: date,
          count: dateCounts[date]
            ? typeof dateCounts[date] === "object"
              ? Object.values(dateCounts[date]).reduce(
                  (acc, val) => acc + val,
                  0
                )
              : dateCounts[date]
            : 0,
        }));

        console.log(dateCountArray)

        const dates = [];
        const counts = [];

        for (const item of dateCountArray) {
          dates.push(item.date);
          counts.push(item.count);
        }

        for (const number of counts) {
          totalcount += number;
        }

        

        var percentage = ((counts[counts.length - 1] - counts[0]) / (counts[counts.length -1] + counts[0]))*100;
        //console.log(counts[counts.length - 1], counts[0]);
        console.log(percentage);

        if (isNaN(percentage) || percentage === 0 || percentage === undefined || percentage === Infinity) {
          percentage = 0;
        }

        // averageRevenue = totalGrossRevenue / totalcount

        const response = {
          dates: dates,
          counts: counts,
          numberOfNight: totalcount,
          percentage: percentage,
          // totalGrossRevenue :totalGrossRevenue,
          // averageRevenue :averageRevenue
        };
        return res.status(200).json(response);
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
