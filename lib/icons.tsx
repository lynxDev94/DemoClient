import {
  Ambulance,
  Bone,
  Heart,
  Microscope,
  PawPrint,
  ScanLine,
  Scissors,
  Shield,
  Stethoscope,
  Syringe,
  Toothbrush,
  type LucideIcon,
} from "lucide-react";

const icons: Record<string, LucideIcon> = {
  Ambulance,
  Bone,
  Heart,
  Microscope,
  PawPrint,
  ScanLine,
  Scissors,
  Shield,
  Stethoscope,
  Syringe,
  Toothbrush,
};

export function ServiceIcon({ name, className }: { name: string; className?: string }) {
  const Icon = icons[name] ?? PawPrint;
  return <Icon className={className} aria-hidden="true" />;
}
