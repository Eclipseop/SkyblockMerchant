import React, { useEffect } from "react";

import axios from "axios";
import Product from "../types/Product";

interface Props {
	setMaxCoins(coins: number): void;
	maxCoins: number;
	setMinVol(volume: number): void;
	minVol: number;
	reload(f: Promise<Product[]>): void;
}

// TODO change to internal api
const API = "http://localhost:3000/api/bazaar";

const Filter: React.FC<Props> = (props: Props) => {
	const load = async (): Promise<Product[]> => {
		const response = (await axios.get(API)).data.data;
		return response;
	};

	useEffect(() => {
		props.reload(load());
	}, []);

	return (
		<div className="flex flex-col bg-white p-2 max-w-full rounded-sm">
			<p className="break-words">
				This app uses the official{" "}
				<a
					href="https://api.hypixel.net/"
					target="_blank"
					rel="noreferrer"
					className="text-blue-500"
				>
					HyPixel SkyBlock API
				</a>
				. The item information is updated every 10 minutes.
			</p>
			<br></br>
			<div className="flex flex-col">
				<label>Max Coins Item: {props.maxCoins}</label>
				<input
					type="range"
					min="0"
					max="100000"
					step="10000"
					value={props.maxCoins}
					onChange={(e) => props.setMaxCoins(Number(e.target.value))}
				></input>
				<label>Min Volume: {props.minVol}</label>
				<input
					type="range"
					min="0"
					max="1000000"
					step="50000"
					value={props.minVol}
					onChange={(e) => props.setMinVol(Number(e.target.value))}
				></input>
				<br></br>
				<button
					className="border bg-green-300 rounded shadow hover:bg-green-400"
					onClick={() => props.reload(load())}
				>
					Reload Data
				</button>
			</div>
		</div>
	);
};

export default Filter;
