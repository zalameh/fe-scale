import Form from "@/components/forms/PPIC";
import CSVForm from "@/components/forms/PPICcsv";

export default function Page() {
  return (
    <>
      <header className='flex justify-between py-4 px-6 bg-slate-900 text-white'>
        <div className='text-4xl'>PPIC</div>

        {/* <RemoveDocs /> */}
      </header>

      <main className='h-screen'>
        <div className='container flex flex-col gap-20 mx-auto pt-16 bg-slate-100 h-full'>
          <Form />

          <hr style={{ borderWidth: "2px" }} />

          <div className='flex flex-col gap-10 w-4/5 md:w-2/3 mx-auto'>
            <div className='text-xl text-center'>Input CSV File</div>

            <CSVForm />
          </div>
        </div>
      </main>
    </>
  );
}
