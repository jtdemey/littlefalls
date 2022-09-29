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
    schedule: getSchedule()
  });
});

router.route("/api/schedule/set").post((req, res) => {
  console.log(req.body);
  if (!req || !req.body || !req.body.schedule) return;
  if (req.body.schedule.length > 20) {
    res.status(400).json({
      message: "Max length exceeded"
    });
  }
  setSchedule(req.body.schedule);
  res.status(201).json({
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
