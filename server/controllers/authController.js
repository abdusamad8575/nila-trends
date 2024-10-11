const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require('google-auth-library');

const dotenv = require('dotenv');
dotenv.config();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

module.exports.getCurrentUser = async (req, res) => {
  try {
    const _id = req.decoded._id;
    const currentUser = await User.findOne({ _id });
    if (!currentUser) {
      return res.status(400).json({ message: 'user does not exists' })
    }
    return res.status(200).json({ data: currentUser, message: 'user details fetched successfully' })
  } catch (error) {
    return res.status(500).json({ message: err?.message ?? 'Something went wrong' })
  }
}


let otpStore = {};

module.exports.sendOtp = async (req, res) => {
  const { number } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore[number] = otp;
  try {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = require('twilio')(accountSid, authToken);
    client.messages
      .create({
        body: `✨ NilaaTrends Verification ✨\n\nYour verification code is: ${otp}\n\nPlease enter this code to verify your identity. This code is valid for 10 minutes.\n\nThank you for choosing NilaaTrends! 🛍️\n\nRegards, NilaaTrends Team`,
        from: '+13343731097',
        to: number
      })
      .then(message => console.log(message.sid));
    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Failed to send OTP', error: error.message });
  }
};

module.exports.verifyOtp = async (req, res) => {
  const { number, otp, referrerId } = req.body;
  console.log('number, otp,referrerId', number, otp, referrerId);

  if (otpStore[number] !== otp) {
    return res.status(400).json({ message: 'Invalid OTP' });
  }

  let user = await User.findOne({ phone: number });

  if (!user) {
    user = new User({ phone: number });
    user.wallet += 500;
    if (referrerId) {
      const referrer = await User.findById(referrerId);
      if (referrer) {
        referrer.wallet += 100;
        await referrer.save();
      }
    }
    await user.save();
  }

  const accessToken = jwt.sign({ _id: user._id }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: process.env.JWT_ACCESS_EXPIRY,
  });

  const refreshToken = jwt.sign({ _id: user._id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRY,
  });

  res.status(200).json({
    message: 'Login successful',
    data: { token: { accessToken, refreshToken }, user }
  });
};

module.exports.googleLogin = async (req, res) => {
  const { tokenId } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { email } = ticket.getPayload();

    let user = await User.findOne({ email });
    // console.log('user',user);
    if (!user) {
      // const encryptedPassword = await bcrypt.hash(email + process.env.JWT_ACCESS_SECRET, 10);
      // console.log('encryptedPassword',encryptedPassword);
      user = await User.create({
        email
        // password: encryptedPassword,
      });
    }

    const accessToken = jwt.sign({ _id: user._id }, process.env.JWT_ACCESS_SECRET, {
      expiresIn: process.env.JWT_ACCESS_EXPIRY,
    });

    const refreshToken = jwt.sign({ _id: user._id }, process.env.JWT_REFRESH_SECRET, {
      expiresIn: process.env.JWT_REFRESH_EXPIRY,
    });

    return res.status(200).json({
      message: "Login successful",
      token: { accessToken, refreshToken },
      user
    });
  } catch (error) {
    console.log(error?.message);
    return res.status(500).json({ message: error?.message ?? "Something went wrong" });
  }
};