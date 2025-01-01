import { Image } from "@nextui-org/image";

interface CardProps {
  icon: string;
  title: string;
  value: string;
}

export default function DashboardCard({ icon, title, value }: CardProps) {
  return (
    <div className="flex items-center p-6 bg-color-16 rounded-3xl w-full sm:w-max sm:min-w-[20rem]  ">
      <div className="flex flex-shrink-0 items-center justify-center h-16 w-16 rounded">
        <Image src={icon} alt={title} />
      </div>
      <div className="flex-grow flex flex-col ml-4">
        <span className="text-color-14 text-sm sm:text-medium">{title}</span>
        {title!='Suspended Tradepeople' && <span className="font-bold text-medium sm:text-lg">{value}</span>}
        {/* {title=='Active Tradepeople' && <span className="font-light text-sm">have logged in within past 3 months</span>} */}
        {title=='Suspended Tradepeople' && <div className="flex gap-8">
          <div className="flex flex-col ">
          <span className="font-bold text-medium sm:text-lg">13</span>
          <span className="font-light text-sm">Temporarily</span>
          </div>
          <div className="flex flex-col ">
          <span className="font-bold text-medium sm:text-lg">4</span>
          <span className="font-light text-red-600 text-sm">Permanent</span>
          </div>
          </div>}
        
      </div>
    </div>
  );
}
