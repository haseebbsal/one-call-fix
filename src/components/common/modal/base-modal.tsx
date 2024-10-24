import { Image } from "@nextui-org/image";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/modal";
import React from "react";

interface BaseModalProps {
  onClose?:any
  isOpen: boolean;
  onOpenChange?: () => void;
  children: React.ReactNode;
  header?: string;
  modalHeaderImage?: string;
  hideCloseButton?: boolean;
  size?:
    | "md"
    | "xs"
    | "sm"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "full";
    isDismissable?:boolean
}

export default function BaseModal({
  children,
  isOpen,
  onOpenChange,
  hideCloseButton,
  header,
  modalHeaderImage,
  size,
  onClose,
  isDismissable=false
}: BaseModalProps) {
  return (
    <Modal
    onClose={onClose}
      className="mx-1 md:mx-9"
      isOpen={isOpen}
      size={size}
      placement={"center"}
      onOpenChange={onOpenChange}
      hideCloseButton={hideCloseButton}
      isDismissable={isDismissable}
      classNames={{
        body: "",
        closeButton: "text-main mt-2 mr-2 p-1",
        wrapper: "z-[10000]",
      }}
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="text-lg lg:text-xl 2xl:text-2xl text-center font-inter font-semibold text-main pb-1 flex flex-col items-center gap-2.5">
              {modalHeaderImage && (
                <Image
                  src={modalHeaderImage}
                  alt={header}
                  width={150}
                  height={150}
                  className="object-contain"
                />
              )}
              {header}
            </ModalHeader>

            <ModalBody>{children}</ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
