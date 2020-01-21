import { Router } from "express";
import graphqlHTTP from "express-graphql";
import schema from "../controllers/users";

const router: Router = Router();

router.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
    schema
  })
);

export default router;
