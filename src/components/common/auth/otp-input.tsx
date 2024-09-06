import React, { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import "./otp-input.css";
import Countdown from "react-countdown";

interface CustomOTPInputProps {
  value: string;
  onChange: (otp: string) => void;
  resendOTPService: () => void;
}

interface RendererProps {
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
}

export default function CustomOTPInput({
  value,
  onChange,
  resendOTPService,
}: CustomOTPInputProps) {
  const [countdownKey, setCountdownKey] = useState(0);
  const [isCountdownActive, setIsCountdownActive] = useState(true);

  const handleResendCode = () => {
    // Logic to resend the code
    // Reset the countdown
    resendOTPService();
    setCountdownKey((prevKey) => prevKey + 1);
    setIsCountdownActive(true);
  };

  useEffect(() => {
    handleResendCode();
  }, []);

  // Renderer callback with condition
  const renderer = ({ minutes, seconds }: RendererProps) => {
    // Render a countdown
    return (
      <span>
        {minutes}:{seconds}
      </span>
    );
  };

  return (
    <div className="flex flex-col items-center my-8 max-w-96">
      <div className="flex items-baseline">
        <p className="text-color-6 text-lg mr-4">Verification code</p>
        {isCountdownActive ? (
          <Countdown
            key={countdownKey}
            date={Date.now() + 30000}
            renderer={renderer}
            onComplete={() => setIsCountdownActive(false)}
          />
        ) : (
          <p
            className="text-color-9 cursor-pointer font-light text-tiny"
            onClick={handleResendCode}
          >
            Resend Code
          </p>
        )}
      </div>
      <div className="otp-container mt-4 flex justify-center">
        <OtpInput
          value={value}
          onChange={onChange}
          numInputs={4}
          shouldAutoFocus
          renderInput={(props, index) => (
            <div key={index} className="otp-box mx-1">
              <input {...props} />
            </div>
          )}
        />
      </div>
    </div>
  );
}
