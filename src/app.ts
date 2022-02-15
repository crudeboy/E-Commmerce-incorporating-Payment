import createError from 'http-errors';
import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
import userRouter from './routes/userRouter';
import productRouter from './routes/productRouter';
import orderRouter from './routes/orderRouter';
import uploadRouter from './routes/uploadRouter';

dotenv.config();
const app = express();
console.log(process.env.MONGODB_URL , 'envvvvv')
//connect to database
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/e-commerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// view engine setup
// app.set('views', path.join(__dirname, '..', 'views'));
// app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(cors({ origin: process.env.FRONT_END_URL }));
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);
app.use('/api/uploads', uploadRouter);
console.log(process.env.FRONT_END_URL, "frontend url");
// const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '..', '/uploads')));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (
  err: createError.HttpError,
  req: express.Request,
  res: express.Response,
  _next: express.NextFunction,
) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).send({ message: err.message });
});

export default app;
