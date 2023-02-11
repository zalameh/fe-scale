import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const URL = process.env.NEXT_PUBLIC_NODE_RED_BACK_END_URL;

export default function Page() {
  const [SAPOrderNoList, setSAPOrderNoList] = useState([]);
  const [productNoList, setProductNoList] = useState([]);
  const [materialNoList, setMaterialNoList] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    getValues,
    formState,
    formState: { isSubmitSuccessful },
  } = useForm();

  const onSubmit = async payload => {
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

  const getSAPOrderNoList = async () => {
    let data;
    try {
      const response = await fetch(URL + "/list-sap-no", {
        method: "GET",
      });
      data = await response.json();
      console.log("response data :\n", data);
      setSAPOrderNoList(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getProductNoList = async no => {
    let data;
    try {
      const response = await fetch(URL + "/products-no?sapOrderNo=" + no, {
        method: "GET",
      });
      data = await response.json();
      console.log(data);
      setProductNoList(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getMaterialNoList = async (sap, prod) => {
    let data;
    try {
      const response = await fetch(
        URL + "/materials-no?sapOrderNo=" + sap + "&productNo=" + prod,
        {
          method: "GET",
        }
      );
      data = await response.json();
      console.log(data);
      setMaterialNoList(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSAPOrderNoList();
  }, []);

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset((data) => {
        console.log(data)
      });
    }
  }, [formState]);

  // useEffect(() => {
  //   let no = getValues("sapOrderNo");
  //   console.log(no);
  //   if (no) {
  //     getProductNoList(no);
  //   }
  // }, [SAPOrderNoList]);

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='mx-auto max-w-xl text-lg mt-20 flex flex-col gap-4 text-slate-800'
      >
        <select
          defaultValue={""}
          className='p-2 bg-white cursor-pointer'
          {...register("sapOrderNo", {
            required: true,
            onChange: e => {
              const value = e.target.value;
              getProductNoList(value);
            },
          })}
        >
          <option disabled value=''>
            {" "}
            -- Select an Option --{" "}
          </option>
          {SAPOrderNoList.length !== 0 &&
            SAPOrderNoList.map((sap, index) => {
              return (
                <option key={index} value={sap}>
                  {sap}
                </option>
              );
            })}
        </select>

        <select
          defaultValue={""}
          className={`p-2 bg-white ${watch("sapOrderNo") && "cursor-pointer"}`}
          {...register("productNo", {
            required: true,
            onChange: e => {
              let sap = getValues("sapOrderNo");
              let prod = e.target.value;
              console.log(sap, prod);
              getMaterialNoList(sap, prod);
            },
            // disabled if sapOrderNo empty
            disabled: !watch("sapOrderNo"),
          })}
        >
          <option disabled value=''>
            {" "}
            -- Select an Option --{" "}
          </option>
          {productNoList.length !== 0 &&
            productNoList.map((sap, index) => {
              return (
                <option key={index} value={sap}>
                  {sap}
                </option>
              );
            })}
          {/* <option value='onta'>onta</option> */}
        </select>

        <select
          defaultValue={""}
          className={`p-2 bg-white ${watch("productNo") && "cursor-pointer"}`}
          {...register("materialNo", {
            required: true,
            // disabled if productNo empty
            disabled: !watch("productNo"),
          })}
        >
          <option disabled value=''>
            {" "}
            -- Select an Option --{" "}
          </option>
          {materialNoList.length !== 0 &&
            materialNoList.map((n, index) => {
              return (
                <option key={index} value={n}>
                  {n}
                </option>
              );
            })}
          {/* <option value='onta'>onta</option> */}
        </select>

        <input
          type='number'
          step='0.1'
          className='p-2'
          {...register("quantity", { valueAsNumber: true })}
          placeholder='Qty in Kg.'
        />
        <input
          type='text'
          className='p-2'
          {...register("storageLoc")}
          placeholder='Storage Location'
        />
        <input
          type='text'
          className='p-2'
          {...register("storageBin")}
          placeholder='Storage Bin'
        />
        <input
          type='number'
          step='0.1'
          className='p-2'
          {...register("correction", { valueAsNumber: true, disabled: true  })}
          placeholder='Correction'
        />
        <input
          type='number'
          step='0.1'
          className='p-2'
          {...register("temperature", { valueAsNumber: true, disabled: true })}
          placeholder='Temperature in &deg;C'
        />
        <input
          type='number'
          step='0.1'
          className='p-4 border border-red-300 bg-slate-700 text-red-800'
          {...register("actualQuantity", { valueAsNumber: true, disabled: true  })}
          placeholder='Actual Qty in Kg.'
        />
        <button>submit</button>
      </form>
      {/* <button onClick={getSAP}>get sap</button> */}
    </>
  );
}
