import { useForm } from "react-hook-form";

const URL = process.env.NEXT_PUBLIC_NODE_RED_BACK_END_URL;

export default function Form() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = payload => {
    console.log(payload);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col gap-6 w-4/5 md:w-2/3 mx-auto'
    >
      <div>
        <label>SAP Order No.</label>
        <input
          type='number'
          className='w-full py-2 px-4'
          {...register("sapOrderNo", { required: true })}
        />
      </div>

      <div>
        <label>Product No.</label>
        <input
          type='number'
          className='w-full py-2 px-4'
          {...register("productNo", { required: true })}
        />
      </div>

      <div>
        <label>Material No.</label>
        <input
          type='number'
          className='w-full py-2 px-4'
          {...register("materialNo", { required: true })}
        />
      </div>

      <div>
        <label>Quantity</label>
        <input
          type='number'
          className='w-full py-2 px-4'
          {...register("quantity", { valueAsNumber: true })}
        />
      </div>

      <button className='p-2 bg-slate-900 text-slate-50'>submit</button>
    </form>
  );
}
