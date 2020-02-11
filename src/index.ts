import express, { Application, NextFunction, Request, Response } from 'express';
import graphqlHTTP from 'express-graphql';
import socketio from 'socket.io';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import Redis, { Redis as RedisType } from 'ioredis';
import ConnectRedis, { RedisStore } from 'connect-redis';
import * as dotenv from 'dotenv';
import * as path from 'path';
import * as exphbs from 'express-handlebars';
import * as http from 'http';
import schema from './graphql/queries';
import connectDB from './models';
import authRoute from './routes/auth';
import appRoute from './routes/app';
import { sendMessage } from './controller/chat';

// Inits
const app: Application = express();
const server: http.Server = http.createServer(app);
const io = socketio(server);
const RedisStore: RedisStore = ConnectRedis(session);
const client: RedisType = new Redis({
  password: process.env.REDIS_PASSWORD,
});
const store: RedisStore = new RedisStore({ client });

// dotenv config
dotenv.config({ path: path.resolve(__dirname, '../config/config.env') });

// Connect DB
connectDB();

const hbs: Exphbs = exphbs.create({
  partialsDir: 'view/partials',
  layoutsDir: 'views/layouts',
  extname: '.hbs',
});

// static and templates
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.resolve(__dirname, '../views'));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, '../public')));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    store,
    name: 'auth',
    secret: `${process.env.SESSION_SECRET}`,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      sameSite: true,
      secure: process.env.NODE_ENV === 'production',
    },
  }),
);

function passSocket(req: Request, res: Response, next: NextFunction) {
  // add io to req
  io.on('connection', function(socket) {
    console.log('user connected');
    req.socket = socket as any;
  });

  return next();
}

// Routes
const graphqlOptions = { graphiql: true, schema };
app.use('/graphql', graphqlHTTP(graphqlOptions));
app.use('/', authRoute);
app.use('/', passSocket, appRoute);

// socket.io
io.on('connection', function(socket) {
  console.log('user connected');

  socket.on('typing', function(payload) {
    const { username }: any = payload;
    socket.broadcast.emit('isTyping', username);
  });
  // receive message
  socket.on('sent message', async function(message: object | string) {
    try {
      // add function to add message to db
      const { message: text }: string | any = message;
      const response: any = await sendMessage({
        message: text,
        user: '5e419a51185b342e8c6b8756',
      });

      socket.emit('saved message', response.data);
    } catch (error) {
      console.log(error);
    }
  });

  socket.on('disconnect', function() {
    console.log('user disconnected');
  });
});

const PORT: number = parseInt(`${process.env.PORT}`, 10) || 5000;

server.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`),
);
