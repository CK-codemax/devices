const path = require('path');
const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/appError');
const brandRouter = require('./routes/brandRoutes');
const globalErrorHandler = require('./controllers/errorController');

const app = express();



// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

// app.use((req, res, next) => {
//   console.log('Hello from the middleware 👋');
//   next();
// });

// 3) ROUTES

//Dynamic routes using pug extension

//API routes
app.use('/api/v1/brands', brandRouter);

//Error handling for all undefined routes
app.all('*', (req, res, next) => {
   next(new AppError(`Can't find ${req.originalUrl} on this server`, 404))

})

//Global error handling middleware
app.use(globalErrorHandler);

module.exports = app;
