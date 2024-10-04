import { Form, Field, Formik} from 'formik';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function SignUp(){
    const navigate = useNavigate();

    const handlesign = async(values:any) =>{
        delete values.confirmPassword;
        try{
            console.log("User",values);
            await axios.post("http://localhost:3001/signup",values)
            
            navigate("/login");
        }
        catch (err){
            alert("Error occurred")
        }
    };
    return(
        <>
         <div>
        <h1>SignUp</h1>
        <Formik 
            initialValues={{
                firstName:'',
                lastName: '',
                email:'',
                password:'',
                confirmPassword:''
            }}
            onSubmit={handlesign}
        >
            <Form>
                <label htmlFor="firstName">First Name</label>
                <Field id="firstName" name="firstName" placeholder=" Enter Your First Name" /><br/>

                <label htmlFor="lastName">Last Name</label>
                <Field id="lastName" name="lastName" placeholder=" Enter Your Last Name" /><br/>

                <label htmlFor="email">email</label>
                <Field id="email" type="email" name="email" placeholder=" Enter Your email" /><br/>

                <label htmlFor="password">Password</label>
                <Field type="password" name="password" placeholder=" Enter Your password" /><br/>

                <label htmlFor="confirmPassword">Confirm Password</label>
                <Field type="Password" name="confirmPassword" placeholder=" confirm Your password" /><br/>
                
                <button type="submit">Submit</button>
            </Form>
        </Formik>
        </div>
        </>
    )
}