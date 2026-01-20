import Razorpay from "razorpay";

console.log("Razorpay Key:", process.env.RAZORPAY_KEY_ID);

const razorpay = new Razorpay({
  // key_id: process.env.RAZORPAY_KEY_ID,
  key_id: "rzp_test_PM3u5kb4aezyTA",
  key_secret: "WEtq0wkWXeOi0TNwsGAUTgL8",
});

export default razorpay;
