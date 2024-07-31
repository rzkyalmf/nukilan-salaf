import { FormContent } from "@/components/formContent";
import { Footer } from "@/components/shared/footer";
import { Header } from "@/components/shared/header";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto flex items-center justify-center">
        <FormContent />
      </main>
      <Footer />
    </div>
  );
}
