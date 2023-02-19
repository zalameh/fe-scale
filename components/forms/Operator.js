import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

export default function Form() {
  const [weight, setWeight] = useState(0);
  const [materialTime, setMaterialTime] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setMaterialTime(prevTime => prevTime + 10);
      }, 10);
    } else if (!running) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);

  const getWeight = async () => {
    let payload;
    try {
      const response = await fetch(URL + "/weight");
      payload = await response.json();
    } catch (error) {
      console.error(error);
    }
    setWeight(payload.payload);
  };

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
    <div className='flex gap-16'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col w-full gap-6'
      >
        <div>
          <label>SAP Order No.</label>
          <select
            defaultValue={""}
            className='w-full py-2 px-4'
            {...register("sapOrderNo", { required: true })}
          >
            <option disabled value=''>
              {" "}
              -- Select an Option --{" "}
            </option>
            <option value='onta'>onta</option>
          </select>
        </div>

        <div>
          <label>Product No.</label>
          <input
            type='number'
            className='w-full py-2 px-4'
            {...register("productNo", { required: true, disabled: true })}
          />
        </div>

        <div>
          <label>Material No.</label>
          <input
            type='number'
            className='w-full py-2 px-4'
            {...register("materialNo", { required: true, disabled: true })}
          />
        </div>

        <div>
          <label>Quantity</label>
          <input
            type='number'
            className='w-full py-2 px-4'
            {...register("quantity", { valueAsNumber: true, disabled: true })}
          />
        </div>

        <div>
          <label>Actual Quantity</label>
          <div className='flex justify-between'>
            <select
              defaultValue={""}
              className='py-2 px-4'
              {...register("sapOrderNo", { required: true })}
            >
              <option disabled value=''>
                {" "}
                -- Select an Option --{" "}
              </option>
              <option value='onta'>onta</option>
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
            >
              get weight
            </button>
          </div>
        </div>

        <button className='p-2 bg-slate-900 text-slate-50'>submit</button>
      </form>

      <div className='w-2/3'>
        <div className='bg-slate-200'>
          <div className='numbers'>
            <span>
              {("0" + Math.floor((materialTime / 60000) % 60)).slice(-2)}:
            </span>
            <span>
              {("0" + Math.floor((materialTime / 1000) % 60)).slice(-2)}:
            </span>
            <span>{("0" + ((materialTime / 10) % 100)).slice(-2)}</span>
          </div>

          <div className='buttons'>
            <button onClick={() => setRunning(true)}>Start</button>
            <button
              onClick={() => {
                setRunning(false);
                setMaterialTime(0);
              }}
            >
              Stop
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
