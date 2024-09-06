"use client";

import { Image } from "@nextui-org/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { set, useForm, useWatch } from "react-hook-form";
import {RadioGroup, Radio} from "@nextui-org/react";
import {CheckboxGroup, Checkbox} from "@nextui-org/react";
import { TRADES } from "@/_utils/enums";
import {
  InitializeChatPayload,
  JobFormValues,
  QuestionAnswer,
  UpdateChatPayload,
} from "@/_utils/types";
import BaseButton from "@/components/common/button/base-button";
import BaseFileInput from "@/components/common/form/base-file-input";
import BaseInput from "@/components/common/form/base-input";
import BaseRadioGroup from "@/components/common/form/base-radio-group";
import BaseTextArea from "@/components/common/form/base-textarea";
import HomeOwnerSignUpForm from "@/components/modules/auth/homeowner-signup-form";
import PageTopSection from "@/components/modules/widgets/page-top-section";
import Cookies from "js-cookie";
// import {
//   initializeChat,
//   resetChat,
//   updateChat,
//   updateQuestions,
// } from "@/lib/features/chatSlice";
// import { createJob, resetJob } from "@/lib/features/jobSlice";
// import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import GooglePlacesInput from "@/components/common/form/google-places-input";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import axiosInstance from "@/_utils/helpers/axiosInstance";
import { data } from "framer-motion/client";

type Issue={
  trade:number,
  issue:string
}
const selectTopSection = {
  title: "SELECT YOUR TRADEPEOPLE",
  text: "Lorem ipsum dolor sit amet, cons tetuer Lorem ipsum dolor sit amet, cons tetuer",
};


enum STEPPER {
  SELECT_TRADES_PEOPLE,
  POST_JOB,
}

const options:any=[
  'First'
]

// mandatory questions to ask
const mandatoryQuestionsInitial: QuestionAnswer[] = [
  {
    question: "What is your estimated budget?",
    answerIndex: -1,
    name: "estimatedBudget",
    ownValue: true,
    _id: "1",
    options: [
      "Under £100",
      "Under £250",
      "Under £500",
      "Under £1000",
      "Under £2000",
      "Under £4000",
      "Under £8000",
      "Under £15000",
      "Under £30000",
      "Over £30000",
      "Not Sure",
    ],
  },
  {
    question: "When do you need this done by?",
    answerIndex: -1,
    name: "completion",
    ownValue: true,
    _id: "2",
    options: [
      "As Soon As Possible",
      "This Week",
      "Within Two Weeks",
      "Within This Month",
      "Within The Next Two Months",
      "Flexible",
    ],
  },
];

