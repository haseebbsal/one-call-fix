import { COMPLAINTS_POLICY } from "@/_utils/constant";
import PoliciesSection from "@/components/modules/public/policies-section";
import PageTopSection from "@/components/modules/widgets/page-top-section";

const pageTopSection = {
  title: "COMPLAINTS POLICY",
  text: "Lorem ipsum dolor sit amet, cons tetuer Lorem ipsum dolor sit amet, cons tetuer",
};

const bullets=[
  {
    bold:"Complaint Submission:",
    item:"Contact us with as much information as possible about the trade."
  },
  {
    bold:"Investigation Process:",
    item:"We review all complaints and contact the trade to encourage a resolution."
  },
  {
    bold:"Dispute Resolution:",
    item:"We cannot directly intervene in disputes but will monitor and keep records of complaints."
  },
  {
    bold:"Evidence Requirement:",
    item:"We may request evidence of the work carried out to fully process your complaint."
  },
  {
    bold:"Outcome:",
    item:"Based on our investigation, we may warn or remove trades who do not meet standards."
  },
  {
    bold:"Feedback Management:",
    item:"You can decide to withdraw or update your feedback if a satisfactory resolution is reached."
  }
]


const secondBullets=[
  
  {
    bold:"Contact Trade:",
    item:"Attempt to resolve the issue directly with the trade."
  },
  {
    bold:"Notify OneCallFix:",
    item:"If unresolved, notify us, and we will contact the trade."
  },
  {
    bold:"Initial Response:",
    item:"If we cannot contact the trade within 5 working days or they do not respond to our emails or calls, we will suspend their account until they provide the requested information."
  },
  {
    bold:"Investigation:",
    item:"We gather evidence from both parties and review it within 5 working days, depending on the complexity of the case."
  }
]

export default function ComplaintsPolicy() {
  return (
    <main>
      <PageTopSection pageTopSection={pageTopSection} />
      {/* <PoliciesSection policies={COMPLAINTS_POLICY} /> */}
      <div className="mx-auto mb-16 py-16 w-3/4 px-8 sm:w-2/3 sm:px-12 md:px-16 lg:px-20 xl:px-0 border border-solid border-color-8 rounded-md">
      <div className="mx-auto flex flex-col gap-2 max-w-[48rem]">
        <p className="font-bold">OneCallFix Complaint Policy </p>
        <p>We regret that you are unhappy. If you have a complaint about a trade, please contact us with detailed information. We take all complaints seriously and will reach out to the trade to see how they intend to resolve the issue.</p>
        <ul className="flex flex-col gap-2">
          <p className="font-bold">Policy Highlights:</p> 
          {bullets.map((e,index)=><li key={index} className="list-disc"><span>{e.bold}</span> <span>{e.item}</span></li>)}
          

        </ul>
        <ul className="flex flex-col gap-2">
          <p className="font-bold">Complaint Procedure:</p> 
          {secondBullets.map((e,index)=><li key={index} className="list-decimal"><span className="font-bold">{e.bold}</span> <span>{e.item}</span></li>)}
          <li className="list-decimal">
            <div className="flex flex-col gap-2">
              <p className="font-bold">Actions Based on Findings:</p>
              <ul className="flex flex-col gap-2 pl-8">
                <li className="list-disc"><span className="font-bold">Upheld Complaints</span> <span> Trades may be suspended, or reported to authorities if there is consumer harm, significant property damage, or money taken without work completed.</span></li>
                <li className="list-disc"><span className="font-bold">Partially Upheld Complaints: </span> <span> Trades may be warned, suspended, or required to rectify the issue to maintain their membership.</span></li>
                <li className="list-disc"><span className="font-bold">Unfounded Complaints: </span> <span> No further action will be taken.</span></li>

              </ul>
            </div>
          </li>
          <li  className="list-decimal"><span className="font-bold">Monitoring:</span> <span>Complaints are recorded to monitor trade performance and ensure quality.</span></li>
          

        </ul>
        <p>We aim to respond to all complaints promptly and keep your comments confidential. Your feedback is important to us, and we use it to improve our service. If you have been let down by a tradesman, please let us know.</p>
      </div>
      </div>
    </main>
  );
}
