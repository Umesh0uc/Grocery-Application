const Cart = require("../models/Cart");

const getCount = async () => {
    const count = await Cart.aggregate([
        {
            $group: {
                _id: null,
                count: { $sum: '$quantity' }
            }
        }
    ]); 

    return count?.[0]?.count;
};

module.exports = {
    getCount,
}