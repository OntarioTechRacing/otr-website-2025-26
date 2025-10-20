import Image from "next/image";

export default function Home() {
  return (
    //remove h-[200vh] after adding body, used to test header hiding
    <div className="bg-color-background font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 h-[200vh]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">

      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        
      </footer>
    </div>
  );
}