type ChatData={
  chatId:string,
  answerIndex:number
}
export default function PostAJob() {
  // const dispatch = useAppDispatch();
  // const [selected, setSelected] = useState("london");

  const headlineForm=useRef<any>()
  const [isLoggedin,setIsloggedIn]=useState(false)
  const [stepper, setStepper] = useState(STEPPER.SELECT_TRADES_PEOPLE);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [trade, setTrade] = useState<TRADES>(TRADES.ELECTRICIAN);
  const [isFormCompleted, setIsFormCompleted] = useState(false);
  const [mandatoryQuestionsCompleted,setMandatoryQuestionsCompleted]=useState(false)
  const [isJobFormCompleted, setIsJobFormCompleted] = useState(false);
  const [mandatoryQuestionsIndex, setMandatoryQuestionsIndex]=useState(0)
  const [mandatoryQuestions, setMandatoryQuestions] = useState(
    mandatoryQuestionsInitial,
  );
  const [mandatoryAnswers,setMandatoryAnswers]=useState({
    estimatedBudget:"",
    completion:""
  })
  const [currentQuestionValuee,setCurrentQuestionValue]=useState<any>(null)
  const [questions,setQuestions]=useState([])
  const [chatId,setChatId]=useState<string|null>(null)
  const {
    setValue,
    control,
    handleSubmit,
    watch,
    formState: { isValid },
    getValues
  } = useForm();
  const {} = useForm({
    mode: "onChange",
  });

  useEffect(()=>{
    if(Cookies.get('accessToken')){
      setIsloggedIn(true)
    }
  },[])
  const createJobMutation=useMutation((data:any)=>axiosInstance.postForm('/job',data),{
    onSuccess(data) {
      console.log('create job',data.data)
    },
  })
  const chatStartMutation=useMutation((data:Issue)=>axiosInstance.post('/chat',data),{
    onSuccess(data) {
      console.log('start chat',data.data)
      setChatId(data.data.data._id)
      setQuestions(data.data.data.questionAnswers)
      setIsFormCompleted(data.data.data.conclusion.length==0?false:true)
    },
  })

  const answerMutation=useMutation((data:ChatData)=>axiosInstance.put(`/chat?chatId=${data.chatId}`,{answerIndex:data.answerIndex}),{
    onSuccess(data) {
      console.log('next chat',data.data.data)
      setCurrentQuestionIndex((prev)=>prev+1)
      setCurrentQuestionValue(null)
      setQuestions(data.data.data.questionAnswers)
      const isCompleted=data.data.data.conclusion.length==0?false:true
      setIsFormCompleted(isCompleted)
      if(isCompleted){
        setQuestions((prev:any):any=>{
            return(
              [
                ...prev,
                mandatoryQuestionsInitial[0]
              ]
            )
          
        })
      }
    },
  })

  // const answerMutation2=useMutation((data:ChatData)=>axiosInstance.put(`/chat?chatId=${data.chatId}`,{answerIndex:data.answerIndex}),{
  //   onSuccess(data) {
  //     console.log('next chat 2',data.data.data)
  //     if(isFormCompleted){
  //       const questionsLength=(questions.length+mandatoryQuestionsInitial.length)-1
  //       setCurrentQuestionIndex((prev)=>{
  //         if(prev==questionsLength){
  //           setMandatoryQuestionsCompleted(true)
  //         }
  //         return prev
  //       })

  //     }
  //   },
  // })
  
  const issue = watch("issue"); // Watching the form state managed by react-hook-form
  const formValues = useWatch({ control });
  const router = useRouter();

  // useEffect(() => {
  //   if (isFormCompleted) {
  //     // Check if all required fields are filled
  //     const allFieldsFilled = Object.values(formValues).every((value) => value);
  //     setIsJobFormCompleted(allFieldsFilled);
  //   }
  // }, [formValues]);

  const onSubmit = async (data: any) => {
    const formData = new FormData();

    if (!mandatoryAnswers.completion) {
      toast.error("Please select when you need this done by");
      return;
    }

    formData.append("completion", mandatoryAnswers.completion);
    formData.append("estimatedBudget", mandatoryAnswers.estimatedBudget);
    formData.append("headline", data.headline);
    formData.append("address[postalCode]", data.address.postalCode);
    formData.append("address[formattedAddress]", data.address.formattedAddress);
    formData.append("address[latitude]", data.address.latitude);
    formData.append("address[longitude]", data.address.longitude);
    formData.append("address[city]", data.address.city);
    formData.append("address[country]", data.address.country);
    formData.append("chatId", chatId!);

    for (const file of data.files) {
      formData.append("files", file);
    }

    createJobMutation.mutate(formData)

    // const response: any = await dispatch(createJob(formData));
    // if (response.payload.message === "Success") {
    //   router.replace(`/homeowner/job/${response.payload.data._id}`);
    // }
  };

  const currentQuestionValue = formValues[`question_${currentQuestionIndex}`]; // Watching the form state managed by react-hook-form

  const handleTradeChange = (value: TRADES) => {
    setStepper(STEPPER.POST_JOB);
    setTrade(value);
  };

  const handleBack = () => {
    setStepper(STEPPER.SELECT_TRADES_PEOPLE);
    // dispatch(resetChat());
    setValue("issue", "");
  };

  const postJobTopSection = {
    title: `POST ${trade === TRADES.ELECTRICIAN ? "AN ELECTRICAL" : "A PLUMBER"} JOB`,
    text: "Lorem ipsum dolor sit amet, cons tetuer Lorem ipsum dolor sit amet, cons tetuer",
  };

  function newSubmit(data:any){
    const {issue}=data
    const payload:Issue={
      issue,
      trade
    }
    chatStartMutation.mutate(payload)
  }

  const arg: InitializeChatPayload = {
    issue,
    trade
  };
  // questions & conclusion
  // const { questions, conclusion, chatId, loading, isChatCompleted } =
  //   useAppSelector((state) => state.chat);

  // const { user } = useAppSelector((state) => state.auth);
  // rename above loading name
  // const {
  //   loading: jobLoading,
  //   error: jobError,
  //   job,
  // } = useAppSelector((state) => state.job);


  // useEffect(() => {
  //   dispatch(resetJob());
  //   setIsFormCompleted(false);
  //   setStepper(STEPPER.SELECT_TRADES_PEOPLE);
  //   dispatch(resetChat());
  //   setValue("issue", "");
  //   if (job) {
  //     // Redirect or show success message
  //     // refresh the page
  //     // refresh the page
  //     router.refresh();
  //   }
  // }, [job, router]);

  

  // const handleNextQuestion = () => {
  //   if (currentQuestionIndex < questions.length - 1) {
  //     setCurrentQuestionIndex(currentQuestionIndex + 1);
  //   }
  // };

  // const handleMandatoryQuestions = () => {
  //   if (!isChatCompleted) return;
  //   // show mandatory questions
  //   const firstQuestion = mandatoryQuestions.shift();
  //   if (!firstQuestion) {
  //     if (chatId) setIsFormCompleted(true);
  //     return;
  //   }
  //   const updatedQuestions = [...questions, firstQuestion];
  //   dispatch(updateQuestions(updatedQuestions));
  // };

  // update current question index when the current question value changes
  // useEffect(() => {
  //   handleNextQuestion();
  // }, [questions]);

  // add question to the form, when conclusion updated
  // useEffect(() => {
  //   handleMandatoryQuestions();
  // }, [conclusion]);

  const handleContinue = () => {
    // if (isChatCompleted) {
    //   handleMandatoryQuestions();
    //   return;
    // }

    // if (chatId) {
    //   // update chat
    //   const arg: UpdateChatPayload = {
    //     chatId,
    //     answerIndex: parseInt(currentQuestionValue),
    //   };
    //   dispatch(updateChat(arg));
    //   return;
    // }
    if(isFormCompleted){
      setQuestions((prev:any):any=>{
        return (
          [
            ...prev,
            mandatoryQuestionsInitial[1]
          ]
        )
      })
      setMandatoryQuestionsCompleted(true)
    }
    else{
      answerMutation.mutate({chatId:chatId!,answerIndex:currentQuestionValuee})
    }
  }
    
    // dispatch(initializeChat(arg));
console.log('questions',questions)
console.log('ref',headlineForm.current)
// console.log('selected',selected)
// console.log('chatid',chatId)
  return (
    <main>
      {stepper === STEPPER.SELECT_TRADES_PEOPLE && (
        <>
          <PageTopSection pageTopSection={selectTopSection} />
          <div className="mx-auto mb-16 py-16 w-3/4 px-8 sm:w-2/3 sm:px-12 md:px-16 lg:px-20 xl:px-0 border border-solid bg-[#FCFCFC]  border-color-8 rounded-md flex flex-col justify-center items-center gap-5 md:flex-row">
            <div className="bg-white max-w-[280px] py-5 px-4 border-color-8 border shadow-xs flex flex-col items-center gap-7">
              <h4 className="text-center text-base lg:text-xl font-bold text-color-6">
                Electrician
              </h4>
              <div className="w-[120px] h-[120px]">
                <Image
                  src="/images/electrician.png"
                  alt="Electrician"
                  width={120}
                  height={120}
                  className="object-contain"
                />
              </div>
              <p className="text-center font-[300] text-sm lg:text-base text-color-6">
                Lorem ipsum dolor sit amet, cons tetuer Lorem ipsum dolor sit
                amet, cons tetuer Lorem.
              </p>
              <BaseButton
                type="button"
                onClick={() => handleTradeChange(TRADES.ELECTRICIAN)}
              >
                I Need Electrician
              </BaseButton>
            </div>
            <div className="bg-white max-w-[280px] py-5 px-4 border-color-8 border shadow-xs flex flex-col items-center gap-7">
              <h4 className="text-center text-base lg:text-xl font-bold text-color-6">
                Plumber
              </h4>
              <div className="w-[120px] h-[120px] flex items-center justify-center">
                <Image
                  src="/images/plumber.png"
                  alt="Plumber"
                  width={120}
                  height={120}
                  className="object-contain"
                />
              </div>
              <p className="text-center font-[300] text-sm lg:text-base text-color-6">
                Lorem ipsum dolor sit amet, cons tetuer Lorem ipsum dolor sit
                amet, cons tetuer Lorem.
              </p>
              <BaseButton
                type="button"
                onClick={() => handleTradeChange(TRADES.PLUMBER)}
              >
                I Need Plumber
              </BaseButton>
            </div>
          </div>
        </>
      )}
      {stepper === STEPPER.POST_JOB && (
        <>
          <PageTopSection pageTopSection={postJobTopSection} />
          <div className="mx-auto mb-16 py-16 w-3/4 px-8 sm:w-2/3 sm:px-12 md:px-16 lg:px-20 border border-solid bg-[#FCFCFC]  border-color-8 rounded-md">
            <form onSubmit={handleSubmit(newSubmit)} className="mb-20">
              <h3 className="text-xl lg:text-2xl font-bold text-color-6 pb-6">
                Please describe your issue.
              </h3>
              <BaseTextArea
                name={"issue"}
                rows={5}
                disabled={!!chatStartMutation.data?.data}
                control={control}
                rules={
                  {
                    required:"Issue is Required"
                  }
                }
                placeholder="Write here..."
                // readOnly={chatId || loading ? true : false}
              />
              {
                !chatStartMutation.data?.data && <BaseButton type="submit" isLoading={chatStartMutation.isLoading} disabled={chatStartMutation.isLoading} extraClass="mt-14">
                Continue
               </BaseButton>
              }
            </form>
            
            {/* questions */}
              {questions.map((question:any, index) => (
              <div key={index} className="mb-20">
                <h3 className="text-xl lg:text-2xl font-bold text-color-6 pb-6">
                  {question.question} {/* Dynamically display the question */}
                </h3>
                
                <BaseRadioGroup
                value={currentQuestionValuee}
                onValueChange={(e)=>{
                  console.log('changee',e)
                  if(isFormCompleted){
                    if(question.name=="estimatedBudget"){
                      setMandatoryAnswers((prev:any)=>{
                        return {...prev,estimatedBudget:e}
                      }
                    )
                    }
                    else{
                      setMandatoryAnswers((prev:any)=>{
                        return {...prev,completion:e}
                      }
                    )
                    }
                  }
                  // console.log(typeof e)
                  setCurrentQuestionValue(e)
                }}
                  name={question.name ?? `question_${index}`} // Ensure unique names if multiple questions
                  control={control}
                  radioList={question.options.map((option:any, opIndex:number) => ({
                    description: option, // Adjust if your structure differs
                    value: question.ownValue ? option : opIndex.toString(), // Simplified assuming option is a string
                    text: option, // Simplified assuming option is a string
                    inline: question.name === "estimatedBudget" ? true : false,
                  }))}
                  readonly={
                    index < currentQuestionIndex
                      ? true
                      : false
                  }
                />
              </div>
            ))}
            
            {/* mandatory questions */}
          
            {mandatoryQuestionsCompleted && (
              <>
                <form
                ref={headlineForm}
                  onSubmit={handleSubmit(onSubmit)}
                  className="mt-10 flex flex-col gap-4"
                >
                  {/* headline */}
                  <div className="mb-20">
                    <h3 className="text-xl lg:text-2xl font-bold text-color-6 pb-6">
                      Give this Job a Headline *
                    </h3>
                    <BaseInput
                      name="headline"
                      type="text"
                      control={control}
                      radius="sm"
                      placeholder="Example: Repair and Paint Walls and Ceilings"
                      rules={{ required: "Headline is required" }}
                    />
                  </div>

                  {/* Pictures/videos */}
                  <div className="mb-20">
                    <h3 className="text-xl lg:text-2xl font-bold text-color-6 pb-6">
                      Pictures/videos upload
                    </h3>
                    <BaseFileInput name="files" control={control} />
                  </div>

                  {/* Post Code */}
                  <div className="mb-20">
                    <h3 className="text-xl lg:text-2xl font-bold text-color-6 pb-6">
                      Post Code *
                    </h3>

                    <GooglePlacesInput
                      name="address"
                      control={control}
                      placeholder="Postcode"
                      rules={{ required: "Post Code is required" }}
                      addressKey="postalCode"
                      radius="sm"
                    />
                  </div>

                  {isLoggedin && (
                    <BaseButton
                      type="submit"
                      disabled={createJobMutation.isLoading}
                      isLoading={createJobMutation.isLoading}
                    >
                      Post Job
                    </BaseButton>
                  )}
                </form>
              </>
            )}

            {!mandatoryQuestionsCompleted && chatId && (
              <>
                {chatId && (
                  <BaseButton
                    type="button"
                    variant="bordered"
                    extraClass="mt-14 mr-2"
                    onClick={handleBack}
                  >
                    Back
                  </BaseButton>
                )}

                <BaseButton
                  type="button"
                  extraClass="mt-14"
                  onClick={handleContinue}
                  disabled={
                    // !issue ||
                    (chatId &&
                      answerMutation.isLoading)
                      ? true
                      : false
                  }
                  isLoading={answerMutation.isLoading}
                >
                  Continue
                </BaseButton>
              </>
            )}
            {/* signup/login */}
            {!isLoggedin && mandatoryQuestionsCompleted && <HomeOwnerSignUpForm headlineRef={getValues} chatId={chatId} mandatoryAnswers={mandatoryAnswers} />}
          </div>
        </>
      )}
    </main>
  );
}
