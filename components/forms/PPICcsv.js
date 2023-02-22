import { useForm } from "react-hook-form";

export default function Form() {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();

	const onSubmit = async payload => {
		console.log(payload);
	};

	return (
		<form className='flex flex-col gap-6'>
			<input
				type='file'
				encType='multipart/form-data'
				className='p-2 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400'
				{...register("csvFile")}
			/>

			<button className='p-2 bg-slate-900 text-slate-50'>submit</button>
		</form>
	);
}
