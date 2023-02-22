import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

const URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function Form() {
	const [materialTime, setMaterialTime] = useState(0);
	const [running, setRunning] = useState(false);
	const [productList, setProductList] = useState([]);
	const [product, setProduct] = useState(null);
	const [materialList, setMaterialList] = useState([]);
	const [material, setMaterial] = useState(null);
	const [isOperationStart, setIsOperationStart] = useState(false);

	const {
		register,
		handleSubmit,
		watch,
		reset,
		setValue,
		formState: { errors },
	} = useForm();

	useEffect(() => {
		let interval;
		if (running) {
			interval = setInterval(() => {
				setMaterialTime(prevTime => prevTime + 100);
			}, 100);
		} else if (!running) {
			clearInterval(interval);
		}
		return () => clearInterval(interval);
	}, [running]);

	const getWeight = () => {
		const min = 1;
		const max = 100;
		const randomNum = Math.floor(Math.random() * (max - min + 1) + min);
		setValue("actualQuantity", randomNum);
	};

	useEffect(() => {
		reset({
			material: "",
		});
	}, [product]);

	useEffect(() => {
		console.log("product", product);
		console.log("material", material);
	}, [material]);

	useEffect(() => {
		fetch(URL + "/product?status=false")
			.then(res => {
				return res.json();
			})
			.then(res => {
				setProductList(res.data);
			});
	}, []);

	const onSubmit = payload => {
		console.log(payload);
	};

	const handleProductNoChange = e => {
		const productId = e.target.value;
		fetch(`${URL}/material?productId=${productId}`)
			.then(res => res.json())
			.then(res => {
				console.log(res);
				setProduct(productId);
				setMaterialList(res.data);
			});
	};

	const handleMaterialNoChange = e => {
		const materialId = e.target.value;
		fetch(`${URL}/material?productId=${materialId}`)
			.then(res => res.json())
			.then(res => {
				console.log(res);
				setMaterial(materialId);
				setMaterialList(res.data);
			});
	};

	return (
		<div className='flex w-full gap-16'>
			<form
				className='flex w-full flex-col gap-10'
				onSubmit={handleSubmit(onSubmit)}
			>
				<div>
					<label>SAP Order No.</label>
					<input
						{...register("sapOrderNo", { disabled: running })}
						className='w-full py-2 px-4'
						type='number'
					/>
				</div>

				<div>
					<label>Product No.</label>
					<select
						defaultValue={""}
						className='w-full py-2 px-4'
						{...register("productNo", { required: true, disabled: running })}
						onChange={handleProductNoChange}
					>
						<option disabled value=''>
							{" "}
							-- Select an Option --{" "}
						</option>
						{productList.map(option => (
							<option key={option._id} value={option._id}>
								{option.no}
							</option>
						))}
					</select>
				</div>

				<div>
					<label>Material No.</label>
					<select
						defaultValue={""}
						className='w-full py-2 px-4'
						{...register("materialNo", { required: true, disabled: running })}
						onChange={handleMaterialNoChange}
					>
						<option disabled value=''>
							{" "}
							-- Select an Option --{" "}
						</option>
						{materialList.map(option => (
							<option key={option._id} value={option._id}>
								{option.no}
							</option>
						))}
					</select>
				</div>

				<div>
					<label>Quantity</label>
					<input
						type='number'
						className='w-full py-2 px-4'
						{...register("quantity", {
							valueAsNumber: true,
							disabled: running,
						})}
					/>
				</div>

				<div>
					<label>Actual Quantity</label>
					<div className='flex justify-between'>
						<select
							defaultValue={""}
							className='py-2 px-4'
							{...register("test")}
						>
							<option disabled value=''>
								{" "}
								-- Select an Option --{" "}
							</option>
							<option value='2 ton'>2 ton</option>
							<option value='350 kg'>350 kg</option>
							<option value='2 kg'>2 kg</option>
						</select>
						<input
							type='number'
							className='py-2 px-4'
							{...register("actualQuantity", {
								valueAsNumber: true,
								disabled: true,
							})}
						/>
						<button
							className='p-2 text-slate-50 bg-slate-900'
							onClick={getWeight}
							type='button'
						>
							get weight
						</button>
					</div>
				</div>

				<button
					className='bg-slate-900 text-slate-50 p-2'
					type='submit'
					// disabled={!product}
				>
					Submit
				</button>
			</form>

			<div className='w-3/5 flex flex-col'>
				<div className='bg-slate-200 p-3'>
					<div className='text-center'>Material Timer</div>
					<div>
						<div className=''>
							<span>
								{("0" + Math.floor((materialTime / 60000) % 60)).slice(-2)}:
							</span>
							<span>
								{("0" + Math.floor((materialTime / 1000) % 60)).slice(-2)}:
							</span>
							<span>{("0" + ((materialTime / 10) % 100)).slice(-2)}</span>
						</div>
						<div className=''>
							{!running ? (
								<button
									// className={`${
									//   !SAP || !product || (!material && "cursor-pointer")
									// }`}
									// disabled={!SAP || !product || !material}
									onClick={() => setRunning(true)}
								>
									Start
								</button>
							) : (
								<button
									onClick={() => {
										setRunning(false);
										setMaterialTime(0);
									}}
								>
									Stop
								</button>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

// import { useForm } from 'react-hook-form';

// function MyForm() {
//   const { register, watch } = useForm();

//   // watch for changes in the first field
//   const field1Value = watch('field1');

//   return (
//     <form>
//       <input name="field1" ref={register} />

//       {/* Only enable field2 when field1 is not empty, null or 0 */}
//       <input name="field2" ref={register} disabled={!field1Value} />
//     </form>
//   );
// }

// This code is a React hook that uses the useEffect function to set up an interval that updates the state of a component.

// The useEffect function takes two arguments: a function to execute and an array of dependencies. In this case, the function is a callback that sets up an interval and updates the materialTime state. The running variable is a dependency, which means that the callback will be called whenever running changes.

// Here's a step-by-step breakdown of what the code does:

//     Define a variable called interval to hold the interval ID returned by setInterval.
//     If running is true, set up an interval that updates the materialTime state every 10 milliseconds by calling setMaterialTime(prevTime => prevTime + 10).
//     If running is false, clear the interval by calling clearInterval(interval).
//     Return a function that will be called when the component unmounts or when running changes. This function will clear the interval to avoid any memory leaks.

// So, this code sets up an interval that updates the materialTime state every 10 milliseconds if running is true, and clears the interval if running is false. The useEffect hook ensures that the interval is created and cleaned up correctly as the component renders and unmounts.

// const hours = Math.floor(materialTime / 3600000);
// const minutes = Math.floor((materialTime / 60000) % 60);
// const seconds = Math.floor((materialTime / 1000) % 60);
