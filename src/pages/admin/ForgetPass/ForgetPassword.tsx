import { useState } from 'react';
import { StepOne, StepOneValues } from './StepOne';
import { StepThree } from './StepThree';
import { StepTwo, StepTwoValues } from './StepTwo';

export default function ForgetPassword() {
  const [activeStep, setActiveStep] = useState(0);
  const [stepOneValues, setStepOneValues] = useState<StepOneValues | undefined>(undefined);
  const [stepTwoValues, setStepTwoValues] = useState<StepTwoValues | undefined>(undefined);

  const handleSubmitStepOne = (values: StepOneValues) => {
    setStepOneValues(values);
    setActiveStep(1);
  };

  const handleSubmitStepTwo = (values: StepTwoValues) => {
    setStepTwoValues(values);
    setActiveStep(2);
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return <StepOne onNext={handleSubmitStepOne} />;
      case 1:
        return <StepTwo onNext={handleSubmitStepTwo} session={stepOneValues?.session ?? ''} email={stepOneValues?.email ?? ''} />;
      case 2:
        return <StepThree session={stepTwoValues?.session ?? ''} />;
      default:
        return null;
    }
  };

  return renderStepContent();
}
