import express from "express";
import compile from "../Docker";

const compileRouter = express.Router();

compileRouter.post('/compile',compile);

export default compileRouter;