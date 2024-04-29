import React from "react";
import { Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';

interface AccountInfoFormProps {
    prevStep: (values:any) => void;
    formData: (values:any) => void;
    reset: (values:any) => void
}

const AccountInfoSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required').matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number'
    ),
});

const AccountInfoForm: React.FC<AccountInfoFormProps> =({prevStep, formData, reset}) =>

    <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={AccountInfoSchema}
        onSubmit={(values) => {
            alert(JSON.stringify({...formData, ...values}));
            console.log(values);
            reset (values);
        }}
    >
        {() => (
        <Form>
            <h2 className="text-3xl mb-6">Account Information</h2>
            <div className="mb-4">
                <label className="text-xl" htmlFor="username">Username</label>
                <Field className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" type="text" name="username" />
                <ErrorMessage className="text-red-500" name="username" component="div" />
            </div>

            <div>
                <label className="text-xl" htmlFor="password">Password</label>
                <Field className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" type="password" name="password" />
                <ErrorMessage className="text-red-500" name="password" component="div" />
            </div>

            <div className="flex justify-between">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">Submit</button>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="button" onClick={prevStep}>Previous</button>
            </div>
        </Form>
        )}
    </Formik>


export default AccountInfoForm;