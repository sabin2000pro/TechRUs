const dotenv = require('dotenv');
dotenv.config({path: '../'})
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const couponPort = process.env.COUPONS_PORT || 5402

// Mount the middleware

