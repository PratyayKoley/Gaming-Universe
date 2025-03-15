import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Rocket, User, Lock, Mail, Eye, EyeOff } from 'lucide-react';

const Auth = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    passwordConfirm: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = isLogin ? 'SpaceExplorer' : formData.username || 'NewUser';
    
    // Save username to localStorage
    localStorage.setItem('username', username);
    
    alert(isLogin ? 'Login successful! (Static)' : 'Signup successful! (Static)');
    navigate('/', { state: { username } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md relative">
        <div className="bg-slate-800 bg-opacity-50 backdrop-blur-lg rounded-lg shadow-xl p-8 border border-purple-500/20">
          <div className="text-center mb-8">
            <Rocket className="mx-auto text-purple-400 w-12 h-12 mb-4" />
            <h2 className="text-3xl font-bold text-white mb-2">
              {isLogin ? 'Welcome Back' : 'Join the Mission'}
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label className="block text-purple-200 mb-2 text-sm">Username</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="w-full bg-slate-900/50 border border-purple-500/30 rounded-lg py-3 px-12 text-white placeholder-purple-300/50"
                    placeholder="Space Explorer"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-purple-200 mb-2 text-sm">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-slate-900/50 border border-purple-500/30 rounded-lg py-3 px-12 text-white placeholder-purple-300/50"
                  placeholder="astronaut@space.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-purple-200 mb-2 text-sm">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full bg-slate-900/50 border border-purple-500/30 rounded-lg py-3 px-12 text-white placeholder-purple-300/50"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-400"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="block text-purple-200 mb-2 text-sm">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="passwordConfirm"
                    value={formData.passwordConfirm}
                    onChange={handleInputChange}
                    className="w-full bg-slate-900/50 border border-purple-500/30 rounded-lg py-3 px-12 text-white placeholder-purple-300/50"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-400"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-purple-400 text-white rounded-lg py-3 px-4 font-medium hover:from-purple-700 hover:to-purple-500 transition-colors"
            >
              {isLogin ? 'Launch In' : 'Begin Journey'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-purple-300 hover:text-purple-200 text-sm"
            >
              {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Log in'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;