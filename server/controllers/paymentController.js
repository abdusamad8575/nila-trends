const Order = require('../models/order')
const User = require('../models/user');
const Product = require('../models/product');
const Address = require('../models/address');
const axios = require('axios');
const nodemailer = require('nodemailer');      
const moment = require('moment-timezone');
require('dotenv').config();

const NGENIUS_API_URL = 'https://api-gateway.sandbox.ngenius-payments.com';
const NGENIUS_OUTLET_REF = process.env.NGENIUS_OUTLET_REF;
const NGENIUS_API_KEY = process.env.NGENIUS_API_KEY;

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_AUTH_USER,
      pass: process.env.EMAIL_AUTH_PASS,
    },
  }); 

exports.initiateNgeniusPayment = async (req, res) => {
    const { totalPrice, currency, redirectUrl } = req.body;
    console.log('totalPrice, currency, redirectUrl', totalPrice, currency, redirectUrl);
    console.log('NGENIUS_OUTLET_REF', NGENIUS_OUTLET_REF);
    console.log('NGENIUS_API_KEY', NGENIUS_API_KEY);


    // try {
    //     const authToken = await getNgeniusAuthToken();
    //     console.log('authToken', authToken);

    //     const response = await axios.post(
    //         `${NGENIUS_API_URL}/transactions/outlets/${NGENIUS_OUTLET_REF}/orders`,
    //         {
    //             action: "SALE",
    //             amount: {
    //                 currencyCode: currency || "AED",
    //                 value: totalPrice * 100,
    //             },
    //             merchantAttributes: {
    //                 redirectUrl,
    //             },
    //         },
    //         {
    //             headers: {
    //                 Authorization: `Bearer ${authToken}`,
    //                 'Content-Type': 'application/vnd.ni-payment.v2+json',
    //             },
    //         }
    //     );

    //     console.log('response1', response);

    //     const paymentLink = response.data._links.payment.href;
    //     res.json({ paymentLink });

    // } catch (error) {
    //     res.status(500).json({ message: "Payment initiation failed", error });
    // }
    const authToken = await getNgeniusAuthToken();
    const postData = {
        action: "SALE",
        amount: {    
            currencyCode: "AED",    
            value: totalPrice * 100
        },
        merchantAttributes: {
            redirectUrl,
        },
        // redirectUrl,
        // emailAddress: "samad@gmail.com",
    };

    try {
        const response = await axios.post(`https://api-gateway.sandbox.ngenius-payments.com/transactions/outlets/${NGENIUS_OUTLET_REF}/orders`, postData, {
            headers: {
                "Authorization": `Bearer ${authToken}`,
                "Content-Type": "application/vnd.ni-payment.v2+json",
                "Accept": "application/vnd.ni-payment.v2+json"
            }
        });

        const orderReference = response.data.reference;
        const orderPaypageUrl = response.data._links.payment.href;

        console.log("Order Reference:", orderReference);
        console.log("Order Paypage URL:", orderPaypageUrl);

        res.json({ orderPaypageUrl });
    } catch (error) {
        console.error("Error creating order:", error.response ? error.response.data : error.message);
        throw error;
    }
};


const getNgeniusAuthToken = async () => {
    const url = `${NGENIUS_API_URL}/identity/auth/access-token`;

    try {
        const response = await axios.post(url, {
            realmName: "ni"
        }, {
            headers: {
                "accept": "application/vnd.ni-identity.v1+json",
                "authorization": `Basic ${NGENIUS_API_KEY}`,
                "content-type": "application/vnd.ni-identity.v1+json"
            }
        });
        const accessToken = response.data.access_token;
        return accessToken;
    } catch (error) {
        console.error("Error fetching access token:", error.response ? error.response.data : error.message);
        throw error;
    }
};


