import express from "express";
import cors from 'cors';
import morgan from 'morgan';
import axios from 'axios';
const app = express();

const API_GATEWAY_PORT = process.env.API_GATEWAY_PORT || 6000;
const API_GATEWAY_DEV_MODE = process.env.API_GATEWAY_DEV_MODE || 'development'

app.use(express.json());
app.use(morgan('dev'));