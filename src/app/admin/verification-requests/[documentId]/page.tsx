"use client";

import { Image } from "@nextui-org/image";
import { useDisclosure } from "@nextui-org/modal";
import React, { useState } from "react";

import BaseButton from "@/components/common/button/base-button";
import BaseModal from "@/components/common/modal/base-modal";
import LayoutWrapper from "@/components/modules/dashboard/layout-wrapper";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axiosInstance from "@/_utils/helpers/axiosInstance";
import { TRADES } from "@/_utils/enums";
import { config } from "@/_utils/helpers/config";
import { FieldValues, useForm } from "react-hook-form";
import BaseTextArea from "@/components/common/form/base-textarea";

// {
//   "verifyId": false, done
//   "verifyGasSafe": false, done
//   "verifyPublicLiabilityInsurance": false, there
//   "verifyProfessionalIndemnityInsurance": false, not there
//   "verifyTrustMark": false, there
//   "verifyWaterSafe": false, not there
//   "verifyNVQQualified": false, there done
//   "verifyEALQualified": false there
// }


enum ElectricianVerified {
  'Identification' = 'isIdVerified',
  "Part P Qualification" = "isPartPQualified",
  "EICR Documentation" = "isEicrDocumentationVerified",
  "Wiring Regulations Certificate" = "isWiringRegulationsCertified"
}

// enum NonGasPluberVerified {
//   'Identification' = 'isIdVerified',
// }

// enum GasPlumberVerified {
//   'Identification' = 'isIdVerified',
//   'Gas safe ID' = 'isGasSafeVerified',
// }


// const data={
//   "verifyId": false, done
//   "verifyGasSafe": false, done
//   "verifyPublicLiabilityInsurance": false, there done
//   "verifyProfessionalIndemnityInsurance": false,
//   "verifyTrustMark": false, there done
//   "verifyWaterSafe": false,
//   "verifyNVQQualified": false, there done
//   "verifyEALQualified": false there done
// }


