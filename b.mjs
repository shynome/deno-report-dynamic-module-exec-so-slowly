import { IncomingMessage, ServerResponse } from "http";

/**
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 */
export default (req, res) => {
  res.end("bbb")
};
