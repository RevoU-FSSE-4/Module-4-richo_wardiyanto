import React from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

interface personalInfoFormProps {
    nextStep: (values:any) => void;
}

const PersonalInfoSchema = Yup.object().shape({
    fullName: Yup.string().required('Full Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    dob: Yup.date().required('Date of Birth is required'),
    });

const PersonalInfoForm: React.FC<personalInfoFormProps> =({nextStep}) => 

    <Formik
        initialValues={{ fullName: '', email: '', dob: '' }}
        validationSchema={PersonalInfoSchema}
        onSubmit={(values) => {
            console.log(values);
            nextStep (values);
        }}
    >
        {() => (
        <Form>
            <h2 className="text-3xl mb-6">Personal Information</h2>
            <div className="mb-4">
                <label className="text-xl" htmlFor="fullName">Full Name</label>
                <Field className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" type="text" name="fullName" />
                <ErrorMessage className="text-red-500" name="fullName" component="div" />
            </div>

            <div>
                <label className="text-xl" htmlFor="email">Email Address</label>
                <Field className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" type="email" name="email" />
                <ErrorMessage className="text-red-500" name="email" component="div" />
            </div>

            <div>
                <label className="text-xl" htmlFor="dob">Date of Birth</label>
                <Field className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" type="date" name="dob" />
                <ErrorMessage className="text-red-500" name="dob" component="div" />
            </div>
            
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">Next</button>
        </Form>
        )}
    </Formik>


export default PersonalInfoForm;
