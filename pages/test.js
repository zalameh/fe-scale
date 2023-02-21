import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

const URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function Form() {
  const { register, handleSubmit, setValue } = useForm();
  const [productList, setProductList] = useState([]);
  const [sapList, setSAPList] = useState([]);

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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <select
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
      <select {...register("product", { required: true })}>
        {productList.map(option => (
          <option key={option._id} value={option._id}>
            {option.no}
          </option>
        ))}
      </select>
      <button type='submit'>search</button>
    </form>
  );
}
