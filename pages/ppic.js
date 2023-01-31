import PPICForm from "@/components/forms/PPIC";

export default function Page() {
  return (
    <>
      <header className='text-slate-700'>
        <div className='flex p-2 md:p-4'>
          <button className='hover:text-slate-500'>sign out</button>
        </div>
      </header>

      <main>
        <div className='py-8 px-8 md:px-4 md:py-12 md:w-[768px] md:mx-auto'>
          <h1 className='text-2xl md:text-4xl mb-4 md:mb-8'>PPIC Form</h1>

          <PPICForm />
        </div>
      </main>
    </>
  );
}
