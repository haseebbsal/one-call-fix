import React from "react";

interface PolicyDescription {
  title?: string;
  desc?: string[];
  type?:string,
  items?:any
}

interface PoliciesSectionProps {
  policies: PolicyDescription[];
}

export default function   PoliciesSection({ policies }: PoliciesSectionProps) {
  return (
    <div className="mx-auto mb-16 py-16 w-3/4 px-8 sm:w-2/3 sm:px-12 md:px-16 lg:px-20 xl:px-0 border border-solid border-color-8 rounded-md">
      <div className="mx-auto max-w-[48rem]">
        {policies.map((policy, index) => {
          if(policy.type=="bullet"){
            return policy.items.map((e:any)=>
              <React.Fragment key={index}>
            <li className=""><span><span className="font-bold">{e.bold}</span>  {e.content}</span></li>
            </React.Fragment>
            )
      
            
          }
          return (
            <React.Fragment key={index}>
            <h2 className="text-lg font-extrabold mb-4 mt-5">{policy.title}</h2>
            {policy.desc?.map((paragraph, i) => (
              <p key={i} className="mb-5 text-color-6">
                {paragraph}
              </p>
            ))}
          </React.Fragment>
          )
        }
        )}

        <div className="flex flex-col mt-4 gap-0">
          <p className="font-bold">Feedback Mechanism</p>
          <p>We value your feedback. If you have any suggestions or concerns about our refund process, please contact our support team</p>
        </div>
        <p className="mt-4">By clearly understanding and following these guidelines, tradespeople can ensure a fair and transparent process for handling refund requests on OneCallFix</p>
      </div>
    </div>
  );
}
