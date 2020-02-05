import express, { Application, NextFunction, Request, Response } from 'express';
import graphqlHTTP from 'express-graphql';
import socketio from 'socket.io';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import * as dotenv from 'dotenv';
import * as path from 'path';
import * as exphbs from 'express-handlebars';
import * as http from 'http';
import schema from './graphql/queries';
import connectDB from './models';

// Inits
const app: Application = express();
const server: http.Server = http.createServer(app);
const io = socketio(server);

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
    secret: `${process.env.SESSION_SECRET}`,
    resave: false,
    saveUninitialized: false,
  }),
);

// Routes
const graphqlOptions = { graphiql: true, schema };
app.use('/graphql', graphqlHTTP(graphqlOptions));
app.get('/login', function(req: Request, res: Response, next: NextFunction) {
  if ((req.session as any).username) {
    return res.redirect('/');
  }

  return res.render('login', { title: 'Log In' });
});

app.post('/login', function(req: Request, res: Response, next: NextFunction) {
  let error: string;
  let sess: any = req.session;
  // check if session is set
  if (sess.username) {
    res.redirect('/');
  }
  // set username into session
  if (!req.body.username) {
    error = 'Please input a username';
    return res.render('login', { title: 'Log In' });
  }

  (req.session as any).username = req.body.username;
  res.redirect('/');
});

app.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sess: any = req.session;
    if (!sess.username) {
      return res.redirect('/login');
    }

    return res.render('home', { title: 'Home', username: sess.username });
  } catch (error) {
    next(error);
  }
});

const PORT: number = parseInt(`${process.env.PORT}`, 10) || 5000;

server.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`),
);
