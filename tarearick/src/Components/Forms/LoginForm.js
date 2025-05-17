import React from 'react';
import { useForm } from 'react-hook-form';

function LoginForm() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log('Datos del formulario:', data);
        // Aquí iría la lógica para enviar los datos de inicio de sesión
    };

    return (
        <form  onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="email">Correo Electrónico:</label>
                <input
                    type="email"
                    id="email"
                    {...register('email', {
                        required: 'El correo electrónico es requerido',
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: 'Formato de correo electrónico inválido',
                        },
                    })}
                />
                {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
            </div>

            <div>
                <label htmlFor="password">Contraseña:</label>
                <input
                    type="password"
                    id="password"
                    {...register('password', { required: 'La contraseña es requerida' })}
                />
                {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
            </div>

            <button type="submit">Iniciar Sesión</button>
        </form>
    );
}

export default LoginForm;