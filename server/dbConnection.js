import dotenv from dotenv

import pg from pg

dotenv.config

export const db = new pg.pool

connection.string