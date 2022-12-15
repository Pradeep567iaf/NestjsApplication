import { BadRequestException, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request } from 'express';

export class AdmintokenChecker implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (
      req.headers.authorization ===
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InByYWRlZXAiLCJzdWIiOjEyLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NzExMDYwNzMsImV4cCI6MTY3MTE5MjQ3M30.oZV1vtx24H6m2UseXNS05O9aboQQXU_r7wChLW14juw'
    ) {
      next();
    } else {
      throw new BadRequestException();
    }
  }
}
