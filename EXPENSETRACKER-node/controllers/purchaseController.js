const Orders = require('../models/orders');
const RazorPay = require('razorpay');

exports.purchasePremium = async (req, res, next) => {
    try {
        var rzp = new RazorPay({
            key_id: 'rzp_test_uiprxPSBHLV3rG',
            key_secret: 'fj068ULBo4v8ar5nW0wk3DYu'
        })
        const amount = 2500;

       const order = await rzp.orders.create({ amount, currency: "INR" })
            
            await req.user.createOrder({ orderid: order.id, status: "PENDING" })

            return res.status(201).json({ order, key_id: rzp.key_id });
    }
    catch (err) {
        res.status(403).json({ error: err });
    }
}


exports.updatetransactionstatus = async (req, res, next) => {
    try {
        const paymentId = req.body.payment_id;
        const orderId = req.body.order_id;
        const response = await Orders.findOne({ where: { orderid: orderId } })
        await response.update({ paymentid: paymentId, status: 'SUCCESS' })
        await req.user.update({ ispremiumuser: true });
        return res.status(202).json({ message: "transaction successfull" });

    } catch (err) {
        res.status(500).json({ error: err });
    }
}

exports.updatefailedstatus = async (req, res, next) => {
    try {
        const orderId = req.body.order_id;
        const response = await Orders.findOne({ where: { orderid: orderId } })
        await response.update({ status: "failed" })
        await req.user.update({ispremiumuser : false});
        return res.status(200).json({ message: "failed" });
    } catch (err) {
        console.log(err);
        return;
    }
}