interface Product {
    name: string;
	sellPrice: number;
	buyPrice: number;
	roi: number;
	profit: number;
	volume: number;
	[key: string]: string | number;
}

export = Product;