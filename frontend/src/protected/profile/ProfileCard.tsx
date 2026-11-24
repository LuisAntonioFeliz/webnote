import { Avatar } from "@/components/shared/Avatar";
import { Card } from "@/components/shared/Card";
import type { ProfileValues } from "@/lib/types";

export interface ProfileCardProps {
  profile: ProfileValues;
}

export function ProfileCard({ profile }: ProfileCardProps) {
  const fullName = `${profile.nombres} ${profile.apellidos}`.trim();

  return (
    <Card padding="lg" className="flex flex-col items-center gap-4 text-center">
      <Avatar name={fullName} size="lg" />
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl">{fullName}</h2>
        <p className="text-sm text-graphite">{profile.email}</p>
        <p className="text-sm text-pencil-gray">{profile.telefono}</p>
      </div>
    </Card>
  );
}
