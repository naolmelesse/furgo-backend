const express = require('express');
const router = express.Router();
const Car = require('../models/car');
const Rent = require('../models/rent');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const {v4: uuidv4} = require('uuid');
const DOMAIN = 'http://localhost:3000';
const dotenv = require('dotenv');

        dotenv.config();


router.post('/rent-car', async (req, res) => {
    
        let car = await Car.find({_id: req.body.car_id});
        res.json(car);

});

router.post('/car-rented', async(req, res) => {
        const rent = new Rent({
                renter: req.body.rentData.renter,
                host: req.body.rentData.host,
                car: req.body.rentData.car,
                date: {
                        from: req.body.rentData.tripStart,
                        to: req.body.rentData.tripEnd
                },
                total_income: req.body.rentData.total_income
        })
        await rent.save();
        //await Car.updateOne({_id: req.body.rentData.car}, {$set: { available: false}});
        res.send("Car succesfully rented.");
});

const calculateOrderAmount = (items) => {
        // Replace this constant with a calculation of the order's amount
        // Calculate the order total on the server to prevent
        // people from directly manipulating the amount on the client
        return 1400;
};
      
router.post("/create-payment-intent", async (req, res) => {
        const { items } = req.body;
      
        // Create a PaymentIntent with the order amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
          amount: calculateOrderAmount(items),
          currency: "inr",
          automatic_payment_methods: {
            enabled: true,
          },
        });
      
        res.send({
          clientSecret: paymentIntent.client_secret,
        });
      });
      

router.post('/create-checkout-session', async (req, res) => {
        const session = await stripe.checkout.sessions.create({
          line_items: [
            {
              // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
              price_data: {
                currency: 'usd',
                product_data: {
                  name: 'Car rental',
                },
                unit_amount: 2000,
              },
              quantity: 1,
            },
          ],
          mode: 'payment',
          success_url: `${DOMAIN}?success=true`,
          cancel_url: `${DOMAIN}?canceled=true`,
        });
      
        res.redirect(303, session.url);
});

router.post('/pay', (req, res) => {
        const {token, amount} = req.body;
        const idempotencyKey = uuidv4();

        console.log(req.body);
        return stripe.customers.create({
                id: req.body.rentData.renter,
                source: token
        }).then(customer => {
                // stripe.charges.create({
                //         amount: amount * 100,
                //         currency: 'usd',
                //         customer: customer.id
                // },{idempotencyKey})
        }).then(async (result) => {
                const rent = new Rent({
                        renter: req.body.rentData.renter,
                        host: req.body.rentData.host,
                        car: req.body.rentData.car,
                        date: {
                                from: req.body.rentData.tripStart,
                                to: req.body.rentData.tripEnd
                        },
                        total_income: req.body.rentData.total_income
                })
                console.log(req.body.rentData)
                await rent.save();
                await Car.updateOne({_id: req.body.rentData.car}, {$set: { available: false}});
                res.status(200).json(result);
        }).catch(err => {
                console.log(err);
        })
})
      

module.exports = router;