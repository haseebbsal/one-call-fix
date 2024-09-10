'use client'
import { Link } from "@nextui-org/link";

import { PROFILE_TASKS } from "@/_utils/constant";

export default function ProfileCompletion({data}:{data:any}) {
  console.log('completion',data)
  console.log('docs',Object.keys(data.profile.documents.required))
  return (
    <>
      <div className="flex items-baseline text-gray-900 dark:text-white mb-2">
        <span className="text-5xl font-extrabold tracking-tight text-color-17">
          {data.profileCompletion}%
        </span>
      </div>
      <h5 className="mb-4 text-md font-normal text-color-18">COMPLETE</h5>
      <div className="border-b border-color-19">
        <p className="text-xs text-color-4 font-semibold mb-5">
          You will not be able to request refunds on jobs until your profile is
          at least 75% complete.
        </p>
      </div>
      <ul className="space-y-5 my-7">
        {Object.keys(data.profile.documents.required).filter((e)=>e!='_id').map((task, index) => data.profile.documents.required[task]?<li
            key={index}
            className={`flex ${data.profile.documents.required[task] ? "line-through decoration-color-4" : ""}`}
          >
            <p
              // href="#"
              // href="/tradeperson/vetting/required"
              className={`${data.profile.documents.required[task] ? "text-base font-normal leading-tight text-color-4" : "text-base font-normal leading-tight"}`}
            >
              {task}
            </p>
          </li>:(

          <li
            key={index}
            className={`flex ${data.profile.documents.required[task] ? "line-through decoration-color-4" : ""}`}
          >
            <Link
              // href="#"
              href="/tradeperson/vetting/required-documents"
              className={`${data.profile.documents.required[task] ? "text-base font-normal leading-tight text-color-4" : "text-base font-normal leading-tight"}`}
            >
              {task}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
