// import { useForm } from "react-hook-form";
import Form from "@/components/forms/Operator";

export default function Page() {
  return (
    <>
      <header className='flex justify-between py-4 px-6 bg-slate-900 text-white'>
        <div className='text-4xl'>Operator</div>
      </header>

      <main className=''>
        <div className='container flex w-full mx-auto pt-16 px-8 bg-slate-100'>
          <Form />
        </div>
      </main>
    </>
  );
}
