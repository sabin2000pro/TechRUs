import express from "express";
import cors from 'cors';
import morgan from 'morgan';
import axios from 'axios';
const app = express();

app.use(express.json());
app.use(morgan('dev'));

export {app};