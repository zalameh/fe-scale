import { useEffect } from "react";
import { useForm } from "react-hook-form";

const URL = process.env.NEXT_PUBLIC_NODE_RED_BACK_END_URL;

export default function Page() {
  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { isSubmitSuccessful },
  } = useForm();

  const onSubmit = async (payload) => {
    console.log("payload :\n", payload);

    let data;

    try {
      const response = await fetch(URL + "/sch", {
        method: "PUT",
        body: JSON.stringify(payload),
      });
      data = await response.json();
      console.log("response data :\n", data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  }, [formState]);

  return (
    <div className='mx-auto container pt-20'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='text-lg flex flex-col gap-4'
      >
        <input
          type='number'
          className='p-2'
          {...register("sapOrderNo", { required: true })}
          placeholder='SAP Order No.'
        />
        <input
          type='number'
          className='p-2'
          {...register("productNo", { required: true })}
          placeholder='Product No.'
        />
        <input
          type='number'
          className='p-2'
          {...register("materialNo", { required: true })}
          placeholder='Material No.'
        />
        <input
          type='number'
          step='0.1'
          className='p-2'
          {...register("quantity", { valueAsNumber: true })}
          placeholder='Qty in Kg.'
        />
        <input
          type='number'
          step='0.1'
          className='p-2'
          {...register("correction", { valueAsNumber: true })}
          placeholder='Correction'
        />
        <button>submit</button>
      </form>
    </div>
  );
}

const test = [
  {
    sapOrderNo: 1,
    productNo: 1,
    materialNo: 1,
  },
  {
    sapOrderNo: 1,
    productNo: 2,
    materialNo: 1,
  },
  {
    sapOrderNo: 1,
    productNo: 1,
    materialNo: 2,
  },
];

const test1 = [
  { no: 1, materials: [{ no: 1 }] },
  { no: 2, materials: [{ no: 1 }] },
];
