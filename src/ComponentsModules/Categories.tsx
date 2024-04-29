import React, {useState, useEffect} from "react";
import { Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";

const AccountInfoSchema = Yup.object().shape({
    dataCategories: Yup.string().required('Data Categories is required'),
    dataDescription: Yup.string().required('Data Description is required')
});

const Categories: React.FC = () => {
    
    const navigate = useNavigate();
    async function logout(e: any){     
        e.preventDefault()
        const token = localStorage.getItem("token");
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' +  token
            },
        };

        try {
            const response = await fetch('https://library-crud-sample.vercel.app/api/user/logout', options);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const responseData = await response.json();
            console.log('API response:', responseData)
            localStorage.removeItem('token');
            navigate ('/');

        } catch (error) {
            console.error('Error:', error);
        }
    }

    const [categories, setCategories] = useState<any[]>([]);
    async function getAllCategory(){     
        const token = localStorage.getItem("token");
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' +  token
            },
        };

        try {
            const response = await fetch('https://library-crud-sample.vercel.app/api/category', options);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const responseData = await response.json();
            console.log('API response:', responseData)
            setCategories(responseData);

        } catch (error) {
            console.error('Error:', error);
        }
    }
    useEffect(() => {
        getAllCategory();
    }, []);

    const [submitting, setSubmitting] = useState(false);

    const addNewCategories = async (values: any) => {
        setSubmitting(true);
        try {
            const bearerToken = localStorage.getItem('token');
            if (!bearerToken) {
                throw new Error('Token not found in localStorage');
            }

            const response = await fetch('https://library-crud-sample.vercel.app/api/category/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${bearerToken}`,
                },
                body: JSON.stringify({
                    "category_name": values.dataCategories,
                    "category_description": values.dataDescription,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to submit new category');
            }

            const responseData = await response.json();
            console.log('API response:', responseData);
            getAllCategory();
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setSubmitting(false);
        }
    };
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newCategories = [...categories];
        newCategories[index].category_name = e.target.value;
        setCategories(newCategories);
    };
    const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newCategories = [...categories];
        newCategories[index].category_description = e.target.value;
        setCategories(newCategories);
    };

    const getCategoryById = async (values: any) => {
        try {
            const bearerToken = localStorage.getItem('token');
            if (!bearerToken) {
                throw new Error('Token not found in localStorage');
            }

            const response = await fetch('https://library-crud-sample.vercel.app/api/category/:id', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${bearerToken}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to submit new category');
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
            initialValues={{ dataCategories: '', dataDescription: '' }}
            validationSchema={AccountInfoSchema}
            onSubmit={addNewCategories}
        >
            {() => (
                <Form className="flex flex-col items-center">
                    <h2 className="text-3xl mb-6">Your Categories</h2>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="button" onClick={logout}>Logout</button>
                    <div className="w-full max-w-xs">
                        <div className="mb-4">
                            <label className="text-xl" htmlFor="dataCategories">Categories</label>
                            <Field className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" type="text" name="dataCategories" />
                            <ErrorMessage className="text-red-500" name="dataCategories" component="div" />
                        </div>
                        <div>
                            <label className="text-xl" htmlFor="dataDescription">Description</label>
                            <Field className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" type="text" name="dataDescription" />
                            <ErrorMessage className="text-red-500" name="dataDescription" component="div" />
                        </div>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">Add New</button>
                    </div>
                    <div>
                        <h2 className="text-3xl mb-6">Categories List:</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Desctiprion</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            {categories.map((category, index) => (
                                <tr key={index}>
                                    <td>{category.id}</td>
                                    <td>
                                        <input 
                                        type="text" 
                                        value={category.category_name} 
                                        onChange={(e) => handleNameChange(e, index)}
                                        
                                        />
                                    </td>
                                    <td>
                                    <input 
                                        type="text" 
                                        value={category.category_description} 
                                        onChange={(e) => handleDescriptionChange(e, index)}
                                        
                                        />
                                    </td>
                                    <td>
                                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="button">Remove</button>
                                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="button">Update</button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </Form>
            )}
        </Formik>
    );
}
export default Categories;