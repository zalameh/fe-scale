import Form from "@/components/forms/PPIC";

export default function Page() {
  return (
    <>
      <header className='flex justify-between py-4 px-6 bg-slate-900 text-white'>
        <div className='text-4xl'>PPIC</div>

        {/* <RemoveDocs /> */}
      </header>

      <main className='h-screen'>
        <div className='container mx-auto pt-16 bg-slate-100 h-full'>
          <Form />
        </div>
      </main>
    </>
  );
}
