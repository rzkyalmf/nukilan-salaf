import { FormContent } from "@/components/formContent";
import { Footer } from "@/components/shared/footer";
import { Header } from "@/components/shared/header";

export default function Home() {
  return (
    <main className="">
      <Header />

      <FormContent />

      <Footer />
    </main>
  );
}

/* <div className="mx-auto flex h-[700px] w-[560px] items-center rounded-xl border text-center"></div>; */
