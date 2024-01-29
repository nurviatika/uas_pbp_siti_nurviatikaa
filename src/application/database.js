import { PrismaClient } from "@prisma/client";
import {logger} from "./logging.js";

export const PrismaClient = new PrismaClient({
    log: [
        {
          emit: 'event',
          level: 'query',
        },
        {
          emit: 'event',
          level: 'error',
        },
        {
          emit:'event',
          level: 'info',
        },
        {
          emit:'event',
          level: 'warn',
        },
      ],
    
});

PrismaClient.$on('error', (e) => {
    logger.error(e);

});

PrismaClient.$on('warn', (e) => {
    logger.warn(e);
});

PrismaClient.$on('info', (e) => {
    logger.info(e);
});

PrismaClient.$on('query', (e) => {
    logger.info(e);
});



