import { ConsultantServices } from "@/services/consultant.services";

import { EditConsultant } from "./comp.edit-consultant";

interface Props {
  params: {
    consultantId: string;
  };
}

export default async function Page({ params }: Props) {
  const { consultantId } = params;

  const consultant = await ConsultantServices.findConsultant(consultantId);

  return (
    <main className="flex h-screen items-center justify-center">
      <EditConsultant
        id={consultant?.id}
        name={consultant?.name}
        expertise={consultant?.expertise}
        description={consultant?.description}
        image={consultant?.image}
      />
    </main>
  );
}
