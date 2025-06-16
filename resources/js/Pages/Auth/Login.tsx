import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { motion } from 'framer-motion';
import { FaWater } from 'react-icons/fa';

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm<{
        email: string;
        password: string;
        remember: boolean;
    }>({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Login" />

            <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-500 to-cyan-200 relative overflow-hidden px-4">
                {/* Background gelombang */}
                <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-cyan-100 to-transparent rounded-b-full opacity-30 animate-pulse" />

                {/* Animasi ikon air */}
                <motion.div
                    className="absolute top-12 right-12 text-white text-4xl opacity-40"
                    animate={{ y: [0, -12, 0] }}
                    transition={{ duration: 5, repeat: Infinity }}
                >
                    <FaWater />
                </motion.div>

                {/* Form login */}
                <motion.div
                    className="w-full max-w-md bg-white/80 backdrop-blur-lg rounded-3xl shadow-lg p-8 z-10"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <h2 className="text-3xl font-bold text-sky-700 text-center mb-1">
                        Masuk ke Filter.IO
                    </h2>
                    <p className="text-center text-sm text-gray-600 mb-6">
                        Sistem filter air otomatis berbasis IoT
                    </p>

                    {status && (
                        <div className="mb-4 text-sm font-medium text-green-600 text-center">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-4">
                        <div>
                            <InputLabel htmlFor="email" value="Email" />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full"
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) => setData('email', e.target.value)}
                            />
                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="password" value="Password" />
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full"
                                autoComplete="current-password"
                                onChange={(e) => setData('password', e.target.value)}
                            />
                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        <div className="flex items-center">
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                            />
                            <span className="ms-2 text-sm text-gray-700">Ingat saya</span>
                        </div>

                        <div className="flex items-center justify-between">
                            {canResetPassword && (
                                <Link
                                    href={route('password.request')}
                                    className="text-sm text-sky-700 underline hover:text-sky-900"
                                >
                                    Lupa password?
                                </Link>
                            )}
                            <PrimaryButton className="ms-4" disabled={processing}>
                                Masuk
                            </PrimaryButton>
                        </div>

                        <div className="pt-4 text-center text-sm text-gray-600">
                            Belum punya akun?{' '}
                            <Link href="/register" className="text-sky-700 hover:underline">
                                Daftar di sini
                            </Link>
                        </div>
                    </form>
                </motion.div>
            </div>
        </GuestLayout>
    );
}
