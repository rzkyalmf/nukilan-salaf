import { FormContent } from "@/components/formContent";
import { Footer } from "@/components/shared/footer";
import { Header } from "@/components/shared/header";

export default function Home() {
  return (
    <main className="font-">
      <Header />

      <FormContent />

      <Footer />
    </main>
  );
}
