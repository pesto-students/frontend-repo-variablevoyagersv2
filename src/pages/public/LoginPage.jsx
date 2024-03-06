import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { UserContext } from '../../hooks/UserContext';
const LoginPage = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { setUser } = useContext(UserContext)
    // const [generalError, setGeneralError] = useState('');

    const onSubmit = async (values) => {
        // console.log(data);
        try {
            const { data } = await axios.post('/auth/login', values);
            console.log('User', data.data);
            setUser(data.data)
            alert('Login successful');
            navigate("/");
        } catch (error) {
            // if (error.response && error.response.status === 401) {
            //     // Invalid email or password
            //     setError('general', {
            //       type: 'manual',
            //       message: 'Invalid email or password',
            //     });
            //   } else {
            //     // Other server-side error
            //     setGeneralError('Login failed');
            //   }
        }

    };

    return (
        <div className="mt-4 grow flex items-center justify-around h-4">
            <div className="mb-16 border p-4 rounded-xl border-gray-400 border-opacity-20 shadow-2xl">
                <h1 className="text-4xl text-center mb-4">Login</h1>
                <form className="max-w-md mx-auto" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <input
                            type="text"
                            placeholder="Your@email.com"
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                    message: 'Invalid email address',
                                },
                            })}
                        />
                        <p className='text-red-500'>{errors.email?.message}</p>
                    </div>

                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            {...register('password', {
                                required: 'Password is required',
                                minLength: {
                                    value: 6,
                                    message: 'Password must be at least 6 characters',
                                },
                            })}
                        />
                        <p className='text-red-500'>{errors.password?.message}</p>
                    </div>
                    <button className="primary my-3" type='submit' >Login</button>

                    <div className="text-center py-2 text-gray-500">
                        Don't have an account yet?{' '}
                        <Link className="underline text-black" to={'/register'}>
                            Register now
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;

