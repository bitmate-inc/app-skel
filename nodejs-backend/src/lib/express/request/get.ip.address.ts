import {Request} from 'express';

export function getIpAddress(req: Request) {
	let ip = req.ip;

	// fix for if you have both ipv4 and ipv6
	if (ip.substr(0, 7) === '::ffff:') {
		ip = ip.substr(7);
	}

	return ip;
}
