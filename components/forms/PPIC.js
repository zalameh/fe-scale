import { useId } from "react";
import { useForm } from "react-hook-form";

export default function Form() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const sap = useId();
  const material = useId();
  const batch = useId();
  const location = useId();
  const bin = useId();
  const qty = useId();
  const temp = useId();
  const _date = useId();

  const onSubmit = payload => {
    console.log(payload);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='text-slate-700 text-sm md:text-base'
    >
      <div className='mb-8 md:mb-10'>
        <label htmlFor={sap} className='block mb-2 md:ml-2'>
          SAP Order No.
        </label>
        <input
          id={sap}
          {...register("sap", { required: true })}
          className='block min-w-full p-2 md:px-4 rounded-md md:rounded-lg focus:outline-none focus:ring focus:ring-slate-300 border-2 border-slate-200 shadow-sm appearance-none'
        />
        {errors.sap?.type === "required" && (
          <span className='text-red-500 text-[12px] md:text-sm md:ml-2 absolute'>
            This field is required
          </span>
        )}
      </div>

      <div className='mb-8 md:mb-10'>
        <label htmlFor={batch} className='block mb-2 md:ml-2'>
          Batch No.
        </label>
        <input
          id={batch}
          type='number'
          {...register("batch")}
          className='block min-w-full p-2 md:px-4 rounded-md md:rounded-lg focus:outline-none focus:ring focus:ring-slate-300 border-2 border-slate-200 shadow-sm'
        />
      </div>

      <div className='mb-8 md:mb-10'>
        <label htmlFor={material} className='block mb-2 md:ml-2'>
          Material No.
        </label>
        <input
          id={material}
          type='number'
          {...register("material")}
          className='block min-w-full p-2 md:px-4 rounded-md md:rounded-lg focus:outline-none focus:ring focus:ring-slate-300 border-2 border-slate-200 shadow-sm'
        />
      </div>

      <div className='mb-8 md:mb-10'>
        <label htmlFor={qty} className='block mb-2 md:ml-2'>
          Qty in Kg.
        </label>
        <input
          id={qty}
          {...register("qty")}
          className='block min-w-full p-2 md:px-4 rounded-md md:rounded-lg focus:outline-none focus:ring focus:ring-slate-300 border-2 border-slate-200 shadow-sm'
        />
      </div>

      <div className='mb-8 md:mb-10'>
        <label htmlFor={location} className='block mb-2 md:ml-2'>
          Storage Location
        </label>
        <input
          id={location}
          {...register("location")}
          className='block min-w-full p-2 md:px-4 rounded-md md:rounded-lg focus:outline-none focus:ring focus:ring-slate-300 border-2 border-slate-200 shadow-sm'
        />
      </div>

      <div className='mb-8 md:mb-10'>
        <label htmlFor={bin} className='block mb-2 md:ml-2'>
          Storage Bin
        </label>
        <input
          id={bin}
          {...register("bin")}
          className='block min-w-full p-2 md:px-4 rounded-md md:rounded-lg focus:outline-none focus:ring focus:ring-slate-300 border-2 border-slate-200 shadow-sm'
        />
      </div>

      <div className='mb-8 md:mb-10'>
        <label htmlFor={_date} className='block mb-2 md:ml-2'>
          Date
        </label>
        <input
          id={_date}
          type='date'
          {...register("date")}
          className='block min-w-full p-2 md:px-4 rounded-md md:rounded-lg focus:outline-none focus:ring focus:ring-slate-300 border-2 border-slate-200 shadow-sm'
        />
      </div>

      <div className='mb-8 md:mb-10'>
        <label htmlFor={temp} className='block mb-2 md:ml-2'>
          Temperature
        </label>
        <input
          id={temp}
          {...register("temp")}
          className='block min-w-full p-2 md:px-4 rounded-md md:rounded-lg focus:outline-none focus:ring focus:ring-slate-300 border-2 border-slate-200 shadow-sm'
        />
      </div>

      <button className='w-full p-2 mt-6 md:mt-8 rounded-lg bg-slate-600 hover:bg-slate-500 active:bg-slate-400 text-white cursor-pointer shadow-sm'>
        Submit
      </button>
    </form>
  );
}
