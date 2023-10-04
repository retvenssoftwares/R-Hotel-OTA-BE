const promotionModel = require('../../models/Promotion/promotion');

module.exports = async (req, res) => {
    try {
        let propertyId = req.params.propertyId;
        let promotionId = req.params.promotionId;
        const date = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

        // Find the promotion record based on propertyId
        const findPromotion = await promotionModel.findOne({ propertyId: propertyId });
        if (!findPromotion) {
            return res.status(404).json({ message: "Promotion record not found" });
        }

        // Find the promotion object with matching promotionId
        const promotionToUpdate = findPromotion.promotions.find(promo => promo.promotionId === promotionId);
        if (!promotionToUpdate) {
            return res.status(404).json({ message: "Promotion with given promotionId not found" });
        }

        // Update the fields you want to update
        if (req.body.offerWhat) {
            promotionToUpdate.offerWhat.unshift({ offerWhat: req.body.offerWhat, date: date });
        }
        if (req.body.bookNights || req.body.freeNights) {
            promotionToUpdate.freeNightsRule.unshift({ bookNights: req.body.bookNights, freeNights: req.body.freeNights, date: date });
        }
        if (req.body.offerType) {
            promotionToUpdate.offerType.unshift({ offerType: req.body.offerType, date: date });
        }
        if (req.body.allUsersDiscount) {
            promotionToUpdate.allUsersDiscount.unshift({ allUsersDiscount: req.body.allUsersDiscount, date: date });
        }
        if (req.body.loggedInUsersDiscount) {
            promotionToUpdate.loggedInUsersDiscount.unshift({ loggedInUsersDiscount: req.body.loggedInUsersDiscount, date: date });
        }

        await findPromotion.save();
        res.status(200).json({ message: "Promotion updated successfully" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
