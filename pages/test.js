import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

const URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function Form() {
  const { register, handleSubmit, setValue } = useForm();
  const [productList, setProductList] = useState([]);
  const [sapList, setSAPList] = useState([]);
  const [materialList, setMaterialList] = useState([]);

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

  const onSubmit = data => {
    console.log(data);
  };

  const handleSapOrderNoChange = e => {
    const sapId = e.target.value;
    fetch(`${URL}/product?sapId=${sapId}`)
      .then(res => res.json())
      .then(res => {
        console.log(res);
        setProductList(res.data);
      });
  };

  const handleProductNoChange = e => {
    const productId = e.target.value;
    fetch(`${URL}/material?productId=${productId}`)
      .then(res => res.json())
      .then(res => {
        console.log(res);
        setMaterialList(res.data);
      });
  };

  return (
    <div className='container mx-auto'>
      <div className='pt-20'>
        <form
          className='flex flex-col gap-10'
          onSubmit={handleSubmit(onSubmit)}
        >
          <input className='p-4 text-xl' type='number' />

          <select
            className='p-4 text-xl'
            {...register("sapOrderNo", { required: true })}
            onChange={handleSapOrderNoChange}
          >
            {sapList.length !== 0 &&
              sapList.map((each, index) => (
                <option key={each._id} value={each._id}>
                  {each.no}
                </option>
              ))}
          </select>

          <select
            className='p-4 text-xl'
            {...register("product", { required: true })}
            onChange={handleProductNoChange}
          >
            {productList.map(option => (
              <option key={option._id} value={option._id}>
                {option.no}
              </option>
            ))}
          </select>

          <select
            className='p-4 text-xl'
            {...register("material", { required: true })}
          >
            {materialList.map(option => (
              <option key={option._id} value={option._id}>
                {option.no}
              </option>
            ))}
          </select>

          <button type='submit'>search</button>
        </form>
      </div>
    </div>
  );
}
