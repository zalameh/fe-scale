import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

const URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function Form() {
  const [materialTime, setMaterialTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [sapList, setSAPList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [materialList, setMaterialList] = useState([]);
  const [SAP, setSAP] = useState(null);
  const [sapId, setSAPId] = useState("");
  const [product, setProduct] = useState(null);
  const [material, setMaterial] = useState(null);

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

  const getWeight = () => {
    let payload;
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

  const startTime = async () => {
    let somethin;
  };

  useEffect(() => {
    fetch(URL + "/sap")
      .then(res => {
        return res.json();
      })
      .then(res => {
        console.log(res);
        setSAPList(res.data);
      });
  }, []);

  // useEffect(() => {
  //   if (SAP) {
  //     fetch(URL + "/product?sapId=" + SAP._id)
  //       .then(res => {
  //         return res.json();
  //       })
  //       .then(res => {
  //         setProductList(res.data);
  //       });
  //     console.log("ada sap");
  //   }
  // }, [SAP]);

  return (
    <div className='flex w-full gap-16'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col w-full gap-6'
      >
        <div>
          <label>SAP Order No.</label>
          <select
            defaultValue={""}
            className='w-full py-2 px-4'
            {...register("sapOrderNo", {
              required: true,
              onChange: e => {
                const id = e.target.value;
                console.log(id);
                // setSAPId(id);
              },
            })}
          >
            <option disabled value=''>
              {" "}
              -- Select an Option --{" "}
            </option>
            {sapList.length !== 0 &&
              sapList.map((each, index) => (
                <option key={each._id} value={each._id}>
                  {each.no}
                </option>
              ))}
          </select>
        </div>

        <div>
          <label>Product No.</label>
          <select
            type='number'
            defaultValue={""}
            className='w-full py-2 px-4'
            {...register("productNo", {
              required: true,
              disabled: !SAP,
            })}
          >
            <option disabled value=''>
              {" "}
              -- Select an Option --{" "}
            </option>
            {productList.length !== 0 &&
              productList.map((each, index) => (
                <option key={each._id} value={each}>
                  {each.no}
                </option>
              ))}
          </select>
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
                  className={`${
                    !SAP || !product || (!material && "cursor-pointer")
                  }`}
                  disabled={!SAP || !product || !material}
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
