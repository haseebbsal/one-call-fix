"use client";

import { Image } from "@nextui-org/image";
import { Textarea } from "@nextui-org/input";
import { useForm } from "react-hook-form";

import CustomButton from "@/components/common/button/custom-button";
import BaseFileUpload from "@/components/common/file-upload/base-file-upload";
import TradepersonCustomInput from "@/components/common/form/tradeperson-custom-input";

export default function ProfileSettings() {
  const { control } = useForm();
  return (
    <>
      <div className="px-5 py-10">
        <div className="flex flex-col xl:flex-row lg:gap-5">
          <div className="w-full lg:max-w-screen-xl flex flex-col mb-8 lg:mb-0">
            <h2 className="text-xl font-semibold mb-4 text-color-17">
              Profile
            </h2>
            <section className="flex-1 p-4 sm:p-8 rounded-md border bg-color-16 text-left text-gray-600">
              <div className="flex flex-wrap items-center justify-between gap-5 lg:gap-0 pb-8 border-b border-color-19 mb-8">
                <div className="flex flex-col gap-2">
                  <div className="flex flex-wrap items-center gap-6">
                    <div className="relative">
                      <img
                        src="/images/photo-circle.png"
                        alt="circle"
                        className="object-cover"
                      />
                      <img
                        src="/images/user.png"
                        alt="user"
                        className="absolute inset-0 m-auto object-cover"
                      />
                    </div>
                    <div className="flex flex-col">
                      <h3 className="font-semibold mb-3">
                        Update Your Profile
                      </h3>
                      <CustomButton extraClass="bg-color-9 text-white">
                        Upload Profile
                      </CustomButton>
                    </div>
                  </div>
                  <div>
                    <span className="text-xs md:text-sm text-color-14">
                      Allowed JPG, GIF or PNG. Max size of 800kB
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-6">
                  <CustomButton extraClass="bg-color-12 text-white">
                    Save Changes
                  </CustomButton>
                  <CustomButton extraClass="bg-white border-2 px-10 border-color-12 text-color-12 font-bold">
                    Cancel
                  </CustomButton>
                </div>
              </div>

              <div className="mb-8">
                <div className="flex justify-center sm:justify-end mb-2">
                  <CustomButton extraClass="bg-color-21 text-white px-7">
                    Update
                  </CustomButton>
                </div>
                <h3 className="font-semibold mb-3">Services you offer</h3>
                <div className="flex flex-col xl:flex-row justify-between gap-4">
                  <div className="flex-1">
                    <Textarea
                      name={"message"}
                      rows={5}
                      placeholder="Type Your Message"
                      classNames={{
                        base: "max-w-full sm:max-w-2xl",
                        input: "min-h-[150px] w-full",
                      }}
                      variant="bordered"
                      radius="sm"
                    />
                  </div>
                  <div className="flex flex-col justify-between w-full p-3 sm:w-96 h-44 bg-color-12 mt-4 sm:mt-0 sm:ml-4 rounded-md">
                    <div>
                      <p className="py-2 border-b border-color-19 text-white">
                        Plumber
                      </p>
                    </div>
                    <div>
                      <CustomButton extraClass="bg-white text-white text-color-12 font-bold text-xs px-2 sm:px-7">
                        Add a New Service
                      </CustomButton>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
                <div className="flex flex-col justify-center w-full max-w-xl">
                  <h3 className="font-semibold mb-1">Website URL</h3>
                  <span className="text-xs md:text-sm text-color-14 mb-3">
                    Update your website URL
                  </span>
                  <TradepersonCustomInput
                    name="url"
                    type="text"
                    control={control}
                    variant="bordered"
                    placeholder="http://example.com"
                    radius="full"
                    size="lg"
                    extraClass="max-w-xl"
                  />
                </div>

                <div className="flex flex-col justify-center w-full max-w-xl">
                  <h3 className="font-semibold mb-1">
                    Link to external reviews
                  </h3>
                  <span className="text-xs md:text-sm text-color-14 mb-3">
                    Help you win jobs while you are still building up reviews on
                    our platform!
                  </span>
                  <TradepersonCustomInput
                    name="externalReviewsLink"
                    type="text"
                    control={control}
                    variant="bordered"
                    placeholder="http://example.com"
                    radius="full"
                    size="lg"
                    extraClass="max-w-xl"
                  />
                </div>

                <div className="flex flex-col justify-center w-full max-w-xl">
                  <h3 className="font-semibold mb-1">
                    Upload Previous Job Photos
                  </h3>
                  <span className="text-xs md:text-sm text-color-14 mb-3">
                    Lorem ipsum dolor sit amet,cons tetuer lorem ipsum.
                  </span>

                  <BaseFileUpload labelClass="h-14"></BaseFileUpload>
                </div>

                <div className="flex flex-col justify-center w-full max-w-xl">
                  <h3 className="font-semibold mb-5">Work Gallery</h3>
                  <div className="flex items-center gap-2 mb-2 overflow-x-auto flex-wrap">
                    <Image
                      radius="none"
                      src="/images/attachment-1.png"
                      alt="attachment-1"
                      className="w-20 h-24 flex-shrink-0"
                    />
                    <Image
                      radius="none"
                      src="/images/attachment-1.png"
                      alt="attachment-1"
                      className="w-20 h-24 flex-shrink-0"
                    />
                    <Image
                      radius="none"
                      src="/images/attachment-1.png"
                      alt="attachment-1"
                      className="w-20 h-24 flex-shrink-0"
                    />
                    <Image
                      radius="none"
                      src="/images/attachment-1.png"
                      alt="attachment-1"
                      className="w-20 h-24 flex-shrink-0"
                    />
                    <Image
                      radius="none"
                      src="/images/attachment-1.png"
                      alt="attachment-1"
                      className="w-20 h-24 flex-shrink-0"
                    />
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
