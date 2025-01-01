interface Props {
    title?: string;
    value: string;
    secondTitle:string
  }
  export default function NewBillingCard({ title, value ,secondTitle}: Props) {
    return (
      <div className="w-full px-5 flex flex-col justify-center py-6 min-h-[100px] rounded-3xl bg-no-repeat bg-cover bg-color-16">
        <h5 className="text-color-14 text-sm lg:text-base pb-3">{title}</h5>
        <h3 className="text-color-4 text-2xl lg:text-4xl font-semibold">
          ${value}
        </h3>
        <p className="font-light">{secondTitle}</p>
      </div>
    );
  }
  