exports.confirmNgeniusPayment = async (req, res) => {
    const { _id } = req?.decoded
    const { orderReference,orderDetails } = req.body;  
    const { payment_mode, amount, address, products, couponId,delivery_days} = orderDetails;
    console.log('payment_mode, amount, address, products,couponId,delivery_days', payment_mode, amount, address, products, couponId,delivery_days);

    
    try {
        const authToken = await getNgeniusAuthToken();
        const response = await axios.get(
            `${NGENIUS_API_URL}/transactions/outlets/${NGENIUS_OUTLET_REF}/orders/${orderReference}`,
            {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    'Content-Type': 'application/vnd.ni-payment.v2+json',
                },
            }
        );
        const paymentStatus = response.data.paymentStatus || response.data._embedded?.payment[0]?.state;

        if (paymentStatus === 'CAPTURED') {

            const data = await Order.create({ userId: _id, payment_mode, amount, address, products,delivery_days })

            const user = await User.findById(_id);
            user.cart.item = [];
            user.cart.totalPrice = 0;
            user.orderCount +=1
        
            if (couponId) {
              if (user.coupons.includes(couponId)) {
                return res.status(400).json({ message: "Coupon already used" });
              } else {
                user.coupons.push(couponId);
              }
            }
            await user.save();
        
            for (const item of products.item) {
              const product = await Product.findById(item.product_id);
        
              if (product) {
                if (product.sizes && product.sizes.length > 0) {
                  const sizeToUpdate = product.sizes.find(size => size.sizes === item.size);
        
                  if (sizeToUpdate && sizeToUpdate.quantity >= item.qty) {
                    sizeToUpdate.quantity -= item.qty;
                  } else {
                    return res.status(400).json({ message: `Insufficient stock for size: ${item.size}` });
                  }
                } else {
                  if (product.stock >= item.qty) {
                    product.stock -= item.qty;
                  } else {
                    return res.status(400).json({ message: "Insufficient stock for the product" });
                  }
                }
        
                await product.save();
              }
        
            }
        
        
            const productDetails = await Order.findById(data._id) 
                    .populate({
                        path: 'products.item.product_id', 
                        model: 'Product'                    
                    })
        
            const orderNumber = productDetails._id;
            const orderTime = moment().tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss');
            const adminEmail = process.env.EMAIL_ADMIN;
        
            const emailSubject = `Your Nila Trends Order ID is:${orderNumber}`;
        
            const productItems =  productDetails.products.item.map(item => `
              <tr>
                <td>${item.product_id.name}</td>
                <td>${item.qty}</td>
                <td>${item.size}</td>
                <td>₹${item.price}</td>
              </tr>
            `).join('');
        
            const customerEmailHtml = `
              <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                <h1 style="color: #4CAF50;">Order Received</h1>
                <p>Dear ${productDetails?.address?.fullname},</p>
                <p>Thank you for your order. </p>
                <p>Here are your order details:</p>
                <table style="width: 100%; border-collapse: collapse;">
                  <thead>
                    <tr style="background-color: #f2f2f2;">
                      <th style="padding: 8px; border: 1px solid #ddd;">Product Name</th>
                      <th style="padding: 8px; border: 1px solid #ddd;">Quantity</th>
                      <th style="padding: 8px; border: 1px solid #ddd;">Size</th>
                      <th style="padding: 8px; border: 1px solid #ddd;">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${productItems}
                  </tbody>
                </table>
                <p><strong>Total Amount:</strong> ₹${productDetails?.amount}</p>
                <p><strong>Order Date and Time (IST):</strong> ${orderTime}</p>   
                <p>We will notify you once your order is shipped.</p>
                <p>Thank you for shopping with us!</p>
                <p>Best Regards,<br>Melon Magnets</p>
              </div>
            `;
        
            const internalEmailHtml = `
              <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                <h1 style="color: #4CAF50;">Order Received</h1>
                <p>New order has been placed by <b>${productDetails?.address?.fullname}</b> at ${orderTime}.</p>
                <p><strong>Email:</strong> ${productDetails?.address?.email}</p>
                <p><strong>Phone:</strong> ${productDetails?.address?.mobile}</p>
                <table style="width: 100%; border-collapse: collapse;">
                  <thead>
                    <tr style="background-color: #f2f2f2;">
                      <th style="padding: 8px; border: 1px solid #ddd;">Product Name</th>
                      <th style="padding: 8px; border: 1px solid #ddd;">Quantity</th>
                      <th style="padding: 8px; border: 1px solid #ddd;">Size</th>
                      <th style="padding: 8px; border: 1px solid #ddd;">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${productItems}
                  </tbody>
                </table>
                <p><strong>Total Amount:</strong> ₹${productDetails?.amount}</p>
                <p>For more details, <a href="https://admin.nilaatrends.com//#/orders/editOrder/${productDetails?._id}" target="_blank">Click here</a>.</p>
              </div>
            `;
        
        console.log('productDetails?.address?.email',productDetails?.address?.email);
        
            await transporter.sendMail({
              from: process.env.EMAIL_AUTH_USER,
              to: productDetails?.address?.email,
              subject: emailSubject,
              html: customerEmailHtml,
            });
        
        
            await transporter.sendMail({
              from: process.env.EMAIL_AUTH_USER,
              to: adminEmail,
              subject: emailSubject,
              html: internalEmailHtml,
            });
            res.status(201).json({user, message: 'Payment successful' });
        } else {
            res.status(400).json({ message: 'Payment not captured' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Payment confirmation failed', error });
    }
};
