// import React from 'react';

import './App.css';
import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function App() {
  const [page, setPage] = useState(0)

  const SignupSchema = Yup.object().shape({
    fullName: Yup.string().required('*This field is required!'),
    emailAddress: Yup.string().email('Invalid email').required('*This field is required!'),
    dateOfBirth: Yup.string().required('*This field is required!'),
    streetAddress: Yup.string().required('*This field is required!'),
    city: Yup.string().required('*This field is required!'),
    state: Yup.string().required('*This field is required!'),
    zipCode: Yup.string().required('*This field is required!'),
    userName: Yup.string().required('*This field is required!'),
    password: Yup.string().required('*This field is required!')
  })
  return (
    <div className="App">
      <header className="App-header h-14 bg-gradient-to-r from-cyan-500 to-yellow-500">
      {page === 0 &&(<>
      <Formik
          initialValues={{
            fullName: String,
            emailAddress: String,
            dateOfBirth: ''
          }}

        validationSchema={SignupSchema}
        onSubmit={values => {
        console.log(values);
       }}>
        <Form className='bg-yellow-500 shadow-xl shadow-yellow-500/50 p-20 border-x-4 border-y-2 '>
          <h1 className="text-2xl font-bold text-slate-100">
            Personal Information
          </h1>
          <br />
          <div>
            <label className='text-lg text-slate-50'>Nama Lengkap :</label>
            <br />
          <ErrorMessage name='fullName' component='div' className='text-red-600 text-sm'/>
          <Field id='fullName' name='fullName' className='text-lg rounded-md border-2 border-yellow-300' type="text" placeholder=' Nama Lengkap' />
          </div>
          <div>
            <label className='text-lg text-slate-50'>Alamat Email :</label>
            <br />
          <ErrorMessage name='emailAddress' component='div' className='text-red-600 text-sm'/>
          <Field id='emailAddress' name='emailAddress' className='text-lg rounded-md border-2 border-yellow-300' type="email" placeholder=' example@gmail.com' />
          </div>
          <div>
            <label className='text-lg text-slate-50'>Tempat tanggal Lahir :</label>
            <br />
            <ErrorMessage name='dateOfBirth' component='div' className='text-red-600 text-sm'/>
          <Field id='dateOfBirth' name='dateOfBirth' className='text-lg rounded-md border-2 border-yellow-300' type="date" placeholder='Tempat tanggal Lahir ' />
          </div>
          <br />
          <div>
            <button className='bg-yellow-500 hover:bg-yellow-700 text-lg p-3 border-2 mx-1 text-slate-50 rounded-md border-yellow-400 '
              onClick={() => setPage(page + 1)}>SELANJUTNYA</button>
          </div>
        </Form>
        </Formik>
        </>)}
        {page === 1 &&(<>
      <Formik
          initialValues={{
            streetAddress: String,
            city: String,
            state: String,
            zipCode: Number
          }}
         validationSchema={SignupSchema}
         onSubmit={values => {
         console.log(values);
         }}>
        <Form className='bg-yellow-500 shadow-xl shadow-yellow-500/50 p-20 border-x-4 border-y-2 '>
        <h1 className="text-2xl font-bold text-slate-100">
          Informasi Alamat
        </h1>
        <br />
        <div>
          <label className='text-lg text-slate-50'>Alamat jalan :</label>
          <br />
        <ErrorMessage name='streetAddress' component='div' className='text-red-600 text-sm'/>
        <Field id='streetAddress' name='streetAddress' className='text-lg rounded-md border-2 border-yellow-300' type="text" placeholder=' Alamat jalan' />
        </div>
        <div>
          <label className='text-lg text-slate-50'>Kota :</label>
          <br />
        <ErrorMessage name='city' component='div' className='text-red-600 text-sm'/>
        <Field id='city' name='city' className='text-lg rounded-md border-2 border-yellow-300' type="text" placeholder=' kota' />
        </div>
        <div>
          <label className='text-lg text-slate-50'>State :</label>
          <br />
        <ErrorMessage name='state' component='div' className='text-red-600 text-sm'/>
        <Field id='state' name='state' className='text-lg rounded-md border-2 border-yellow-300' type="text" placeholder=' state' />
        </div>
        <div>
          <label className='text-lg text-slate-50'>Zip Code :</label>
          <br />
        <ErrorMessage name='zipCode' component='div' className='text-red-600 text-sm'/>
        <Field id='zipCode' name='zipCode' className='text-lg rounded-md border-2 border-yellow-300' type="number" placeholder=' zip code' />
        </div>
        <br />
        <div>
          <button className='bg-yellow-500 hover:bg-yellow-700 text-lg p-3 border-2 mx-1 text-slate-50 rounded-md border-yellow-400 ' onClick={() => setPage(page - 1)}>SEBELEUMNYA</button>
          <button className='bg-yellow-500 hover:bg-yellow-700 text-lg p-3 border-2 mx-1 text-slate-50 rounded-md border-yellow-400 ' onClick={() => setPage(page + 1)}>SELANJUTNYA</button>
        </div>
        </Form>
      </Formik>
        </>)}
        {page === 2 &&(<>
        <Formik
          initialValues={{
           userName: String,
           password: String
          }}
         validationSchema={SignupSchema}
         onSubmit={values => {
        console.log(values);
         }}>
        <Form className='bg-yellow-500 shadow-xl shadow-yellow-500/50 p-20 border-x-4 border-y-2 '>
          <h1 className="text-2xl font-bold text-slate-100">
            Account Information
          </h1>
          <br />
          <div>
            <label className='text-lg text-slate-50'>Username :</label>
            <br />
          <ErrorMessage name='userName' component='div' className='text-red-600 text-sm'/>
          <Field id='userName' name='userName' className='text-lg rounded-md border-2 border-yellow-300' type="text" placeholder=' username'/>
          </div>
          <div>
            <label className='text-lg text-slate-50'>Password :</label>
            <br />
            <ErrorMessage name='password' component='div' className='text-red-600 text-sm'/>
          <Field id='password' name='password' className='text-lg rounded-md border-2 border-yellow-300' type="password" placeholder=' password' />
          </div>
          <br/>
          <div>
          <button className='bg-yellow-500 hover:bg-yellow-700 text-lg p-3 border-2 mx-1 text-slate-50 rounded-md border-yellow-400 '
              onClick={() => setPage(page - 1)}>PREVIOUS</button>
            <button className='bg-yellow-500 hover:bg-yellow-700 text-lg p-3 border-2 mx-1 text-slate-50 rounded-md border-yellow-400 '
              onClick={() => setPage(page + 1)}>SUBMIT</button>
          </div>
        </Form>
      </Formik>
        </>)}
        {page === 3 &&(<>
        <form className='bg-yellow-500 shadow-xl shadow-yellow-500/50 p-20 border-x-4 border-y-2 '>
          <h1 className="text-2xl font-bold text-slate-100">
            Terimakasih Sudah mendaftar
          </h1>
          <br />
          <div className= 'flex justify-center'>
          </div>
          <br/>
          <div>
          <button className='bg-yellow-500 hover:bg-yellow-700 text-lg p-3 border-2 mx-1 text-slate-50 rounded-md border-yellow-400 '
              onClick={() => setPage(page - 3)}>Back to first page</button>
         
          </div>
        </form>
        </>)}
      </header>
    </div>
    
  );
}

export default App;
