import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = () => {
        setIsLoading(true);
        // Simulation de connexion
        setTimeout(() => {
            console.log('Login avec:', { email, password });
            setIsLoading(false);
        }, 1000);
    };

    return (
        <div className="fixed inset-0 bg-gray-950 flex items-center justify-center z-50 p-6">
            <div className="bg-gray-800 rounded-xl overflow-hidden relative w-full max-w-md p-8">

                <div className="flex flex-col items-center justify-center">
                    <div className="w-full max-w-sm">
                        <div className="text-center mb-8">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg mx-auto mb-4 flex items-center justify-center">
                                <span className="text-white font-bold text-xl">📄</span>
                            </div>
                            <h1 className="text-2xl font-bold text-white mb-2">Connexion</h1>
                            <p className="text-gray-400 text-sm">Accédez à votre espace documents</p>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Email
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="votre@email.com"
                                        className="w-full pl-10 pr-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Mot de passe
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full pl-10 pr-10 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-400"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="w-5 h-5" />
                                        ) : (
                                            <Eye className="w-5 h-5" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 rounded bg-gray-800 border border-gray-700 text-blue-500 focus:ring-0"
                                    />
                                    <span className="text-gray-400">Se souvenir de moi</span>
                                </label>
                                <a href="#" className="text-blue-400 hover:text-blue-300 transition">
                                    Mot de passe oublié?
                                </a>
                            </div>

                            <button
                                onClick={handleSubmit}
                                disabled={isLoading}
                                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-lg transition mt-6"
                            >
                                {isLoading ? 'Connexion...' : 'Se connecter'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}