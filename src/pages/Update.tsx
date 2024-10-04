import { Form, Field, Formik, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as Yup from 'yup';
import './Update.css'; // Create this file for styles

export default function Update() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const validationSchema = Yup.object({
        firstName: Yup.string()
            .max(20, 'Must be 20 characters or less')
            .required('Required'),
        lastName: Yup.string()
            .max(20, 'Must be 20 characters or less')
            .required('Required'),
        email: Yup.string()
            .email('Invalid email address')
            .required('Required'),
        dob: Yup.date()
            .required('Required')
            .nullable(),
        gender: Yup.string()
            .oneOf(['male', 'female', 'other'], 'Invalid gender')
            .required('Required'),
        phoneNumber: Yup.string()
            .matches(/^[0-9]{10}$/, 'Must be a 10 digit phone number')
            .required('Required'),
    });

    const handleupdate = async (values:any) => {
        console.log(values);
        await axios.post("http://localhost:3001/profile/update", 
            values,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        )
        .then(() => {
            navigate("/profile"); // Redirect to profile after update
        })
        .catch((e) => {
            console.log("Error:", e);
        });
    };

    return (
        <div className="update-container">
            <h1>Update Profile</h1>
            <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                    dob: '',
                    gender: '',
                    phoneNumber: ''
                }}
                validationSchema={validationSchema}
                onSubmit={handleupdate}
            >
                <Form>
                    <label htmlFor="firstName">First Name</label>
                    <Field id="firstName" name="firstName" placeholder="Enter Your First Name" />
                    <ErrorMessage name="firstName" component="div" className="error" />

                    <label htmlFor="lastName">Last Name</label>
                    <Field id="lastName" name="lastName" placeholder="Enter Your Last Name" />
                    <ErrorMessage name="lastName" component="div" className="error" />

                    <label htmlFor="email">Email</label>
                    <Field type="email" name="email" placeholder="Enter Your Email" />
                    <ErrorMessage name="email" component="div" className="error" />

                    <label htmlFor="dob">Date of Birth</label>
                    <Field id="dob" name="dob" type="date" />
                    <ErrorMessage name="dob" component="div" className="error" />

                    <label htmlFor="gender">Gender</label>
                    <Field as="select" id="gender" name="gender">
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </Field>
                    <ErrorMessage name="gender" component="div" className="error" />

                    <label htmlFor="phoneNumber">Phone Number</label>
                    <Field id="phoneNumber" name="phoneNumber" placeholder="Enter Your Phone Number" />
                    <ErrorMessage name="phoneNumber" component="div" className="error" />

                    <button type="submit">Update Profile</button>
                </Form>
            </Formik>
        </div>
    );
}
