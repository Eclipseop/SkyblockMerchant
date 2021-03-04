import React from "react";

interface Props {
	currentPage: number;
	maxPages: number;
	changePage(page: number): void;
}

const upperLimit = (props: Props): number => {
	return Math.min(props.currentPage + 2, props.maxPages);
};

const lowerLimit = (props: Props): number => {
	const l = Math.min(props.maxPages, props.currentPage - 2);
	return l < 1 ? 1 : l;
};

const range = (lower: number, upper: number): number[] => {
	if (upper == 0) {
		return [2, 3, 4];
	}
	const l = Array(upper - lower + 1)
		.fill(1)
		.map((v, i) => {
			return i + lower;
		});
	return l;
};

// TODO switch to server side maybe?
const Pagination: React.FC<Props> = (props: Props) => {
	return (
		<div className="mt-1 flex flex-row border bg-white rounded-sm">
			<div className="mx-auto space-x-3">
				<a
					href="#"
					onClick={() =>
						props.changePage(Math.max(1, props.currentPage - 1))
					}
				>
					&lt;
				</a>
				{range(lowerLimit(props), upperLimit(props)).map((v) => {
					return (
						<a
							href="#"
							className={
								v === props.currentPage
									? "text-green-500"
									: "italic"
							}
							onClick={() => props.changePage(v)}
							key={v}
						>
							{v}
						</a>
					);
				})}
				<a href="#">&gt;</a>
			</div>
		</div>
	);
};

export default Pagination;
