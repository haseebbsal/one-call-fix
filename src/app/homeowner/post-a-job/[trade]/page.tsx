"use client";

import { Image } from "@nextui-org/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { set, useForm, useWatch } from "react-hook-form";
import { RadioGroup, Radio, useDisclosure } from "@nextui-org/react";
import { CheckboxGroup, Checkbox } from "@nextui-org/react";
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
import BaseModal from "@/components/common/modal/base-modal";
import RemoveAlreadyFromHomeOwnerSignUpForm from "@/components/modules/auth/remove-already-from-sign";

type Issue = {
  trade: number,
  issue: string
}
const selectTopSection = {
  title: "SELECT YOUR TRADEPEOPLE",
  text: "",
};


enum STEPPER {
  SELECT_TRADES_PEOPLE,
  POST_JOB,
}

const options: any = [
  'First'
]

// mandatory questions to ask
const mandatoryQuestionsInitial: QuestionAnswer[] = [
  // {
  //   question: "Is your job gas-related?",
  //   answerIndex: -1,
  //   name: "gasSafeRelated",
  //   ownValue: true,
  //   _id: "1",
  //   options: [
  //     "Yes",
  //     "No",
  //     "Not Sure",
  //   ],
  // },
  {
    question: "What is your estimated budget?",
    note: "Sharing your budget doesn’t mean you’re committing to anything. We only ask this as providing a reasonable estimate can encourage more tradespeople to offer you quotes.",
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

type ChatData = {
  chatId: string,
  answerIndex: number
}
export default function PostAJob(datas: any) {

  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();

  // const dispatch = useAppDispatch();
  // const [selected, setSelected] = useState("london");
  console.log('id',)
  const headlineForm = useRef<any>()
  const [isLoggedin, setIsloggedIn] = useState(false)
  const [stepper, setStepper] = useState(STEPPER.SELECT_TRADES_PEOPLE);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [trade, setTrade] = useState<TRADES>(Number(datas.params.trade));
  const [isFormCompleted, setIsFormCompleted] = useState(false);
  const [mandatoryQuestionsCompleted, setMandatoryQuestionsCompleted] = useState(false)
  const [isJobFormCompleted, setIsJobFormCompleted] = useState(false);
  const [mandatoryQuestionsIndex, setMandatoryQuestionsIndex] = useState(0)
  const [mandatoryQuestions, setMandatoryQuestions] = useState(
    mandatoryQuestionsInitial,
  );
  const [mandatoryAnswers, setMandatoryAnswers] = useState({
    estimatedBudget: "",
    completion: ""
  })
  const [currentQuestionValuee, setCurrentQuestionValue] = useState<any>(null)
  const [questions, setQuestions] = useState([])
  const [chatId, setChatId] = useState<string | null>(null)
  const {
    setValue,
    control,
    handleSubmit,
    watch,
    formState: { isValid },
    getValues
  } = useForm();
  const { } = useForm({
    mode: "onChange",
  });

  useEffect(() => {
    const getUser = Cookies.get('userData')
    if (getUser) {
      const { role } = JSON.parse(getUser)
      if (role == 'HomeOwner') {
        // setDisplay(false)
        setIsloggedIn(true)
      }
      // console.log('user',parse)
    }
  }, [])
  const createJobMutation = useMutation((data: any) => axiosInstance.postForm('/job', data), {
    onSuccess(data) {
      onOpen()
      console.log('create job', data.data)
      toast.success("Job Created Successfully")
      if (isLoggedin) {
        router.push('/homeowner/jobs')
      }
    },
  })
  const chatStartMutation = useMutation((data: Issue) => axiosInstance.post('/chat', data), {
    onSuccess(data) {
      console.log('start chat', data.data)
      setChatId(data.data.data._id)
      setQuestions(data.data.data.questionAnswers)
      setIsFormCompleted(data.data.data.conclusion.length == 0 ? false : true)
    },
  })

  const answerMutation = useMutation((data: ChatData) => axiosInstance.put(`/chat?chatId=${data.chatId}`, { answerIndex: data.answerIndex }), {
    onSuccess(data) {
      console.log('next chat', data.data.data)
      setCurrentQuestionIndex((prev) => prev + 1)
      setCurrentQuestionValue(null)
      setQuestions(data.data.data.questionAnswers)
      const isCompleted = data.data.data.conclusion.length == 0 ? false : true

      setIsFormCompleted(isCompleted)
      // setMandatoryQuestionsCompleted(!!questions.find((e:any)=>e.name=='completion'))
      if (isCompleted) {
        setQuestions((prev: any): any => {

          return (
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
    text: "",
  };

  function newSubmit(data: any) {
    const { issue } = data
    const payload: Issue = {
      issue,
      trade
    }
    chatStartMutation.mutate(payload)
  }

  const arg: InitializeChatPayload = {
    issue,
    trade
  };

  const handleContinue = () => {
    if (isFormCompleted && !questions.find((e: any) => e.name == 'completion')) {
      setQuestions((prev: any): any => {
        return (
          [
            ...prev,
            mandatoryQuestionsInitial[1]
          ]
        )
      })
      // setMandatoryQuestionsCompleted(true)
    }
    else if (isFormCompleted && questions.find((e: any) => e.name == 'completion')
    ) {
      setMandatoryQuestionsCompleted(true)

    }
    else {
      console.log('checkkk',{ chatId: chatId!, answerIndex: currentQuestionValuee })
      answerMutation.mutate({ chatId: chatId!, answerIndex: currentQuestionValuee })
    }
  }


  useEffect(() => {
    const getAllQuestions = document.getElementById('questionsGenerated')
    const getQuestion = document.getElementsByClassName('questions')
    if (getQuestion.length) {
      console.log('elements', getAllQuestions)
      const pos = getAllQuestions!.getBoundingClientRect()
      const secondPos = getQuestion[getQuestion.length - 1].getBoundingClientRect()
      console.log('pos', pos)
      // console.log('pos',getAllQuestions[getAllQuestions.length-1].getBoundingClientRect())
      window.scrollTo(0, pos.height - secondPos.height)
      // console.log('questions html',getAllQuestions)
    }
  }, [questions])

  // dispatch(initializeChat(arg));
  console.log('questions', questions)
  console.log('ref', headlineForm.current)
  // console.log('selected',selected)
  // console.log('chatid',chatId)
  return (
    <main>
      <BaseModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="md"
        header="Job Created SuccessFully"
        modalHeaderImage="/images/modal-success.png"
      >
        <div className="flex flex-col items-center mb-7">
          <h5 className="text-color-20 text-sm lg:text-base pb-4">
            Job Created SuccessFully
          </h5>
          <BaseButton
            type="button"
            onClick={onClose}
            extraClass="bg-color-9 !max-w-[350px] w-full text-white"
          >
            Okay
          </BaseButton>
        </div>
      </BaseModal>


      <>
        <PageTopSection pageTopSection={postJobTopSection} />
        <div id="questionsGenerated" className="mx-auto mb-16 sm:py-16 w-[90%] sm:w-3/4 sm:px-8 px-4 md:px-16 lg:px-20 border border-solid bg-[#FCFCFC]  border-color-8 rounded-md">
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
                  required: "Issue is Required"
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
          {questions.map((question: any, index) => (
            <div key={index} className="mb-20 questions">
              <div className="pb-6 flex flex-col gap-2">
                <h3 className="text-xl lg:text-2xl font-bold text-color-6 ">
                  {question.question} {/* Dynamically display the question */}
                </h3>
                <h2>{question.note}</h2>
              </div>

              <BaseRadioGroup
                value={currentQuestionValuee}
                onValueChange={(e) => {
                  console.log('changee', e)
                  if (isFormCompleted) {
                    if (question.name == "estimatedBudget") {
                      setMandatoryAnswers((prev: any) => {
                        return { ...prev, estimatedBudget: e }
                      }
                      )
                    }
                    else {
                      setMandatoryAnswers((prev: any) => {
                        return { ...prev, completion: e }
                      }
                      )
                    }
                  }
                  // console.log(typeof e)
                  setCurrentQuestionValue(e)
                }}
                name={question.name ?? `question_${index}`} // Ensure unique names if multiple questions
                control={control}
                radioList={question.options.map((option: any, opIndex: number) => ({
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
          {!isLoggedin && mandatoryQuestionsCompleted && <RemoveAlreadyFromHomeOwnerSignUpForm onOpen={onOpen} headlineRef={getValues} chatId={chatId} mandatoryAnswers={mandatoryAnswers} />}
        </div>
      </>
    </main>
  );
}
