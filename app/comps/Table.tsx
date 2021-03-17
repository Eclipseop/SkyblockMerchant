import React, { useState } from "react";

import Item from "./Item";
import Pagination from "./Pagination";

interface Props {
	maxCoins: number;
	minVol: number;
	products: Product[];
}

const ITEMS_PER_PAGE = 10;

const Table: React.FC<Props> = (props: Props) => {
	const [sorted, setSorted] = useState("");
	const [accending, setAccending] = useState(true);
	const [page, setPage] = useState(1);

	const handleClick = (name: string) => {
		if (name == sorted) {
			setAccending(!accending);
			console.log("same click :)");
		}
		setSorted(name);
	};

	return (
		<div>
			<table className="table-fixed bg-white shadow w-full">
				<thead className="text-center border-b border-black bg-green-300 ">
					<tr>
						<th
							className="w-1/3 hover:bg-green-400"
							onClick={() => handleClick("name")}
						>
							Name
						</th>
						<th
							className="w-1/6 hover:bg-green-400"
							onClick={() => handleClick("buyPrice")}
						>
							Sell For
						</th>
						<th
							className="w-1/6 hover:bg-green-400"
							onClick={() => handleClick("sellPrice")}
						>
							Buy For
						</th>
						<th
							className="w-1/6 hover:bg-green-400"
							onClick={() => handleClick("profit")}
						>
							Profit
						</th>
						<th
							className="w-1/6 hover:bg-green-400"
							onClick={() => handleClick("roi")}
						>
							ROI
						</th>
					</tr>
				</thead>
				<tbody className="text-right">
					{props.products
						?.filter((e: Product) => {
							if (e.volume < props.minVol) {
								return false;
							}
							return e.sellPrice < props.maxCoins;
						})
						.sort((a, b) => {
							const aVal = a[sorted] as number;
							const bVal = b[sorted] as number;

							if (accending) {
								return bVal - aVal;
							}
							return aVal - bVal;
						})
						.slice(
							(page - 1) * ITEMS_PER_PAGE,
							page * ITEMS_PER_PAGE
						)
						.map((e: Product) => (
							<Item {...e} key={e.name} />
						))}
				</tbody>
			</table>
			<Pagination
				currentPage={page}
				maxPages={Math.ceil(props.products.length / ITEMS_PER_PAGE)}
				changePage={(p: number) => setPage(p)}
			/>
		</div>
	);
};

export default Table;
