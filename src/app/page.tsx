import { Footer } from "@/components/shared/footer";
import { Header } from "@/components/shared/header";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto flex max-w-7xl flex-grow items-center justify-start">
        <div>Hellow Jannah Galak!</div>
      </main>
      <Footer />
    </div>
  );
}
