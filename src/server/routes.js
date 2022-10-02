import express from "express";
import path from "path";
import dotenv from "dotenv";
import getSchedule from "../db/services/schedule/get.js";
import setSchedule from "../db/services/schedule/set.js";
dotenv.config({
  silent: true
});

const router = express.Router();
const isProd = process.env.NODE_ENV === "production";
const ADMIN_KEY = process.env.ADMIN_KEY;

const renderHtmlFile = (res, fileName, props) => {
  if (isProd) {
    res.render(path.join(process.cwd(), "public", "static", fileName), props);
    return;
  }
  res.render(
    path.join(process.cwd(), "src", "pages", "views", fileName),
    props
  );
};

const routeGetApi = (endpoint, action) =>
  router.route(endpoint).get((req, res) => action(req, res));

const routeHtml = (endpoint, fileName, getProps) =>
  router.route(endpoint).get((req, res) => {
    renderHtmlFile(res, fileName, getProps ? getProps() : {});
  });

routeGetApi("/api/schedule", (req, res) => {
  res.status(200).json({
    status: 200,
    schedule: getSchedule()
  });
});

router.route("/api/schedule/set").post((req, res) => {
  if (
    !req ||
    !req.body ||
    !req.body.schedule ||
    !req.body.secret ||
    req.body.secret !== ADMIN_KEY
  ) {
    res.status(401).json({
      status: 401,
      message: "Unauthorized"
    });
    return;
  }
  if (req.body.schedule.length > 20) {
    res.status(401).json({
      status: 401,
      message: "Max length exceeded"
    });
    return;
  }
  setSchedule(req.body.schedule);
  res.status(201).json({
    status: 201,
    message: "Created"
  });
});

routeHtml("/", "home");
routeHtml("/schedule", "schedule", () => ({
  schedule: getSchedule()
}));
routeHtml("/about-quakerism", "about");
routeHtml("/documents", "documents");
routeHtml("/our-history", "history");
routeHtml("/marriage-equality", "equality");
routeHtml("/jedi", "jedi");
routeHtml("/links", "links");
routeHtml("/contact-us", "contact");
routeHtml("/admin", "admin");

export default router;
