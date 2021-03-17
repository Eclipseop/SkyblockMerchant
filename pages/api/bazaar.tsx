// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
const HYPIXEL_API_KEY = process.env.API_KEY;
import axios from "axios";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const data = (
		await axios.get(
			"https://api.hypixel.net/skyblock/bazaar?key=" + HYPIXEL_API_KEY
		)
	).data.products;
	const d = [];
	for (const product in data) {
		const item = data[product];
		const real = {
			name: item.quick_status.productId,
			buyPrice: item.quick_status.buyPrice,
			sellPrice: item.quick_status.sellPrice,
			profit: item.quick_status.buyPrice - item.quick_status.sellPrice,
			volume:
				(item.quick_status.buyVolume + item.quick_status.sellVolume) /
				2,
			roi:
				(item.quick_status.buyPrice - item.quick_status.sellPrice) /
				item.quick_status.sellPrice,
		};
		d.push(real);
	}
	res.status(200).json({ data: d });
};
