import { useForm } from "react-hook-form";
import { parse } from "csv-parse";

const URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function Form() {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();

	const handleParseCSV = async data => {
		const headers = data[0];
		const rows = data.slice(1);
		const result = [];

		let prevValue = "";
		for (let i = 0; i < rows.length; i++) {
			const row = rows[i];
			const obj = {};

			if (row[0]) {
				obj[headers[0]] = row[0];
				prevValue = row[0];
			} else {
				obj[headers[0]] = prevValue;
			}

			for (let j = 1; j < row.length; j++) {
				obj[headers[j]] = row[j];
			}

			result.push(obj);
		}

		console.log(result);
	};

	const onSubmit = async payload => {
		const { csvFile } = payload;
		const file = csvFile[0]; // Get the first file in the array

		const fileReader = new FileReader();
		fileReader.readAsText(file);

		fileReader.onload = () => {
			parse(fileReader.result, { columns: true }, (err, records) => {
				if (err) {
					console.error(err);
				} else {
					const updatedRecords = records.reduce((acc, record, index) => {
						if (index === 0) {
							return [
								...acc,
								{
									productNo: record["Product No."],
									materialNo: record["Material No."],
								},
							];
						}
						if (!record["Product No."]) {
							record["Product No."] = acc[acc.length - 1]["productNo"];
						}
						if (!record["Material No."]) {
							record["Material No."] = acc[acc.length - 1]["materialNo"];
						}
						return [
							...acc,
							{
								productNo: record["Product No."],
								materialNo: record["Material No."],
							},
						];
					}, []);
					fetch(URL + "/csv", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							data: updatedRecords,
						}),
					})
						.then(res => res.json())
						.then(res => console.log(res));
				}
			});
		};
		// console.log(parsedCsv);

		// try {
		// 	const response = fetch(URL + "/", {
		// 		method: "POST",
		// 		headers: {
		// 			"Content-Type": "application/json",
		// 		},
		// 		body: JSON.stringify({
		// 			test: parsedCsv,
		// 		}),
		// 	});
		// 	const data = await response.json();
		// 	console.log(data);
		// } catch (e) {
		// 	console.error(e);
		// }
	};

	// {/* method='post' */}
	return (
		<form
			encType='multipart/form-data'
			className='flex flex-col gap-6'
			onSubmit={handleSubmit(onSubmit)}
		>
			<input
				type='file'
				accept='.csv'
				className='p-2 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400'
				{...register("csvFile")}
			/>

			<button className='p-2 bg-slate-900 text-slate-50'>submit</button>
		</form>
	);
}

// import { useForm } from "react-hook-form";
// import parse from "csv-parse";

// export default function Form() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const onSubmit = async (data) => {
//     const { csvFile } = data;
//     const file = csvFile[0]; // Get the first file in the array

//     const fileReader = new FileReader();
//     fileReader.readAsText(file);

//     fileReader.onload = () => {
//       parse(fileReader.result, { columns: true }, (err, records) => {
//         if (err) {
//           console.error(err);
//         } else {
//           console.log(records);
//           // Do something with the parsed data
//         }
//       });
//     };
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <input
//         type="file"
//         accept=".csv"
//         {...register("csvFile", { required: true })}
//       />
//       {errors.csvFile && <span>This field is required</span>}
//       <button type="submit">Submit</button>
//     </form>
//   );
// }

// const handleParseCSV = async data => {
//   const headers = data[0];
//   const rows = data.slice(1);
//   const result = [];

//   let prevValue = "";
//   for (let i = 0; i < rows.length; i++) {
//     const row = rows[i];
//     const obj = {};

//     if (row[0]) {
//       obj[headers[0]] = row[0];
//       prevValue = row[0];
//     } else {
//       obj[headers[0]] = prevValue;
//     }

//     for (let j = 1; j < row.length; j++) {
//       obj[headers[j]] = row[j];
//     }

//     result.push(obj);
//   }

//   console.log(result);
// };

// fileReader.onload = () => {
// 	parse(
// 		fileReader.result,
// 		{ columns: true, skip_empty_lines: true },
// 		(err, records) => {
// 			if (err) {
// 				console.error(err);
// 			} else {
// 				// Do something with the parsed data
// 				console.log(records);
// 				const updatedRecords = records.map((record, index, arr) => {
// 					if (index === 0) {
// 						return record;
// 					}
// 					const prevRecord = arr[index - 1];
// 					if (!record["column1"]) {
// 						return {
// 							...record,
// 							column1: prevRecord["column1"],
// 						};
// 					}
// 					return record;
// 				});
// 				console.log(updatedRecords);
// 			}
// 		}
// 	);
// };
