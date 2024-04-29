import React from "react";
import { Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';


interface AddressInfoFormProps {
    nextStep: (values:any) => void;
    prevStep: (values:any) => void;
}

const AddressInfoSchema = Yup.object().shape({
    streetAddress: Yup.string().required('Street Address is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    zipCode: Yup.string().matches(/^\d{5}(-\d{4})?$/, 'Invalid Zip Code').required('Zip Code is required'),
});

const AddressInfoForm: React.FC<AddressInfoFormProps> =({ nextStep, prevStep }) =>
    
    <Formik
        initialValues={{ streetAddress: '', city: '', state: '', zipCode: '' }}
        validationSchema={AddressInfoSchema}
        onSubmit={(values) => {
        console.log(values);
        nextStep(values);
        }}
    >
        {() => (
        <Form>
            <h2 className="text-3xl mb-6">Address Information</h2>
            <div className="mb-4">
                <label className="text-xl" htmlFor="streetAddress">Street Address</label>
                <Field className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" type="text" name="streetAddress" />
                <ErrorMessage className="text-red-500" name="streetAddress" component="div" />
            </div>

            <div>
                <label className="text-xl" htmlFor="city">City</label>
                <Field className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" type="text" name="city" />
                <ErrorMessage className="text-red-500" name="city" component="div" />
            </div>

            <div>
                <label className="text-xl" htmlFor="state">State</label>
                <Field className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" type="text" name="state" />
                <ErrorMessage className="text-red-500" name="state" component="div" />
            </div>

            <div>
                <label className="text-xl" htmlFor="zipCode">Zip Code</label>
                <Field className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" type="text" name="zipCode" />
                <ErrorMessage className="text-red-500" name="zipCode" component="div" />
            </div>

            <div className="flex justify-between">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">Next</button>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="button" onClick={prevStep}>Previous</button>
            </div>
        </Form>
        )}
    </Formik>

export default AddressInfoForm;