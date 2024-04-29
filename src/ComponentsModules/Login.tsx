import React, {useState} from "react";
import { Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";

/*testuid
testuid@example.com
Testuid1@example.com*/

const AccountInfoSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required').matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number'
    ),
});


const Login: React.FC =() =>{
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();

    const onLogin = async (values :any) => {
        setSubmitting(true);
        try {
            const response = await fetch('https://library-crud-sample.vercel.app/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "email": values.email,
                    "password": values.password,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to submit form');
            }

            const responseData = await response.json();
            const {token} = responseData;
            localStorage.setItem('token', token);
            console.log('API response:', responseData);
            navigate ('/categories');

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
        onSubmit={onLogin}
    >
        {() => (
        <Form className="flex flex-col items-center">
            <h2 className="text-3xl mb-6">Login</h2>
            <div className="w-full max-w-xs">
                <div className="mb-4">
                    <label className="text-xl" htmlFor="email">Email Address</label>
                    <Field className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" type="email" name="email" />
                    <ErrorMessage className="text-red-500" name="email" component="div" />
                </div>
                <div className="mb-4">
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
export default Login;