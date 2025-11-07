import { Badge } from "@/components/ui/badge";
import clsx from "clsx";
import { Nationality } from "@/lib/utils";

export function ArrestWarrant({
  index,
  issuingCountryId,
  charge,
}: {
  index?: number;
  issuingCountryId?: string;
  charge?: string;
}) {
  return (
    <div key={index ?? 0} className={clsx("space-y-3", { "mt-6": index! > 0 })}>
      <Badge variant="destructive">
        {`Issuing City: ${
          issuingCountryId ? Nationality({ code: issuingCountryId }) : "N/A"
        }`}
      </Badge>
      <div>
        <label className="text-sm font-medium text-muted-foreground">
          Charges
        </label>
        <p className="text-sm leading-relaxed mt-1 p-3 bg-muted rounded-lg">
          {charge ?? "N/A"}
        </p>
      </div>
    </div>
  );
}
