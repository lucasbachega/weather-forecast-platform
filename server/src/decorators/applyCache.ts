import { Request, Response } from "express";
import NodeCache from "node-cache";

export function applyCache(controller: any, expiresInSeconds: number = 15) {
  const cache = new NodeCache({ stdTTL: expiresInSeconds });
  return function (req: Request, res: Response) {
    const key = req.url;
    const objectData = cache.get(key);
    if (objectData) {
      return res.send(objectData);
    } else {
      return controller(req, {
        ...res,
        json: (data: any) => {
          cache.set(key, data);
          return res.json(data);
        },
      });
    }
  };
}
