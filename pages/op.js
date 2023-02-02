import { useEffect, useId, useState } from "react";
import { useForm } from "react-hook-form";

export default function Page() {
  const [isSAPSelected, setIsSAPSelected] = useState(false);
  const [isMaterialSelected, setIsMaterialSelected] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const sap = useId();
  const material = useId();
  const batch = useId();
  const location = useId();
  const bin = useId();
  const qty = useId();
  const actual = useId();
  const temp = useId();
  const _date = useId();

  useEffect(() => {
    if (isSAPSelected && isMaterialSelected) {
      setValue("batch", 2);
      setValue("qty", 100);
      setValue("location", "test");
      setValue("bin", "test");
      setValue("temp", 30);
    }
  }, [isSAPSelected, isMaterialSelected]);

  return (
    <>
      <header className='text-slate-700 text-sm md:text-base'>
        <div className='flex flex-row-reverse py-4 px-6'>
          {/* <button className='hover:text-slate-500 active:text-slate-400'>
            sign out
          </button> */}
        </div>
      </header>

      <main>
        <div className='px-4 py-10 md:py-16 md:w-[768px] md:mx-auto'>
          <h1 className='text-2xl md:text-4xl mb-8 md:mb-12'>Weighing Form</h1>

          <form className='text-slate-700 text-sm md:text-base'>
            <div className='mb-6 md:mb-8'>
              <label htmlFor='sap' className='block mb-2'>
                SAP Order no.
              </label>
              <select
                defaultValue={""}
                onChange={e => {
                  const v = e.target.value;
                  const isSelected = v !== "";
                  setIsSAPSelected(isSelected);
                }}
                id='sap'
                className='block border-2 md:text-lg border-slate-400 bg-slate-100 hover:bg-slate-200 py-2 px-4 w-full cursor-pointer rounded-lg'
              >
                <option disabled value=''>
                  {" "}
                  -- Select an Option --{" "}
                </option>
                <option value='1'>2938491</option>
                <option value='1'>2345</option>
                <option value='1'>897234</option>
              </select>
            </div>

            <div className='mb-6 md:mb-8'>
              <label htmlFor='material' className='block mb-2'>
                Material No.
              </label>
              <select
                id='material'
                defaultValue=''
                disabled={!isSAPSelected}
                onChange={e => {
                  const v = e.target.value;
                  const isSelected = v !== "";
                  setIsMaterialSelected(isSelected);
                }}
                className={`block border-2 md:text-lg border-slate-400 ${
                  isSAPSelected
                    ? "bg-slate-100 hover:bg-slate-200"
                    : "bg-slate-200"
                } py-2 px-4 w-full cursor-pointer rounded-lg`}
              >
                <option disabled value=''>
                  {" "}
                  {isSAPSelected
                    ? "-- Select an Option --"
                    : "-- Select SAP Order No. First --"}{" "}
                </option>
                <option value='123025003'>94108093</option>
                <option value='123045013'>23498</option>
                <option value='123032003'>908234</option>
              </select>
            </div>

            <div className='mb-8 md:mb-10'>
              <label htmlFor={batch} className='block mb-2 md:ml-2'>
                Batch No.
              </label>
              <input
                id={batch}
                disabled
                type='number'
                {...register("batch")}
                className='block min-w-full p-2 md:px-4 rounded-md md:rounded-lg focus:outline-none focus:ring focus:ring-slate-300 border-2 border-slate-200 shadow-sm'
              />
            </div>

            <div className='mb-8 md:mb-10'>
              <label htmlFor={qty} className='block mb-2 md:ml-2'>
                Qty in Kg.
              </label>
              <input
                id={qty}
                disabled
                {...register("qty")}
                className='block min-w-full p-2 md:px-4 rounded-md md:rounded-lg focus:outline-none focus:ring focus:ring-slate-300 border-2 border-slate-200 shadow-sm'
              />
            </div>

            <div className='mb-8 md:mb-10'>
              <label htmlFor={actual} className='block mb-2 md:ml-2'>
                Actual Qty in Kg.
              </label>
              <div className='flex gap-2'>
                <select
                  disabled={!isSAPSelected}
                  value=''
                  className={`block border-2 md:text-lg border-slate-400 ${
                    isSAPSelected
                      ? "bg-slate-100 hover:bg-slate-200"
                      : "bg-slate-200"
                  } py-2 px-4 cursor-pointer rounded-lg`}
                >
                  <option disabled value=''>
                    {" "}
                    -- Select an Option --{" "}
                  </option>
                  <option value='1'>Scale 1</option>
                  <option value='2'>Sclae 2</option>
                  <option value='3'>Scale 3</option>
                </select>
                <input
                  id={actual}
                  disabled
                  {...register("actual")}
                  className='block w-full p-2 md:px-4 rounded-md md:rounded-lg focus:outline-none focus:ring focus:ring-slate-300 border-2 border-slate-200 shadow-sm'
                />
              </div>
            </div>

            <div className='mb-8 md:mb-10'>
              <label htmlFor={location} className='block mb-2 md:ml-2'>
                Storage Location
              </label>
              <input
                id={location}
                disabled
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
                disabled
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
                disabled
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
                type='number'
                disabled
                {...register("temp")}
                className='block min-w-full p-2 md:px-4 rounded-md md:rounded-lg focus:outline-none focus:ring focus:ring-slate-300 border-2 border-slate-200 shadow-sm'
              />
            </div>

            <button
              disabled
              className='w-full p-2 mt-6 md:mt-8 rounded-lg bg-slate-600 hover:bg-slate-500 active:bg-slate-400 text-white cursor-pointer shadow-sm'
            >
              Submit
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
