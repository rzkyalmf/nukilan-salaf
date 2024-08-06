import { Quotes } from "@prisma/client";
import React from "react";

import { HeadlesUI } from "@/components/headlesui";
import prisma from "@/utils/prisma";

export default async function Page() {
  const allQuotes = await prisma.quotes.findMany();

  return (
    <div className="mx-auto flex h-[700px] w-[560px] items-center rounded-xl border text-center">
      {allQuotes.map((quote: Quotes) => {
        return (
          <div key={quote.id} className="">
            <div>{quote.title} </div>
            <div>{quote.author}</div>
            <div>{quote.content}</div>
            <div>{quote.source}</div>
          </div>
        );
      })}
      <div>
        <HeadlesUI />
      </div>
    </div>
  );
}
