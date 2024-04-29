import React, {useState} from "react";
import { Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';

/*testuid
testuid@example.com
Testuid1@example.com*/

const AccountInfoSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required').matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number'
    ),
});


const Register: React.FC =() =>{
    const [submitting, setSubmitting] = useState(false);

    const onSubmit = async (values: any) => {
        setSubmitting(true);
        try {
            const response = await fetch('https://library-crud-sample.vercel.app/api/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "name": values.username,
                    "email": values.email ,
                    "password": values.password,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to submit form');
            }

            const responseData = await response.json();
            console.log('API response:', responseData);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setSubmitting(false);
        }
    };
    return (
    <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={AccountInfoSchema}
        onSubmit={onSubmit}
    >
        {() => (
        <Form className="flex flex-col items-center">
            <h2 className="text-3xl mb-6">Register</h2>
            <div className="w-full max-w-xs">
                <div className="mb-4">
                    <label className="text-xl" htmlFor="username">Username</label>
                    <Field className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" type="text" name="username" />
                    <ErrorMessage className="text-red-500" name="username" component="div" />
                </div>
                <div>
                    <label className="text-xl" htmlFor="email">Email Address</label>
                    <Field className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" type="email" name="email" />
                    <ErrorMessage className="text-red-500" name="email" component="div" />
                </div>
                <div>
                    <label className="text-xl" htmlFor="password">Password</label>
                    <Field className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" type="password" name="password" />
                    <ErrorMessage className="text-red-500" name="password" component="div" />
                </div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">Submit</button>
            </div>
        </Form>
        )}
    </Formik>
    )}
export default Register;