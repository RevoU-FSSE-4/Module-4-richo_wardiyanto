import React, {useState} from "react";
import PersonalInfoForm from "./PersonalInformation";
import AddressInfoForm from "./AddressInformation";
import AccountInfoForm from "./AccountInformation";

const MultiStepInfoForm: React.FC = () => {
    const [step, setStep] = useState<number>(1);
    const [formData, setFormData] = useState<any>({});

    const nextStep = (values:any) => {
        setFormData({...formData, ...values});
        setStep (step +1);
    };

    const prevStep = () : void => {
        setStep (step -1);
    };

    const reset = ():void => {
        setStep (step -2);
    };

    // problem on next and previous button
    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
            {step === 1 && <PersonalInfoForm nextStep={nextStep} />}
            {step === 2 && <AddressInfoForm nextStep={nextStep} prevStep={prevStep}/>}
            {step === 3 && <AccountInfoForm reset={reset} formData={formData} prevStep={prevStep}/>}
            
        </div>
    );
};

export default MultiStepInfoForm;

