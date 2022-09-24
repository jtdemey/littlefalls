import express from "express";
import path from "path";
import dotenv from "dotenv";
dotenv.config({
  silent: true
});

const router = express.Router();
const isProd = process.env.NODE_ENV === "production";

const renderHtmlFile = (res, fileName) => {
  if (isProd) {
    res.render(path.join(process.cwd(), "public", "static", fileName));
    return;
  }
  res.render(path.join(process.cwd(), "src", "pages", "views", fileName));
};

const routeHtml = (endpoint, fileName) =>
  router.route(endpoint).get((req, res) => {
    renderHtmlFile(res, fileName);
  });

routeHtml("/", "home");
routeHtml("/schedule", "schedule");
routeHtml("/about-quakerism", "about");
routeHtml("/documents", "documents");
routeHtml("/our-history", "history");
routeHtml("/marriage-equality", "equality");
routeHtml("/jedi", "jedi");
routeHtml("/links", "links");
routeHtml("/contact-us", "contact");

export default router;
