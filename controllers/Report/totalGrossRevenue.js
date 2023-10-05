const property = require("../../models/Bookings/bookings");
const rate = require("../../models/Rooms/ratePlan")
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
    let totalGrossRevenue = 0;
    let averageRevenue = 0;
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

          for (const dateRange of previousMonths) {
            const [startDateStr, endDateStr] = dateRange.split(" - ");
            const startDate = parse(startDateStr, "d MMM", currentDate);
            const endDate = parse(endDateStr, "d MMM", currentDate);

            if (
              isBefore(bookingDate, endDate) &&
              isBefore(startDate, bookingDate)
            ) {
              if (!dateCounts[dateRange]) {
                dateCounts[dateRange] = {};
              }

              // Calculate and accumulate the roomPrice for this room type
              const roomTypeId = bookingDetails.roomTypeId;
              const roomPrice = bookingDetails.roomPrice;

              if (!dateCounts[dateRange][roomTypeId]) {
                dateCounts[dateRange][roomTypeId] = 0;
              }

              // Add roomPrice to the existing value for this roomTypeId
              dateCounts[dateRange][roomTypeId] += parseInt(roomPrice);
            }
          }
        }
      }

      const dateCountArrayformonth = previousMonths.map((dateRange) => ({
        date: dateRange,
        count: dateCounts[dateRange] || 0,
      }));

      const dates = [];

      for (const item of dateCountArrayformonth) {
        dates.push(item.date);
      }

      const revenue = [];
      for (const dateRange of previousMonths) {
        if (dateCounts[dateRange]) {
          const totalRoomPrice = Object.values(dateCounts[dateRange]).reduce(
            (acc, val) => acc + val,
            0
          );
          revenue.push(totalRoomPrice);
          totalGrossRevenue += totalRoomPrice;
        } else {
          revenue.push(0);
        }
      }

      var percentage =((revenue[revenue.length - 1] - revenue[0]) / (revenue[revenue.length - 1])+revenue[0])*100;
      
      if (isNaN(percentage) || percentage === 0 || percentage === undefined) {
        percentage = 0;
      }

      const response = {
        dates: dates,
        revenue: revenue,
        totalRoomPrice: totalGrossRevenue,
        percentage: percentage,
      };

      //console.log(revenue);

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
            const datePortion = booking.createdAt.split(",")[0].trim();
            

            if (add.includes(datePortion)) {
              if (!dateCounts[datePortion]) {
                dateCounts[datePortion] = {};
              }

              const roomTypeId = bookingDetails.roomTypeId;
              const roomPrice = bookingDetails.roomPrice;

              if (!dateCounts[datePortion][roomTypeId]) {
                dateCounts[datePortion][roomTypeId] = 0;
              }

              // Add roomPrice to the existing value for this roomTypeId

              dateCounts[datePortion][roomTypeId] += parseInt(roomPrice);
            }
          }
        }

        //console.log(totalcount)

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

        const dates = [];

        for (const item of dateCountArray) {
          dates.push(item.date);
        }

        const revenue = [];
        for (const datePortion of add) {
          if (dateCounts[datePortion]) {
            const totalRoomPrice = Object.values(
              dateCounts[datePortion]
            ).reduce((acc, val) => acc + val, 0);
            revenue.push(totalRoomPrice);
            totalGrossRevenue += totalRoomPrice;
          } else {
            revenue.push(0);
          }
        }

        var percentage =((revenue[revenue.length - 1] - revenue[0]) / (revenue[revenue.length - 1])+revenue[0])*100;
        console.log(percentage)

        if (isNaN(percentage) || percentage === 0 || percentage === undefined || percentage === Infinity) {
          percentage = 0;
        }

        const response = {
          dates: dates,
          revenue: revenue,
          totalGrossRevenue: totalGrossRevenue,
          percentage: percentage,
        };

        return res.status(200).json(response);
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
