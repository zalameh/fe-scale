export async function getServerSideProps(context) {
  const { query } = context;
  const { product, material, sap } = query;

  // const data = await fetch("http://localhost:1881/")

  return {
    props: {
      sap,
      product,
      material,
    }, // will be passed to the page component as props
  };
}

function Page({ sap, product, material }) {
  return (
    <>
      <div>sap: {sap}</div>
      <div>product: {product}</div>
      <div>material: {material}</div>
    </>
  );
}

export default Page;
