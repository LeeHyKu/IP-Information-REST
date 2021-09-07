/**
 * REST Api, Server IP Address Information, Express.js, Node.js(TS4)
 * Copyright (C) 2021  Hyun-Ku Lee
 *
 * This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
 import * as express from "express";
 import AddressRouter from "./routers/AddressRouter";
 import { createServer as HttpCreate } from "http";
 
 const ex = express();
 
 ex
     .use((q, s, n) => {
         s.header('Access-Control-Allow-Origin', '*');
         s.header('Access-Control-Allow-Methods', 'GET');
         s.header('Access-Control-Allow-Headers', '*');
         s.header('Access-Control-Allow-Credentials', 'true');
         n();
     })
     .get('/robots.txt', (_req, res) => res
         .status(200)
         .type('text/plain')
         .send('User-Agent: *\r\nDisallow: /')
     )
 
     .use('/address', AddressRouter)
     .use('/addr', AddressRouter)
     .use('/addrs', AddressRouter)
 ;
 
 const Server = HttpCreate(ex)
    .listen(4577);