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
import { createServer as HttpCreate } from "http";

const ev_root = (req, res) => {
    var ip     = req.socket.remoteAddress,
        family = req.socket.remoteFamily,
        port   = req.socket.remotePort;
    
    res
        .status(200)

    switch(req.params.rest?.toLowerCase?.()) {
    case 'json':
        res
            .contentType('Application/json')
            .send({
                ip: ip,
                family: family,
                port: port
            });
        break;
    case 'xml':
        res
            .contentType('text/xml')
            .send(`<ipinfo><ip>${ip}</ip><family>${family}</family><port>${port}</port></ipinfo>`);
    case 'text':
    default:
        res
            .contentType('text/plain')
            .send(`IP ADDRESS INFORMATION

IP ADDRESS: ${ip}
FAMILY:     ${family}
PORT:       ${port}
END`);
        break;
    }
};
 
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

    .get('/', ev_root)
    .get('/:rest', ev_root)
;

const Server = HttpCreate(ex)
    .listen(17100);