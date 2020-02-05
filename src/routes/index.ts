import { Router } from "express";

const router = Router();

router
  .route("/login")
  .get(async function(req, res, next) {
    try {
      return res.render("login");
    } catch (error) {
      return next(error);
    }
  })
  .post(async function(req, res, next) {
    try {
      return res.render("login");
    } catch (error) {
      return next(error);
    }
  });

export default router;
