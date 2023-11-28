const rate = require('../../models/manageInventory/manageRates');
const rateTypeModel = require('../../models/Rooms/rateType');
const roomTypeModel = require('../../models/Rooms/roomTypeDetails')

module.exports = async (req, res) => {
    const { roomTypeId, startDate, endDate } = req.query;
    try {
        const startDateObj = new Date(startDate);
        const endDateObj = new Date(endDate);

        if (startDateObj > endDateObj) {
            return res.status(400).json({ message: "Check-in date cannot be greater than check-out date", statuscode: 400 });
        }
        const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateFormatRegex.test(startDate) || !dateFormatRegex.test(endDate)) {
            return res.status(400).json({ message: "Please enter the date in the correct format (yyyy-mm-dd)", statuscode: 400 });
        }

        const rateTypes = await rateTypeModel.aggregate([
            { $match: { roomTypeId } },
            {
                $project: {
                    rateTypeId: 1,
                    rateTypeName: { $arrayElemAt: ["$name.name", 0] },
                    price: { $arrayElemAt: ["$basePrice.basePrice", 0] },
                    _id: 0,
                },
            },
        ]);

        if (!rateTypes || rateTypes.length === 0) {
            return res.status(400).json({ message: "No rate types found", statuscode: 400 });
        }

        const roomTypeInfo = await roomTypeModel.findOne({ roomTypeId });

        if (!roomTypeInfo) {
            return res.status(400).json({ message: "No room type information found", statuscode: 400 });
        }

        const rates = [];
        for (const rateType of rateTypes) {
            const { rateTypeId } = rateType;
            const foundRate = await rate.findOne({ rateTypeId });

            if (foundRate) {
                const { manageRates } = foundRate;
                const rateData = {
                    rateTypeId,
                    rateTypeName: rateType.rateTypeName,
                    price: rateType.price,
                    extraAdultRate: roomTypeInfo.extraAdultRate[0].extraAdultRate,
                    extraChildRate: roomTypeInfo.extraChildRate[0].extraChildRate,
                    rate: [],
                };

                const filteredPrice = manageRates.price.filter(item => {
                    const itemDate = new Date(item.date);
                    return itemDate >= startDateObj && itemDate <= endDateObj;
                });

                const filteredExtraAdultRate = manageRates.extraAdultRate.filter(item => {
                    const itemDate = new Date(item.date);
                    return itemDate >= startDateObj && itemDate <= endDateObj;
                });

                const filteredExtraChildRate = manageRates.extraChildRate.filter(item => {
                    const itemDate = new Date(item.date);
                    return itemDate >= startDateObj && itemDate <= endDateObj;
                });

                const datesInRange = filteredPrice.map(item => item.date);
                const missingDates = [];
                for (let date = new Date(startDate); date <= endDateObj; date.setDate(date.getDate() + 1)) {
                    const dateString = date.toISOString().slice(0, 10);
                    if (!datesInRange.includes(dateString)) {
                        missingDates.push(dateString);
                    }
                }

                if (missingDates.length > 0) {
                    missingDates.forEach(date => {
                        rateData.rate.push({
                            price: rateType.price,
                            extraAdultRate: roomTypeInfo.extraAdultRate[0].extraAdultRate,
                            extraChildRate: roomTypeInfo.extraChildRate[0].extraChildRate,
                            date,
                        });
                    });
                }

                for (let i = 0; i < filteredPrice.length; i++) {
                    const { date } = filteredPrice[i];
                    rateData.rate.push({
                        price: filteredPrice[i].price,
                        extraAdultRate: filteredExtraAdultRate[i].extraAdultRate,
                        extraChildRate: filteredExtraChildRate[i].extraChildRate,
                        date,
                    });
                }

        // Sorting the dates within the rate array
        rateData.rate.sort((a, b) => new Date(a.date) - new Date(b.date));
                rates.push(rateData);
            } else {
                rates.push({
                    rateTypeId,
                    rateTypeName: rateType.rateTypeName,
                    price: rateType.price,
                    extraAdultRate: roomTypeInfo.extraAdultRate[0].extraAdultRate,
                    extraChildRate: roomTypeInfo.extraChildRate[0].extraChildRate,
                    rate: [{
                        price: rateType.price,
                        extraAdultRate: roomTypeInfo.extraAdultRate[0].extraAdultRate,
                        extraChildRate: roomTypeInfo.extraChildRate[0].extraChildRate,
                        date: [startDate, endDate], // Assuming missing data for entire range
                    }],
                });
            }
        }

        return res.status(200).json({ data: rates });
      
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
