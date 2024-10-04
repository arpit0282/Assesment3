import { Form, Field, Formik, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as Yup from 'yup';
import './Login.css'; // Import your CSS file

const validationSchema = Yup.object({
    email: Yup.string()
        .email('Invalid email address')
        .required('Required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters long')
        .required('Required'),
});

export default function Login() {
    const navigate = useNavigate();

    const handleLogin = async (values: any) => {
        try {
            const response = await axios.post("http://localhost:3001/login", values);
            localStorage.setItem("token", response.data.token);
            navigate("/profile");
        } catch (err) {
            alert("Error");
        }
    };

    return (
        <div className="login-container">
            <h1>Login</h1>
            <Formik
                initialValues={{
                    email: '',
                    password: ''
                }}
                validationSchema={validationSchema}
                onSubmit={handleLogin}
            >
                <Form>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <Field type="email" name="email" placeholder="Email" />
                        <ErrorMessage name="email" component="div" className="error-message" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <Field type="password" name="password" placeholder="Enter your password" />
                        <ErrorMessage name="password" component="div" className="error-message" />
                    </div>

                    <button type="submit">Submit</button>
                </Form>
            </Formik>
        </div>
    );
}
