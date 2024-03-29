import React, { useState } from "react";
import "tailwindcss/tailwind.css";

import Table from "../app/comps/Table";
import Filter from "../app/comps/Filter";

const App: React.FC = () => {
	const [maxCoins, setMaxCoins] = useState(10000);
	const [minVol, setMinVol] = useState(250000);
	const [products, setProducts] = useState<Product[]>([]);

	return (
		<div className="w-full bg-gray-700 h-full min-h-screen">
			<div className="flex flex-row py-3 space-x-3 max-w-80 mx-auto">
				<div className="min-w-30">
					<Filter
						maxCoins={maxCoins}
						setMaxCoins={(e: number) => setMaxCoins(e)}
						minVol={minVol}
						setMinVol={(e: number) => setMinVol(e)}
						reload={async (e: Promise<Product[]>) =>
							setProducts(await e)
						}
					/>
				</div>
				<Table
					maxCoins={maxCoins}
					minVol={minVol}
					products={products}
				/>
			</div>
		</div>
	);
};

export default App;
