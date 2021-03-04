import React from "react";
import Product from "../types/Product";

const parseName = (id: string): string => {
	id = id.replaceAll("_", " ");
	id = id.substr(0, 1) + id.substr(1, id.length).toLocaleLowerCase();
	id = id.replaceAll(/[0-9]/g, "");
	id = id.replaceAll(":", "");
	return id;
};

const Item: React.FC<Product> = (product: Product) => {
	return (
		<tr>
			<td>{parseName(product.name)}</td>
			<td>{product.buyPrice.toFixed(1)}</td>
			<td>{product.sellPrice.toFixed(1)}</td>
			<td>{product.profit.toFixed(1)}</td>
			<td>{(product.roi * 100)?.toFixed(1)}%</td>
		</tr>
	);
};

export default Item;
