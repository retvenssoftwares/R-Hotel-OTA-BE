const RoomType = require('../../models/Rooms/roomTypeDetails');
const ratePlan = require('../../models/Rooms/ratePlan');
const booking = require('../../models/Bookings/bookings');

module.exports = async (req, res) => {
  try {
    const { propertyId } = req.params;

    const propertyid = await RoomType.find({ propertyId: propertyId });

    if (!propertyid || propertyid.length === 0) {
      return res.status(404).json({ error: 'No room found for the given propertyId' });
    }
    // Initialize a variable to store the total gross revenue
    let totalGrossRevenue = 0;


    // Extract roomType and roomTypeId fields only
    const extractedDataWithGrossRevenue = await Promise.all(propertyid.map(async (roomType) => {
      const { roomTypeId } = roomType;
      const ratePlans = await ratePlan.find({ roomTypeId: roomTypeId }).select('ratePlanId ratePlanName.ratePlanName');

      // Map over ratePlans to create separate objects for each ratePlanName
      return Promise.all(ratePlans.map(async (plan) => {
        // Count the bookings with matching roomTypeId and ratePlanId
        const totalBookings = await booking.aggregate([
          {
            $match: {
              propertyId: propertyId,
              'roomDetails.roomTypeId': roomTypeId,
              'roomDetails.ratePlanId': plan.ratePlanId
            }
          },
          {
            $unwind: '$roomDetails'
          },
          {
            $match: {
              'roomDetails.roomTypeId': roomTypeId,
              'roomDetails.ratePlanId': plan.ratePlanId
            }
          },
          {
            $group: {
              _id: null,
              total: { $sum: 1 }
            }
          }
        ]);

        const totalCount = totalBookings.length > 0 ? totalBookings[0].total : 0;

        // Calculate total days booked for the given roomTypeId and ratePlanId
        const totalDaysBooked = await booking.aggregate([
          {
            $match: {
              propertyId: propertyId,
              'roomDetails.roomTypeId': roomTypeId,
              'roomDetails.ratePlanId': plan.ratePlanId
            }
          },
          {
            $unwind: '$roomDetails'
          },
          {
            $match: {
              'roomDetails.roomTypeId': roomTypeId,
              'roomDetails.ratePlanId': plan.ratePlanId
            }
          },
          {
            $project: {
              checkInDate: { $dateFromString: { dateString: '$checkInDate', format: '%Y-%m-%d' } },
              checkOutDate: { $dateFromString: { dateString: '$checkOutDate', format: '%Y-%m-%d' } }
            }
          },
          {
            $group: {
              _id: null,
              totalMilliseconds: { $sum: { $subtract: ['$checkOutDate', '$checkInDate'] } }
            }
          }
        ]);
        
        const totalMilliseconds = totalDaysBooked.length > 0 ? totalDaysBooked[0].totalMilliseconds : 0;
        const totalDays = totalMilliseconds / (24 * 60 * 60 * 1000);
        
       // const totalDaysMinus1 = totalDays > 0 ? totalDays - 1 : 0;
        // Calculate roomPrice for the given roomTypeId and ratePlanId
        const roomPriceTotal = await booking.aggregate([
          {
            $match: {
              propertyId: propertyId,
              'roomDetails.roomTypeId': roomTypeId,
              'roomDetails.ratePlanId': plan.ratePlanId
            }
          },
          {
            $unwind: '$roomDetails'
          },
          {
            $match: {
              'roomDetails.roomTypeId': roomTypeId,
              'roomDetails.ratePlanId': plan.ratePlanId
            }
          },
          {
            $group: {
              _id: null,
              total: { $sum: { $toDouble: '$roomDetails.roomPrice' } }
            }
          }
        ]);

        const roomPrice = roomPriceTotal.length > 0 ? roomPriceTotal[0].total : 0;

        //gross revenue
        const grossRevenue = totalCount * totalDays * roomPrice;


           // Add the gross revenue to the total
           totalGrossRevenue += grossRevenue;
        return {
          roomTypeId: roomTypeId,
          roomType: roomType.roomType[0]?.roomType || '',
          ratePlanName: plan.ratePlanName[0]?.ratePlanName || '',
          ratePlanId: plan.ratePlanId,
          totalBookings: totalCount,
          totalNight: totalDays,
          roomPrice: roomPrice,
          grossRevenue:grossRevenue
        };
      }));
    }));

      // Flatten the extractedDataWithGrossRevenue array to remove nested arrays
      const resultWithGrossRevenue = [].concat(...extractedDataWithGrossRevenue);

      // Send the total gross revenue along with the result
      return res.status(200).json({
        data: resultWithGrossRevenue,
        totalGrossRevenue: totalGrossRevenue,
      });

    // Flatten the extractedData array to remove nested arrays
    //const result = [].concat(...extractedData);

    return res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching room types:', error);
    res.status(500).json({ error: 'An error occurred while fetching room types' });
  }
};
