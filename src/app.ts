import express from 'express';
import helmet from 'helmet';
import xss from 'xss-clean';
import compression from 'compression';
import cors from 'cors';
import routes from './routes/v1';
import { customResponse } from './middleware/customResponse';

const app = express();

// Set security HTTP headers
app.use(helmet());

// Parse json request body
app.use(express.json());

// Parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// Sanitize request data
app.use(xss());

// Gzip compression
app.use(compression());

// Custom response result
app.use(customResponse);

// Enable cors
app.use(cors());

// Default route
app.use('/v1', routes);

// Response 404 error for any unknown api request
app.use((req, res, next) => {
  res.result('API Not found.', 404);
});

export default app;
