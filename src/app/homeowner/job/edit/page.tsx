'use client'

import BaseButton from "@/components/common/button/base-button";
import BaseInput from "@/components/common/form/base-input";
import { useForm } from "react-hook-form";

export default function EditJob(){
    const { control, handleSubmit, setValue } = useForm<any>();
    // useEffect(() => {
    //     const userData=JSON.parse(Cookies.get('userData')!)
    //     console.log('user',userData)
    //     setValue("firstName", userData.firstName);
    //       setValue("lastName", userData.lastName);
    //       setValue("phone", userData.phone);
    //       setValue("email", userData.email);
    //   }, []);

    function onSubmit(){

    }
    return (
        <section className="mt-20 mb-16 px-16 flex flex-col gap-5">
            <div>
                <h5 className="capitalize text-lg lg:text-xl font-semibold text-color-17 pb-2">
                Edit Job Post
                </h5>
                <form className="p-4 border-2 border-gray-100 rounded-md" onSubmit={handleSubmit(onSubmit)}>
                    <div className="my-8">
                    <h3 className="text-sm lg:text-base font-semibold text-color-6 mb-1">
                        Job Title
                    </h3>
                    <BaseInput
                        name="title"
                        type="text"
                        // defaultValue={user.phone}
                        placeholder="001122114400"
                        control={control}
                        // icon={<FaEdit color="#2BABFB" />}
                        rules={{
                        required: "Job Title is required",
                        }}
                        extraClass={{
                            input:"sm:!w-1/2 !w-full"
                        }}
                    />
                    </div>
                    <div className="my-8">
                    <h3 className="text-sm lg:text-base font-semibold text-color-6 mb-1">
                        Job Type
                    </h3>
                    <BaseInput
                        name="type"
                        type="text"
                        // defaultValue={user.firstName}
                        placeholder="First Name Here"
                        control={control}
                        // icon={<FaEdit color="#2BABFB" />}
                        rules={{
                        required: "First Name is required",
                        }}
                        extraClass={{
                            input:"sm:!w-1/2 !w-full"
                        }}
                    />
                    </div>
                    <div className="my-8">
                    <h3 className="text-sm lg:text-base font-semibold text-color-6 mb-1">
                        Job Location
                    </h3>
                    <BaseInput
                        name="location"
                        type="text"
                        placeholder="Last Name Here"
                        control={control}
                        // icon={<FaEdit color="#2BABFB" />}
                        rules={{
                        required: "Last Name is required",
                        }}
                        extraClass={{
                            input:"sm:!w-1/2 !w-full"
                        }}
                    />
                    </div>
                    <div className="my-8">
                    <h3 className="text-sm lg:text-base font-semibold text-color-6 mb-1">
                        Job Location
                    </h3>
                    <BaseInput
                        name="location"
                        type="text"
                        placeholder="Last Name Here"
                        control={control}
                        // icon={<FaEdit color="#2BABFB" />}
                        rules={{
                        required: "Last Name is required",
                        }}
                        extraClass={{
                            input:"sm:!w-1/2 !w-full"
                        }}
                    />
                    </div>

                    <BaseButton type="submit" 
                    // isLoading={changeProfileImgMutation.isLoading} disabled={changeProfileImgMutation.isLoading}
                    >
                    Save
                    </BaseButton>
                    {/* {error && <p className="text-danger">{error}</p>} */}
      </form>
            </div>
        </section>
    )
}