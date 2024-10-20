'use client'
import { HomeOwnerJobTypes, JobTimelineType, TRADES, TradesPersonProfile } from "@/_utils/enums";
import { config } from "@/_utils/helpers/config";
import BaseButton from "@/components/common/button/base-button";
import Image from "next/image";
import { MdOutlineStarBorder } from "react-icons/md";
import { AiFillFilePpt } from "react-icons/ai";
import { Tab, Tabs } from "@nextui-org/tabs";
import { Key, useState } from "react";
import Loader from "@/components/common/Loader";
import ReactStars from 'react-stars'
import { useMutation, useQuery } from "react-query";
import axiosInstance from "@/_utils/helpers/axiosInstance";
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/modal";
import toast from "react-hot-toast";

export default function Tradeperson(datas:any){
    const [type,setType]=useState(HomeOwnerJobTypes.CURRENT)
    const [offer,setOffer]=useState<any>()
    const {isOpen: isOpen1, onOpen: onOpen1, onOpenChange: onOpenChange1, onClose: onClose1} = useDisclosure();
    const shortlistMutation=useMutation((data:string)=>axiosInstance.put(`/bid/assign?bidId=${data}`),{
        onSuccess(data, variables, context) {
            console.log('shortlist',data.data)
        },
        onError(error:any) {
            if (Array.isArray(error.response.data.message)) {
                toast.error(error.response.data.message[0]);
            } else {
                toast.error(error.response.data.message);
            }
        },
    })
    const getTradePersonAvailabilityQuery=useQuery(['tradepersonAvailability',datas.searchParams.id],({queryKey})=>axiosInstance.get(`/availability?userId=${queryKey[1]}`))
    const getTradePersonReviewsQuery=useQuery(['tradepersonReviews',datas.searchParams.id],({queryKey})=>axiosInstance.get(`/review/all?page=1&limit=10&tradesPerson=${queryKey[1]}`))
    const getTradePersonQuery=useQuery(['tradeperson',datas.searchParams.id],({queryKey})=>axiosInstance.get(`/user/?userId=${queryKey[1]}`))
    const bidsQuery=useQuery(['bids',datas.searchParams.jobId],({queryKey})=>axiosInstance.get(`/bid/all?page=1&limit=10&jobId=${queryKey[1]}`),{
        onSuccess(data) {
            // const{user}=data.data.data
            const findOffer=data.data.data.find((e:any)=>{
                const {user}=e
                if(user._id==datas.searchParams.id){
                    return e
                }
            })
            setOffer(findOffer)
        },
    })
    console.log('offer',offer)
    return (
        <>
        <section className="mt-20 mb-16 px-24 flex flex-col gap-5">
            <div>
                <h5 className="capitalize text-lg lg:text-xl font-semibold text-color-17 pb-2">
                Tradepeople Profile
                </h5>
            </div>
            <div className="px-8 py-4 flex flex-col gap-4 border-2 border-gray-100 rounded-md">
                <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                        <div className="h-[8rem] w-[5rem]">
                        <Image
                            src={`${getTradePersonQuery.data?.data.data.user.profilePicture}`.includes('placeholder')?'/images/profile-review.png':`${config.mediaURL}/${getTradePersonQuery.data?.data.data.user.profilePicture}`}
                            // src="/images/profile-photo.png"
                            alt="profile-photo"
                            width={70}
                            height={70}
                            className="rounded-full w-full h-full object-contain"
                        />
                        </div>
                        <div className="flex flex-col gap-2">
                            <h3 className="text-md font-medium ">{getTradePersonQuery.data?.data.data.user.firstName} {getTradePersonQuery.data?.data.data.user.lastName}</h3>
                            <h2 className="rounded-full bg-[#3571EC38] w-max py-1 px-8 text-[14px] text-center font-medium">
                                {TRADES[getTradePersonQuery.data?.data.data.profile.trade]}
                            </h2>
                            <p className="flex gap-1"><span className="text-orange-400 flex gap-2 items-center"><MdOutlineStarBorder className="text-xl"/> {getTradePersonQuery.data?.data.data.review.average} / 5</span> ({getTradePersonQuery.data?.data.data.review.total} reviews)</p>
                            {getTradePersonQuery.data?.data.data && <div className="flex gap-4">
                                <BaseButton as="link"  extraClass="!bg-transparent !text-color-9 !border-color-9 border-2" link={getTradePersonQuery.data?.data.data.profile.externalReviews}>
                                External Reviews
                                </BaseButton>
                                <BaseButton as="link" extraClass="!bg-transparent !text-color-9 !border-color-9 border-2" link={getTradePersonQuery.data?.data.data.profile.website}>
                                Website
                                </BaseButton>
                            </div> }
                            
                        </div>
                    </div>
                    <div className="flex flex-col items-start justify-start gap-2">
                        <p className="font-semibold">Certificates</p>
                        <div></div>
                        <AiFillFilePpt onClick={()=>{onOpen1()}} className="text-8xl cursor-pointer text-red-600"/>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                <Tabs
            variant={"underlined"}
            aria-label="Tabs variants"
            fullWidth
            classNames={{
              tabList: "border-b border-b-[#D1D1D1] !pb-0 w-full pl-0",
              tab: `pb-[15px] w-fit text-lg pl-0`,
              tabContent:
                "group-data-[selected=true]:text-color-9 text-color-20",
              cursor:
                "bg-[#D1D1D1] group-data-[selected=true]:bg-color-9 h-[1px]",
            }}
            onSelectionChange={(key: Key) => {
              const index = key as unknown as number;
              // console.log('index',index)
              setType(index)
              // handleJobs(index);
            }}
          >
            <Tab key={TradesPersonProfile.PROFILE} title="Profile">
              {getTradePersonQuery.isLoading ? (
                <Loader />
              ) : (
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <p className="font-semibold text-lg">About</p>
                        <p className=" font-light text-sm">{getTradePersonQuery.data?.data.data.profile.about}</p>
                    </div>
                    {getTradePersonQuery.data?.data.data.profile.servicesOffered.length>0&& <div className="flex flex-col gap-2">
                        <p className="font-semibold text-lg">Services Offered</p>
                        <ul className="list-disc pl-4 flex flex-col gap-2">
                            {getTradePersonQuery.data?.data.data.profile.servicesOffered.map((e:string)=>
                            <li className="font-light text-sm">{e}</li>
                            )}


                        </ul>
                        {/* <p className=" font-light text-sm">Lorem ipsum dolor sit amet, cons tetuer Lorem ipsum dolor sit amet, cons tetuer Lorem ipsum dolor sit amet, cons tetuer Lorem ipsum dolor sit amet, cons. Lorem ipsum dolor sit amet, cons tetuer Lorem ipsum dolor sit amet, cons tetuer Lorem ipsum dolor sit amet, cons tetuer Lorem ipsum dolor sit amet, cons.</p> */}
                    </div>}
                    {getTradePersonQuery.data?.data.data.profile.previousJobs.length>0&& <div className="flex flex-col gap-2">
                        <p className="font-semibold text-lg">Work Gallery</p>
                        <div className="flex gap-2">
                            {getTradePersonQuery.data?.data.data.profile.previousJobs.map((e:any)=>
                            <div className="h-[8rem] w-[5rem]">
                            <Image
                                src={e.includes('placeholder')?'/images/profile-review.png':`${config.mediaURL}/${e}`}
                                // src="/images/profile-photo.png"
                                alt="profile-photo"
                                width={70}
                                height={70}
                                className="rounded-full w-full h-full object-contain"
                            />
                        </div>
                            )}
                            
                        </div>
                    </div>}
                    
                  {/* {jobsQuery.data?.data?.data.map((el: any) => (
                    <Link
                      href={`/homeowner/job/${el._id}`}
                      className="pb-6 border-b border-b-color-19"
                      key={el._id}
                    >
                      <JobCard job={el} />
                    </Link>
                  ))} */}
                </div>
              )}
              {/* {!jobsQuery.isLoading && jobsQuery.data?.data && !jobsQuery.data?.data.data?.length ? (
                <p className="text-lg font-bold text-center">
                  No Job Avaliable
                </p>
              ) : (
                ""
              )} */}
            </Tab>
            <Tab key={TradesPersonProfile.Reviews} title="Reviews">
              {getTradePersonReviewsQuery.isLoading ? (
                <Loader />
              ) : (
                <div className="flex flex-col gap-5">
                    {getTradePersonReviewsQuery.data?.data.data.map((e:any)=><div className="flex flex-col gap-2 px-4 py-2 pb-4 border-b-2 ">
                        <p className="font-semibold">Leaked Kitchen Sinks</p>
                        <ReactStars
                        value={e.rating}
                        edit={false}
                        count={5}
                        // onChange={ratingChanged},
                        size={24}
                        color2={'#ffd700'} />
                        <p className="font-light text-sm">{e.description}</p>
                        <div className="flex gap-2 items-center">
                            <div className="h-[2rem] w-[2rem]">
                                <Image
                                    src={e.user.profilePicture.includes('placeholder')?'/images/profile-review.png':`${config.mediaURL}/${e.user.profilePicture}`}
                                    // src="/images/profile-photo.png"
                                    alt="profile-photo"
                                    width={70}
                                    height={70}
                                    className="rounded-full w-full h-full object-contain"
                                />
                            </div>
                            <p className="font-semibold">{e.user.firstName} {e.user.lastName}</p>
                        </div>
                    </div>)}
                  {/* {jobsQuery.data?.data?.data.map((el: any) => (
                    <Link
                      href={`/homeowner/job/${el._id}`}
                      className="pb-6 border-b border-b-color-19"
                      key={el._id}
                    >
                      <JobCard job={el} />
                    </Link>
                  ))} */}
                </div>
              )}
              {/* {!jobsQuery.isLoading && jobsQuery.data?.data && !jobsQuery.data?.data.data?.length ? (
                <p className="text-lg font-bold text-center">
                  No Job Avaliable
                </p>
              ) : (
                ""
              )} */}
            </Tab>
            <Tab key={TradesPersonProfile.Offer} title="Offer">
              {!offer && !getTradePersonAvailabilityQuery.isLoading ? (
                <Loader />
              ) : (
                offer?
                <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-2">
                        <p className="font-semibold text-lg">Message</p>
                        <p className=" font-light text-sm">Lorem ipsum dolor sit amet, cons tetuer Lorem ipsum dolor sit amet, cons tetuer Lorem ipsum dolor sit amet, cons tetuer Lorem ipsum dolor sit amet, cons. Lorem ipsum dolor sit amet, cons tetuer Lorem ipsum dolor sit amet, cons tetuer Lorem ipsum dolor sit amet, cons tetuer Lorem ipsum dolor sit amet, cons.</p>
                    </div>
                    <div className="flex gap-2 w-1/2 flex-wrap items-start">
                        <div className="flex flex-col p-2 border-2 rounded-lg gap-2">
                            <p className="font-semibold">Price</p>
                            <p className="text-[#3571EC] font-semibold">$ {offer.quote}.00</p>
                        </div>
                        <div className="flex flex-col p-2 border-2 rounded-lg gap-2">
                            <p className="font-semibold">Vat Included?</p>
                            <p className="text-[#3571EC] font-semibold">{offer.vatIncluded?"Yes":"No"}</p>
                        </div>
                        <div className="flex flex-col p-2 border-2 rounded-lg gap-2">
                            <p className="font-semibold">Deposit Amount</p>
                            <p className="text-[#3571EC] font-semibold">$ {offer.depositAmount}.00</p>
                        </div>
                        
{/* // "availability": [
//             {
//                 "day": "Monday",
//                 "times": [
//                     {
//                         "start": "10:00",
//                         "end": "11:00",
//                         "_id": "66db6bf13301a1b65e182995"
//                     },
//                     {
//                         "start": "11:00",
//                         "end": "12:00",
//                         "_id": "66db6bf13301a1b65e182996"
//                     }
//                 ],
//                 "_id": "66db6bf13301a1b65e182994"
//             }, */}
                                <div className="flex flex-col p-2 border-2 rounded-lg gap-2">
                                    <p className="font-semibold">Estimated Timeline</p>
                                    <p className="text-[#3571EC] font-semibold">{offer.timeline.type==1?`${offer.timeline.value} days`:`${offer.timeline.value} hours`}</p>
                                </div>

{getTradePersonAvailabilityQuery.data?.data.data && <div className="flex flex-col p-2 border-2 rounded-lg gap-2">
                            <p className="font-semibold">Availability This Week</p>
                            {getTradePersonAvailabilityQuery.data?.data.data.availability.map((e:any)=>{
                                return e.times.map((j:any)=><p className="text-[#3571EC] font-semibold">{e.day} {`${parseInt(j.start.split(':')[0]) % 12 || 12}:${j.start.split(':')[1]}${parseInt(j.start.split(':')[0]) < 12 ? "AM" : "PM"} - 
                                ${parseInt(j.end.split(':')[0]) % 12 || 12}:${j.end.split(':')[1]}${parseInt(j.end.split(':')[0]) < 12 ? "AM" : "PM"}`}</p>)
                            })}
                        </div>}
                        
                    </div>
                  {/* {jobsQuery.data?.data?.data.map((el: any) => (
                    <Link
                      href={`/homeowner/job/${el._id}`}
                      className="pb-6 border-b border-b-color-19"
                      key={el._id}
                    >
                      <JobCard job={el} />
                    </Link>
                  ))} */}
                </div>:""
              )}
              {/* {!jobsQuery.isLoading && jobsQuery.data?.data && !jobsQuery.data?.data.data?.length ? (
                <p className="text-lg font-bold text-center">
                  No Job Avaliable
                </p>
              ) : (
                ""
              )} */}
            </Tab>
                </Tabs>
                <BaseButton onClick={()=>{
                    shortlistMutation.mutate(offer._id)
                }}>
                    ShortList Tradeperson
                    </BaseButton>
                </div>
               
            </div>
        </section>
         <Modal
                size={"xl"}
                isOpen={isOpen1}
                backdrop="blur"
                onOpenChange={onOpenChange1}
                placement="center"
                onClose={() => {
                    // navigate.push('/admin/manage-hunts');
                }}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col text-xl gap-1">All Documents</ModalHeader>
                            <ModalBody className="flex flex-col gap-4 pb-8">
                                {getTradePersonQuery.data?.data.data.identification && <div className="flex gap-2 items-center">
                                    <p className="font-semibold">Identification</p>
                                    <BaseButton as="link" extraClass="!w-max !max-w-[100%]" link={`${config.mediaURL}/${getTradePersonQuery.data?.data.data.identification}`}>Download Document</BaseButton>
                                    </div>
                                }
                                {getTradePersonQuery.data?.data.data.partPQualification && <div className="flex gap-2 items-center">
                                <p className="font-semibold">PartP Qualification</p>
                                <BaseButton as="link" extraClass="!w-max !max-w-[100%]" link={`${config.mediaURL}/${getTradePersonQuery.data?.data.data.partPQualification}`}>Download Document</BaseButton>
                                </div>}
                                {getTradePersonQuery.data?.data.data.wiringRegulationsCertificate && <div className="flex gap-2 items-center">
                                <p className="font-semibold">Wiring Regulations</p>
                                <BaseButton as="link" extraClass="!w-max !max-w-[100%]" link={`${config.mediaURL}/${getTradePersonQuery.data?.data.data.wiringRegulationsCertificate}`}>Download Document</BaseButton>
                                </div>}
                                {getTradePersonQuery.data?.data.data.eicrDocumentation && <div className="flex gap-2 items-center">
                                <p className="font-semibold">Eicr Documentation</p>
                                <BaseButton as="link" extraClass="!w-max !max-w-[100%]" link={`${config.mediaURL}/${getTradePersonQuery.data?.data.data.eicrDocumentation}`}>Download Document</BaseButton>
                                </div>}
                                {/* competentPersonRegister: ""
nvqQualification: ""
ealQualification: ""
publicLiabilityInsurance: ""
trustMark */}
{getTradePersonQuery.data?.data.data.competentPersonRegister && <div className="flex gap-2 items-center">
                                <p className="font-semibold">Competent Person Register</p>
                                <BaseButton as="link" extraClass="!w-max !max-w-[100%]" link={`${config.mediaURL}/${getTradePersonQuery.data?.data.data.competentPersonRegister}`}>Download Document</BaseButton>
                                </div>}
                                {getTradePersonQuery.data?.data.data.nvqQualification && <div className="flex gap-2 items-center">
                                <p className="font-semibold">Nvq Qualification</p>
                                <BaseButton as="link" extraClass="!w-max !max-w-[100%]" link={`${config.mediaURL}/${getTradePersonQuery.data?.data.data.nvqQualification}`}>Download Document</BaseButton>
                                </div>}
                                {getTradePersonQuery.data?.data.data.ealQualification && <div className="flex gap-2 items-center">
                                <p className="font-semibold">Eal Qualification</p>
                                <BaseButton as="link" extraClass="!w-max !max-w-[100%]" link={`${config.mediaURL}/${getTradePersonQuery.data?.data.data.ealQualification}`}>Download Document</BaseButton>
                                </div>}
                                {getTradePersonQuery.data?.data.data.publicLiabilityInsurance && <div className="flex gap-2 items-center">
                                <p className="font-semibold">Public Liability Insurance</p>
                                <BaseButton as="link" extraClass="!w-max !max-w-[100%]" link={`${config.mediaURL}/${getTradePersonQuery.data?.data.data.publicLiabilityInsurance}`}>Download Document</BaseButton>
                                </div>}
                                {getTradePersonQuery.data?.data.data.trustMark && <div className="flex gap-2 items-center">
                                <p className="font-semibold">TrustMark</p>
                                <BaseButton as="link" extraClass="!w-max !max-w-[100%]" link={`${config.mediaURL}/${getTradePersonQuery.data?.data.data.trustMark}`}>Download Document</BaseButton>
                                </div>}

                                {/* <p className="text-sm text-gray-400">Riddles have been created successfully & QR Code is
                                    generated</p> */}
                                {/* <button className="px-16 w-max py-2 bg-[#A92223]  rounded text-white">Okay</button> */}
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
        
    )
}