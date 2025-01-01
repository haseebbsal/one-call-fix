'use client'
import { Link } from "@nextui-org/link";


enum Verified {
  identification = 'isIdVerified',
  gasSafeId = 'isGasSafeVerified',
  partPQualification = "isPartPQualified",
  eicrDocumentation = "isEicrDocumentationVerified",
  wiringRegulationsCertificate = "isWiringRegulationsCertified"
}


function CheckVerified(check:any,task:String,index:number) {
  return check ? <li
    key={index}
    className={`flex  line-through decoration-color-4`}
  >
    <p
      className={` text-base font-normal leading-tight text-color-4`}
    >
      {VerifiedNames[task as 'identification']}
    </p>
  </li> : (

    <li
      key={index}
      className={`flex `}
    >
      <Link
        href="/tradeperson/vetting/required-documents"
        className={`text-base font-normal leading-tight"`}
      >
        {VerifiedNames[task as 'identification']}
      </Link>
    </li>
  )
}

enum VerifiedNames {
  identification = 'Identification',
  gasSafeId = 'Gas safe ID',
  partPQualification = "Part P Qualification",
  eicrDocumentation = "EICR Documentation",
  wiringRegulationsCertificate = "Wiring Regulations Certificate"
}

// partPQualification
// wiringRegulationsCertificate
// eicrDocumentation

export default function ProfileCompletion({ data }: { data: any }) {
  console.log('completion', data)
  // console.log('docs',Object.keys(data.profile.documents.required))
  return (
    <>
      <div className="flex items-baseline text-gray-900 dark:text-white mb-2">
        <span className="text-5xl font-extrabold tracking-tight text-color-17">
          {data?.profileCompletion}%
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
        {data && Object.keys(data?.profile.documents.required).filter((e) => e != '_id').map((task, index) => {
          if (task == 'gasSafeId') {
            if (data.profile.gasSafeRegistered) {
              return CheckVerified(data?.profile[Verified[task as 'identification']],task,index)
            }
          }
          else{
            return CheckVerified(data?.profile[Verified[task as 'identification']],task,index)
          }
        })}
        {
          data?.profile.servicesOffered.length > 0 ? <li
            className={`flex line-through decoration-color-4`}
          >
            <p
              className={`  "text-base font-normal leading-tight text-color-4`}
            >
              Services Offered
            </p>
          </li> :
            <li
              className={`flex `}
            >
              <Link
                href={`/tradeperson/profile/edit?id=${data?.user._id}`}
                className={`text-base font-normal leading-tight text-color-4`}
              >
                Services Offered
              </Link>
            </li>
        }
        {
          !data?.user.profilePicture.includes('placeholder') ? <li
            className={`flex line-through decoration-color-4`}
          >
            <p
              className={`  "text-base font-normal leading-tight text-color-4`}
            >
              Upload Profile Photo
            </p>
          </li> :
            <li
              className={`flex `}
            >
              <Link
                href={`/tradeperson/profile/edit?id=${data?.user._id}`}
                className={`text-base font-normal leading-tight text-color-4`}
              >
                Upload Profile Photo
              </Link>
            </li>
        }
        {
          data?.profile.previousJobs.length > 0 ? <li
            className={`flex line-through decoration-color-4`}
          >
            <p
              className={`  "text-base font-normal leading-tight text-color-4`}
            >
              Upload Previous Jobs
            </p>
          </li> :
            <li
              className={`flex `}
            >
              <Link
                href={`/tradeperson/profile/edit?id=${data?.user._id}`}
                className={`text-base font-normal leading-tight text-color-4`}
              >
                Upload Previous Jobs

              </Link>
            </li>
        }
        {
          data?.profile.address ? <li
            className={`flex line-through decoration-color-4`}
          >
            <p
              className={`  "text-base font-normal leading-tight text-color-4`}
            >
              Upload Business Address
            </p>
          </li> :
            <li
              className={`flex `}
            >
              <Link
                href="/tradeperson/account-details"
                className={`  "text-base font-normal leading-tight text-color-4`}
              >
                Upload Business Address
              </Link>
            </li>

        }
        {
          data?.profile.companyName ? <li
            className={`flex line-through decoration-color-4`}
          >
            <p
              className={`  "text-base font-normal leading-tight text-color-4`}
            >
              Upload Company Name
            </p>
          </li> :
            <li
              className={`flex `}
            >
              <Link
                href="/tradeperson/account-details"
                className={`  "text-base font-normal leading-tight text-color-4`}
              >
                Upload Company Name
              </Link>
            </li>

        }
      </ul>
    </>
  );
}
