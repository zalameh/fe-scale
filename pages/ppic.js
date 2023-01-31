import PPICForm from "@/components/forms/PPIC";

export default function Page() {
  return (
    <>
      <header className='text-slate-700 text-sm md:text-base'>
        <div className='flex flex-row-reverse py-4 px-6'>
          <button className='hover:text-slate-500 active:text-slate-400'>sign out</button>
        </div>
      </header>

      <main>
        <div className='px-4 py-10 md:py-16 md:w-[768px] md:mx-auto'>
          <h1 className='text-2xl md:text-4xl mb-8 md:mb-12'>PPIC Form</h1>

          <PPICForm />
        </div>
      </main>
    </>
  );
}
