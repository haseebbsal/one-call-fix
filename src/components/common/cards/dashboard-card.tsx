import { Image } from "@nextui-org/image";

interface CardProps {
  icon: string;
  title: string;
  value: string;
}

export default function DashboardCard({ icon, title, value }: CardProps) {
  return (
    <div className="flex items-center p-6 bg-color-16 rounded-3xl w-48 sm:w-52 lg:w-80">
      <div className="flex flex-shrink-0 items-center justify-center h-16 w-16 rounded">
        <Image src={icon} alt={title} />
      </div>
      <div className="flex-grow flex flex-col ml-4">
        <span className="text-color-14 text-sm sm:text-medium">{title}</span>
        <span className="font-bold text-medium sm:text-lg">{value}</span>
      </div>
    </div>
  );
}
