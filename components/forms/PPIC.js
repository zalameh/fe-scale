// import { useState } from "react";
import { useForm } from "react-hook-form";

const URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function Form() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // const [sap, setSAP] = useState(null);
  // const [product, setProduct] = useState(null);
  // const [material, setMaterial] = useState(null);

  const onSubmit = async payload => {
    let sap, product, material;

    try {
      const response = await fetch(URL + "/sap", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          no: payload.sapOrderNo,
        }),
      });
      const responseJson = await response.json();
      sap = responseJson.data;
    } catch (e) {
      console.error(e.message);
    }

    try {
      const response = await fetch(URL + "/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          no: payload.productNo,
          sapId: sap._id,
        }),
      });
      const responseJson = await response.json();
      product = responseJson.data;
    } catch (e) {
      console.error(e.message);
    }

    try {
      const response = await fetch(URL + "/material", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          no: payload.materialNo,
          productId: product._id,
          quantity: payload.quantity,
        }),
      });
      const responseJson = await response.json();
      material = responseJson.data;
    } catch (e) {
      console.error(e.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col gap-6 w-4/5 md:w-2/3 mx-auto'
    >
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

      <button className='p-2 bg-slate-900 text-slate-50'>submit</button>
    </form>
  );
}
