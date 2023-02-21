export async function getServerSideProps(context) {
	const { query } = context;
	const { productId, sapId, materialNo } = query;
	let d;
	try {
		// /material/details/:no?sapId=63f20c398e8b72be5e6c53f1&productId=63f20c3a8e8b72be5e6c53f4
		const response = await fetch(
			`http://127.0.0.1:3000/material/details/${materialNo}?sapId=${sapId}&productId=${productId}`
		);
		if (response.status === 400)
			return {
				redirect: {
					destination: "/404",
					permanent: false,
				},
			};
		d = await response.json();
	} catch (error) {
		console.error(error);
	}

	return {
		props: {
			example: "test",
			d,
		},
	};
}

const URL = process.env.NEXT_PUBLIC_NODE_RED_BACK_END_URL;

export default function Page({ example, d }) {
	let materialDuration;
	let productDuration;

	if (d.material.endTime) {
		const end = d.material.endTime;
		const start = d.material.startTime;
		const diff = end - start;
		const hours = Math.floor(diff / (1000 * 60 * 60));
		const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
		const seconds = Math.floor((diff % (1000 * 60)) / 1000);
		materialDuration = `${hours.toString().padStart(2, "0")}:${minutes
			.toString()
			.padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
	}

	if (d.product.endTime) {
		const end = d.product.endTime;
		const start = d.product.startTime;
		const diff = end - start;
		const hours = Math.floor(diff / (1000 * 60 * 60));
		const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
		const seconds = Math.floor((diff % (1000 * 60)) / 1000);
		productDuration = `${hours.toString().padStart(2, "0")}:${minutes
			.toString()
			.padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
	}

	return (
		<>
			{example}
			<main>
				<div className='container mx-auto flex flex-col gap-6 pt-14'>
					<div className='flex justify-between bg-slate-200 py-4 px-12 rounded-lg'>
						<div>SAP Order No.: </div>
						<div>{d.sap.no}</div>
					</div>
					<div className='flex justify-between bg-slate-200 py-4 px-12 rounded-lg'>
						<div>Product No.</div>
						<div>{d.product.no}</div>
					</div>
					<div className='flex justify-between bg-slate-200 py-4 px-12 rounded-lg'>
						<div>Product Time Duration</div>
						<div>{d.product.endTime ? productDuration : "null"}</div>
					</div>
					<div className='flex justify-between bg-slate-200 py-4 px-12 rounded-lg'>
						<div>Material No. :</div>
						<div>{d.material.no}</div>
					</div>
					<div className='flex justify-between bg-slate-200 py-4 px-12 rounded-lg'>
						<div>Material Time Duration :</div>
						<div>{d.material.endTime ? materialDuration : "null"}</div>
					</div>
					<div className='flex justify-between bg-slate-200 py-4 px-12 rounded-lg'>
						<div>Quantity</div>
						<div>{d.material.quantity ? d.material.quantity : "null"}</div>
					</div>
					<div className='flex justify-between bg-slate-200 py-4 px-12 rounded-lg'>
						<div>Actual Quantity</div>
						<div>
							{d.material.actualQuantity ? d.material.actualQuantity : "null"}
						</div>
					</div>
					{/* <div>product: {d.productNo}</div> */}
					{/* <div>material: {d.materialNo}</div> */}
				</div>
			</main>
		</>
	);
}
