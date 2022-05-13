import express from "express";
import { prisma } from "./prisma";
import nodemailer from "nodemailer";
import { SubmitFeedbackUseCase } from "./use-cases/submitFeedbackUseCase";
import { PrismaFeedbacksRepository } from "./repositories/prisma/prismaFeedbacksRepository";
import { NodemailerMailAdapter } from "./adapters/nodemailer/nodemailerMailAdapter";

export const routes = express.Router();

routes.get("/", (req, res) => {
  return res.send("HOME");
});

routes.post("/feedbacks", async (req, res) => {
  const { type, comment, screenshot } = req.body;
  const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
  const nodemailerMailAdapter = new NodemailerMailAdapter();

  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    prismaFeedbacksRepository,
    nodemailerMailAdapter
  );

  await submitFeedbackUseCase.execute({
    type,
    comment,
    screenshot,
  });

  return res.status(201).send();
});

routes.post("/webhook", (req, res) => {
  let body = req.body;

  // Checks this is an event from a page subscription
  if (body.object === "page") {
    // Iterates over each entry - there may be multiple if batched
    body.entry.forEach(function (entry: any) {
      // Gets the message. entry.messaging is an array, but
      // will only ever contain one message, so we get index 0
      let webhook_event = entry.messaging[0];
      console.log(webhook_event);
    });

    // Returns a '200 OK' response to all requests
    res.status(200).send("EVENT_RECEIVED");
  } else {
    // Returns a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }
});

routes.get("/webhook", (req, res) => {
  // Your verify token. Should be a random string.
  let VERIFY_TOKEN =
    "EAAM24tGgWmQBACrlnTekDQ0m90sTdlAi49A7fizkmE7h3DNfsbVezjMMQZCBZCVuNw0UHYSlRrVgHsVWihmXBAO38ZAmxeUZAwLd0bssw3noh2HV8ZAYUoAC667iFOj7YrnL8gkP8qhn8KkYsipyp1D4NKO1TTZAhhJQmc4A31GaaDoL8dpyVXLRF7BkROfsS3vPrt4AqIFQZDZD";

  // Parse the query params
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];

  // Checks if a token and mode is in the query string of the request
  if (mode && token) {
    // Checks the mode and token sent is correct
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      // Responds with the challenge token from the request
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  }
});