export default function VerificationDocument(datas: any) {
  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpen1, onOpenChange: onOpenChange1, onOpen: onOpen1, onClose: onClose1 } = useDisclosure();
  const { isOpen: isOpen2, onOpenChange: onOpenChange2, onOpen: onOpen2, onClose: onClose2 } = useDisclosure();
  const [verifyState,setVerifyState]=useState<any>()

  const {handleSubmit,control}=useForm()


  const queryClient = useQueryClient()
  const verifyMutation = useMutation((data: any) => axiosInstance.put(`/trades-person/verify?userId=${datas.params.documentId}`, data), {
    onSuccess(data, variables, context) {
      onOpen()
      queryClient.invalidateQueries('individualAdminTrade')
    },
  })

  const verifyMutation1 = useMutation((data: any) => axiosInstance.put(`/trades-person/verify?userId=${datas.params.documentId}`, data), {
    onSuccess(data, variables, context) {
      onClose2()
      queryClient.invalidateQueries('individualAdminTrade')
    },
  })

  function rejectSubmit(e:FieldValues){
    const data={
      ...e,
      ...verifyState
    }
    verifyMutation1.mutate(data)
    console.log('valuesfgegdgg',data)
  }
  const getUserQuery = useQuery(['individualAdminTrade', datas.params.documentId], ({ queryKey }) => axiosInstance.get(`/user/?userId=${queryKey[1]}`))

  return (
    <>
      <BaseModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="md"
        header="System Generated Request"
        modalHeaderImage="/images/modal-success.png"
      >
        <div className="flex flex-col items-center mb-7">
          <h5 className="text-color-20 text-sm lg:text-base pb-4">
            Verification has been accepted.
          </h5>
          <BaseButton
            type="button"
            onClick={() => onClose()}
            extraClass="bg-color-9 !max-w-[350px] w-full text-white"
          >
            Okay
          </BaseButton>
        </div>
      </BaseModal>

      <BaseModal
        isOpen={isOpen1}
        onOpenChange={onOpenChange1}
        size="md"
        header="System Generated Request"
        modalHeaderImage="/images/modal-success.png"
      >
        <div className="flex flex-col items-center mb-7">
          <h5 className="text-color-20 text-sm lg:text-base pb-4">
            Verification has been rejected.
          </h5>
          <BaseButton
            type="button"
            onClick={() => onClose1()}
            extraClass="bg-color-9 !max-w-[350px] w-full text-white"
          >
            Okay
          </BaseButton>
        </div>
      </BaseModal>

      <BaseModal
        isOpen={isOpen2}
        onOpenChange={onOpenChange2}
        size="md"
        header="System Generated Request"
        modalHeaderImage="/images/modal-success.png"
      >
        <form onSubmit={handleSubmit(rejectSubmit)} className="flex flex-col gap-4 items-center mb-7">
          <h5 className="text-color-20 text-sm lg:text-base pb-4">
            Reject Document
          </h5>
          <BaseTextArea label="Description" placeholder="Enter Description"  name="description" control={control} rules={{required:"Enter Description"}}/>
          <BaseButton
            type="submit"
            // onClick={() => onClose2()}
            isLoading={verifyMutation.isLoading}
            disabled={verifyMutation.isLoading}
            extraClass="bg-color-9 !max-w-[350px] w-full text-white"
          >
            Reject Document
          </BaseButton>
        </form>
      </BaseModal>
      <LayoutWrapper
        sectionOneTitle="Verifications Requests"
        sectionOneChildren={
          <div>
            {!getUserQuery.isLoading && <>
              <h2 className="text-lg font-medium mb-6 text-color-17">
                Verification Details
              </h2>
              <div className="flex flex-col gap-5">
                <h3 className=" text-lg font-semibold ">
                  Applied For {TRADES[getUserQuery.data?.data.data.profile.trade]}
                </h3>
                {getUserQuery.data?.data.data.profile.documents.required.identification && !getUserQuery.data?.data.data.profile.isIdVerified && <div className="mb-8">
                  <h5 className="text-color-20 text-base font-medium pb-2">
                    ID (Passport, Driving License)
                  </h5>
                  {/* <p className="text-color-13 text-xl">PHRT92793048028203K9</p> */}
                  <a href={`${config.mediaURL}/${getUserQuery.data?.data.data.profile.documents.required.identification}`} target="_blank">
                    <Image
                      src="/images/certificate.png"
                      alt="Qualification"
                      width={144}
                      height={144}
                      className="object-contain"
                    />
                  </a>
                  <div className="flex sm:items-center gap-2.5 flex-col lg:flex-row mt-10">
                    <BaseButton
                      type="button"
                      onClick={() => verifyMutation.mutate({
                        "verifyId": 1
                      })}
                      extraClass="max-w-[190px] bg-color-9 "
                    >
                      Accept
                    </BaseButton>
                    <BaseButton
                      type="button"
                      onClick={() => {
                        setVerifyState({
                          "verifyId": 2
                        })
                        onOpen2()
                      }}
                      extraClass="max-w-[190px] text-color-9 border bg-transparent border-color-9 "
                    >
                      Reject
                    </BaseButton>
                  </div>
                </div>}
                {getUserQuery.data?.data.data.profile.documents.required.gasSafeId && !getUserQuery.data?.data.data.profile.isGasSafeVerified && TRADES[getUserQuery.data?.data.data.profile.trade] == 'PLUMBER' && <div className="mb-8">
                  <h5 className="text-color-20 text-base font-medium pb-2">
                    Gas Safe ID
                  </h5>
                  <a href={`${config.mediaURL}/${getUserQuery.data?.data.data.profile.documents.required.gasSafeId}`} target="_blank">
                    <Image
                      src="/images/certificate.png"
                      alt="Qualification"
                      width={144}
                      height={144}
                      className="object-contain"
                    />
                  </a>
                  <div className="flex sm:items-center gap-2.5 flex-col lg:flex-row mt-10">
                    <BaseButton
                      type="button"
                      onClick={() => verifyMutation.mutate({
                        "verifyGasSafe": 1
                      })}
                      extraClass="max-w-[190px] bg-color-9 "
                    >
                      Accept
                    </BaseButton>
                    <BaseButton
                      type="button"
                      onClick={() => {
                        setVerifyState({
                          "verifyGasSafe": 2
                        })
                        onOpen2()
                      }}
                      extraClass="max-w-[190px] text-color-9 border bg-transparent border-color-9 "
                    >
                      Reject
                    </BaseButton>

                  </div>
                </div>}
                {getUserQuery.data?.data.data.profile.documents.required.partPQualification && !getUserQuery.data?.data.data.profile.isPartPQualified && <div className="mb-8">
                  <h5 className="text-color-20 text-base font-medium pb-2">
                    Part P Qualification
                  </h5>
                  <a href={`${config.mediaURL}/${getUserQuery.data?.data.data.profile.documents.required.partPQualification}`} target="_blank">
                    <Image
                      src="/images/certificate.png"
                      alt="Qualification"
                      width={144}
                      height={144}
                      className="object-contain"
                    />
                  </a>
                  <div className="flex sm:items-center gap-2.5 flex-col lg:flex-row mt-10">
                    <BaseButton
                      type="button"
                      onClick={() => verifyMutation.mutate({
                        "verifyPartPQualification": 1
                      })}
                      extraClass="max-w-[190px] bg-color-9 "
                    >
                      Accept
                    </BaseButton>
                    <BaseButton
                      type="button"
                      onClick={() => {
                        setVerifyState({
                          "verifyPartPQualification": 2
                        })
                        onOpen2()
                      }}
                      extraClass="max-w-[190px] text-color-9 border bg-transparent border-color-9 "
                    >
                      Reject
                    </BaseButton>
                  </div>
                </div>}
                {getUserQuery.data?.data.data.profile.documents.required.wiringRegulationsCertificate && !getUserQuery.data?.data.data.profile.IsWiringRegulationsCertified && <div className="mb-8">
                  <h5 className="text-color-20 text-base font-medium pb-2">
                    17th or 18th Edition Wiring Regulations (BS 7671) Certificate
                  </h5>
                  <a href={`${config.mediaURL}/${getUserQuery.data?.data.data.profile.documents.required.wiringRegulationsCertificate}`} target="_blank">
                    <Image
                      src="/images/certificate.png"
                      alt="Qualification"
                      width={144}
                      height={144}
                      className="object-contain"
                    />
                  </a>
                  <div className="flex sm:items-center gap-2.5 flex-col lg:flex-row mt-10">
                    <BaseButton
                      type="button"
                      onClick={() => verifyMutation.mutate({
                        "verifyWiringRegulationsCertificate":1
                      })}
                      extraClass="max-w-[190px] bg-color-9 "
                    >
                      Accept
                    </BaseButton>
                    <BaseButton
                      type="button"
                      onClick={() => {
                        setVerifyState({
                          "verifyWiringRegulationsCertificate": 2
                        })
                        onOpen2()
                      }}
                      extraClass="max-w-[190px] text-color-9 border bg-transparent border-color-9 "
                    >
                      Reject
                    </BaseButton>
                  </div>
                </div>}
                {getUserQuery.data?.data.data.profile.documents.required.eicrDocumentation && !getUserQuery.data?.data.data.profile.isEicrDocumentationVerified && <div>
                  <h5 className="text-color-20 text-base font-medium pb-2">
                    EICR Documentation (e.g: city , guilts 2391-52)
                  </h5>
                  <a href={`${config.mediaURL}/${getUserQuery.data?.data.data.profile.documents.required.eicrDocumentation}`} target="_blank">
                    <Image
                      src="/images/certificate.png"
                      alt="Qualification"
                      width={144}
                      height={144}
                      className="object-contain"
                    />
                  </a>
                  <div className="flex items-center gap-2.5 flex-col lg:flex-row mt-10">
                    <BaseButton
                      type="button"
                      onClick={() => verifyMutation.mutate({
                        "verifyEicrDocumentation": 1
                      })}
                      extraClass="max-w-[190px] bg-color-9 "
                    >
                      Accept
                    </BaseButton>
                    <BaseButton
                      type="button"
                      onClick={() => {
                        setVerifyState({
                          "verifyEicrDocumentation": 2
                        })
                        onOpen2()
                      }}
                      extraClass="max-w-[190px] text-color-9 border bg-transparent border-color-9 "
                    >
                      Reject
                    </BaseButton>
                  </div>
                </div>}





                {getUserQuery.data?.data.data.profile.documents.additional.cityGuildQualification && <div>
                  <h5 className="text-color-20 text-base font-medium pb-2">
                    City Guild Qualification
                  </h5>
                  <a href={`${config.mediaURL}/${getUserQuery.data?.data.data.profile.documents.additional.cityGuildQualification}`} target="_blank">
                    <Image
                      src="/images/certificate.png"
                      alt="Qualification"
                      width={144}
                      height={144}
                      className="object-contain"
                    />
                  </a>
                </div>}
                {getUserQuery.data?.data.data.profile.documents.additional.diploma && <div>
                  <h5 className="text-color-20 text-base font-medium pb-2">
                    Diploma
                  </h5>
                  <a href={`${config.mediaURL}/${getUserQuery.data?.data.data.profile.documents.additional.diploma}`} target="_blank">
                    <Image
                      src="/images/certificate.png"
                      alt="Qualification"
                      width={144}
                      height={144}
                      className="object-contain"
                    />
                  </a>
                </div>}
                {getUserQuery.data?.data.data.profile.documents.additional.trustMark && <div>
                  <h5 className="text-color-20 text-base font-medium pb-2">
                    TrustMark
                  </h5>
                  <a href={`${config.mediaURL}/${getUserQuery.data?.data.data.profile.documents.additional.trustMark}`} target="_blank">
                    <Image
                      src="/images/certificate.png"
                      alt="Qualification"
                      width={144}
                      height={144}
                      className="object-contain"
                    />
                  </a>

                </div>}
                {getUserQuery.data?.data.data.profile.documents.additional.publicLiabilityInsurance && <div>
                  <h5 className="text-color-20 text-base font-medium pb-2">
                    Public Liability Insurance
                  </h5>
                  <a href={`${config.mediaURL}/${getUserQuery.data?.data.data.profile.documents.additional.publicLiabilityInsurance}`} target="_blank">
                    <Image
                      src="/images/certificate.png"
                      alt="Qualification"
                      width={144}
                      height={144}
                      className="object-contain"
                    />
                  </a>

                </div>}
                {getUserQuery.data?.data.data.profile.documents.additional.ealQualification && <div>
                  <h5 className="text-color-20 text-base font-medium pb-2">
                    Eal Qualification
                  </h5>
                  <a href={`${config.mediaURL}/${getUserQuery.data?.data.data.profile.documents.additional.ealQualification}`} target="_blank">
                    <Image
                      src="/images/certificate.png"
                      alt="Qualification"
                      width={144}
                      height={144}
                      className="object-contain"
                    />
                  </a>

                </div>}
                {getUserQuery.data?.data.data.profile.documents.additional.nvqQualification && <div>
                  <h5 className="text-color-20 text-base font-medium pb-2">
                    Nvq Qualification
                  </h5>
                  <a href={`${config.mediaURL}/${getUserQuery.data?.data.data.profile.documents.additional.nvqQualification}`} target="_blank">
                    <Image
                      src="/images/certificate.png"
                      alt="Qualification"
                      width={144}
                      height={144}
                      className="object-contain"
                    />
                  </a>

                </div>}
                {getUserQuery.data?.data.data.profile.documents.additional.competentPersonRegister && <div>
                  <h5 className="text-color-20 text-base font-medium pb-2">
                    Competent Person Register
                  </h5>
                  <a href={`${config.mediaURL}/${getUserQuery.data?.data.data.profile.documents.additional.competentPersonRegister}`} target="_blank">
                    <Image
                      src="/images/certificate.png"
                      alt="Qualification"
                      width={144}
                      height={144}
                      className="object-contain"
                    />
                  </a>

                </div>}
                {getUserQuery.data?.data.data.profile.documents.additional.wras && <div>
                  <h5 className="text-color-20 text-base font-medium pb-2">
                    Competent Person Register
                  </h5>
                  <a href={`${config.mediaURL}/${getUserQuery.data?.data.data.profile.documents.additional.wras}`} target="_blank">
                    <Image
                      src="/images/certificate.png"
                      alt="Qualification"
                      width={144}
                      height={144}
                      className="object-contain"
                    />
                  </a>

                </div>}
                {getUserQuery.data?.data.data.profile.documents.additional.professionalIndemnityInsurance && <div>
                  <h5 className="text-color-20 text-base font-medium pb-2">
                    Competent Person Register
                  </h5>
                  <a href={`${config.mediaURL}/${getUserQuery.data?.data.data.profile.documents.additional.professionalIndemnityInsurance}`} target="_blank">
                    <Image
                      src="/images/certificate.png"
                      alt="Qualification"
                      width={144}
                      height={144}
                      className="object-contain"
                    />
                  </a>

                </div>}

              </div>
            </>}
          </div>
        }
      />
    </>
  );
}
