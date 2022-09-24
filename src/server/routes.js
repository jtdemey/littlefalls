import express from "express";
import path from "path";
import dotenv from "dotenv";
import getSchedule from "../db/services/schedule/get.js";
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
  res.render(path.join(process.cwd(), "src", "pages", "views", fileName), props);
};

const routeHtml = (endpoint, fileName, getProps) =>
  router.route(endpoint).get((req, res) => {
    renderHtmlFile(res, fileName, getProps());
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
routeHtml("/admin", "admin", () => ({
  schedule: getSchedule()
}));

export default router;
