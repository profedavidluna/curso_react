import React from 'react';
import { useForm } from 'react-hook-form';

function RegistroForm() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log('Datos de registro:', data);
        // Aquí iría la lógica para enviar los datos de registro del usuario
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="name">Nombre Completo:</label>
                <input
                    type="text"
                    id="name"
                    {...register('name', { required: 'El nombre es requerido', minLength: { value: 3, message: 'El nombre debe tener al menos 3 caracteres' } })}
                />
                {errors.name && <p style={{ color: 'red' }}>{errors.name.message}</p>}
            </div>

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
                    {...register('password', { required: 'La contraseña es requerida', minLength: { value: 6, message: 'La contraseña debe tener al menos 6 caracteres' } })}
                />
                {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
            </div>

            <div>
                <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
                <input
                    type="password"
                    id="confirmPassword"
                    {...register('confirmPassword', {
                        required: 'Debe confirmar la contraseña',
                        validate: (value, formValues) => value === formValues.password || 'Las contraseñas no coinciden',
                    })}
                />
                {errors.confirmPassword && <p style={{ color: 'red' }}>{errors.confirmPassword.message}</p>}
            </div>

            <div>
                <label>Tipo de Cuenta:</label>
                <div>
                    <input
                        type="radio"
                        id="ahorro"
                        value="ahorro"
                        {...register('accountType', { required: 'Debe seleccionar un tipo de cuenta' })}
                    />
                    <label htmlFor="ahorro">Ahorro</label>
                </div>
                <div>
                    <input
                        type="radio"
                        id="corriente"
                        value="corriente"
                        {...register('accountType', { required: 'Debe seleccionar un tipo de cuenta' })}
                    />
                    <label htmlFor="corriente">Corriente</label>
                </div>
                {errors.accountType && <p style={{ color: 'red' }}>{errors.accountType.message}</p>}
            </div>

            <div>
                <label htmlFor="country">País de Residencia:</label>
                <select id="country" {...register('country', { required: 'Seleccione su país' })}>
                    <option value="">Seleccionar...</option>
                    <option value="costa_rica">Costa Rica</option>
                    <option value="panama">Panamá</option>
                    <option value="nicaragua">Nicaragua</option>
                    {/* Agrega más países según sea necesario */}
                </select>
                {errors.country && <p style={{ color: 'red' }}>{errors.country.message}</p>}
            </div>

            <div>
                <label>Acepto los Términos y Condiciones:</label>
                <input
                    type="checkbox"
                    {...register('terms', { required: 'Debe aceptar los términos y condiciones' })}
                />
                {errors.terms && <p style={{ color: 'red' }}>{errors.terms.message}</p>}
            </div>

            <button type="submit">Registrarse</button>
        </form>
    );
}

export default RegistroForm;