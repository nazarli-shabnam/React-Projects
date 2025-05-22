// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import React, { useState } from 'react';
const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);

  const calculatePasswordStrength = (pass: string) => {
    let strength = 0;
    
    if (pass.length >= 8) strength += 1;
    if (/[A-Z]/.test(pass)) strength += 1;
    if (/[0-9]/.test(pass)) strength += 1;
    if (/[^A-Za-z0-9]/.test(pass)) strength += 1;
    
    setPasswordStrength(strength);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    calculatePasswordStrength(newPassword);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'}`}>
      {/* Navigation Bar */}
      <nav className={`px-6 py-4 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <a 
              href="https://readdy.ai/home/48016c2a-6837-4c39-9ad5-e2db5b0b0864/7dc0d66c-3923-4584-8a84-3ae567bfef21" 
              data-readdy="true"
              className="flex items-center space-x-2"
            >
              <i className="fas fa-mosque text-emerald-600 text-2xl"></i>
              <span className="text-xl font-semibold">Nur Web</span>
            </a>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setDarkMode(!darkMode)} 
              className="cursor-pointer !rounded-button whitespace-nowrap"
            >
              <i className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'} ${darkMode ? 'text-yellow-400' : 'text-gray-500'}`}></i>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex min-h-[calc(100vh-73px)]">
        {/* Left Side - Background Image */}
        <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
          <img 
            src="https://readdy.ai/api/search-image?query=Islamic%2520geometric%2520patterns%2520with%2520soft%2520emerald%2520and%2520gold%2520gradient%2520background%252C%2520modern%2520minimalist%2520design%2520with%2520subtle%2520mosque%2520silhouette%252C%2520peaceful%2520and%2520serene%2520atmosphere%252C%2520perfect%2520for%2520Islamic%2520knowledge%2520platform%2520registration%2520page%252C%2520high%2520quality%2520digital%2520art%2520with%2520elegant%2520details&width=720&height=1024&seq=10&orientation=portrait" 
            alt="Islamic knowledge platform" 
            className="w-full h-full object-cover object-top"
          />
          <div className={`absolute inset-0 ${darkMode ? 'bg-gray-900/50' : 'bg-white/30'}`}></div>
          <div className="absolute inset-0 flex flex-col justify-center items-center p-12">
            <h2 className="text-3xl font-bold mb-6 text-center text-white drop-shadow-lg">Begin Your Journey of Islamic Knowledge</h2>
            <div className="bg-white/90 dark:bg-gray-800/90 p-6 rounded-xl shadow-lg max-w-md">
              <h3 className="text-xl font-semibold mb-4 text-emerald-700 dark:text-emerald-400">Membership Benefits</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-emerald-600 mt-1 mr-3"></i>
                  <span>Access to complete Risale-i Nur collection</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-emerald-600 mt-1 mr-3"></i>
                  <span>Personalized daily knowledge feed</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-emerald-600 mt-1 mr-3"></i>
                  <span>Save and organize favorites</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-emerald-600 mt-1 mr-3"></i>
                  <span>Join community discussions</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-emerald-600 mt-1 mr-3"></i>
                  <span>Track reading progress</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Side - Registration Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
          <div className={`max-w-md w-full p-8 rounded-xl shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold mb-2">Create Your Account</h1>
              <p className="text-gray-500 dark:text-gray-400">Join our community of knowledge seekers</p>
            </div>

            {/* Social Media Sign Up */}
            <div className="mb-6">
              <div className="grid grid-cols-3 gap-3">
                <button className={`flex justify-center items-center py-2 px-4 border ${darkMode ? 'border-gray-600 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-50'} rounded-lg transition-colors cursor-pointer !rounded-button whitespace-nowrap`}>
                  <i className="fab fa-google text-red-500"></i>
                </button>
                <button className={`flex justify-center items-center py-2 px-4 border ${darkMode ? 'border-gray-600 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-50'} rounded-lg transition-colors cursor-pointer !rounded-button whitespace-nowrap`}>
                  <i className="fab fa-facebook-f text-blue-600"></i>
                </button>
                <button className={`flex justify-center items-center py-2 px-4 border ${darkMode ? 'border-gray-600 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-50'} rounded-lg transition-colors cursor-pointer !rounded-button whitespace-nowrap`}>
                  <i className="fab fa-apple text-gray-800 dark:text-white"></i>
                </button>
              </div>
            </div>

            <div className="flex items-center my-6">
              <div className="flex-grow h-px bg-gray-300 dark:bg-gray-600"></div>
              <span className="px-4 text-sm text-gray-500 dark:text-gray-400">or continue with email</span>
              <div className="flex-grow h-px bg-gray-300 dark:bg-gray-600"></div>
            </div>

            {/* Registration Form */}
            <form>
              <div className="space-y-4">
                {/* Full Name */}
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium mb-1">Full Name</label>
                  <div className={`relative rounded-lg border ${darkMode ? 'border-gray-600 focus-within:border-emerald-500' : 'border-gray-300 focus-within:border-emerald-500'}`}>
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <i className="fas fa-user text-gray-400"></i>
                    </div>
                    <input
                      type="text"
                      id="fullName"
                      className={`block w-full pl-10 pr-3 py-2 rounded-lg focus:outline-none ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
                      placeholder="Your full name"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">Email Address</label>
                  <div className={`relative rounded-lg border ${darkMode ? 'border-gray-600 focus-within:border-emerald-500' : 'border-gray-300 focus-within:border-emerald-500'}`}>
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <i className="fas fa-envelope text-gray-400"></i>
                    </div>
                    <input
                      type="email"
                      id="email"
                      className={`block w-full pl-10 pr-3 py-2 rounded-lg focus:outline-none ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
                  <div className={`relative rounded-lg border ${darkMode ? 'border-gray-600 focus-within:border-emerald-500' : 'border-gray-300 focus-within:border-emerald-500'}`}>
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <i className="fas fa-lock text-gray-400"></i>
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      className={`block w-full pl-10 pr-10 py-2 rounded-lg focus:outline-none ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
                      placeholder="Create a strong password"
                      value={password}
                      onChange={handlePasswordChange}
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-gray-400 hover:text-gray-500 cursor-pointer !rounded-button whitespace-nowrap"
                      >
                        <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                      </button>
                    </div>
                  </div>
                  
                  {/* Password Strength Indicator */}
                  {password && (
                    <div className="mt-2">
                      <div className="flex h-1 overflow-hidden rounded bg-gray-200 dark:bg-gray-700">
                        <div 
                          className={`${
                            passwordStrength === 0 ? 'bg-red-500' : 
                            passwordStrength === 1 ? 'bg-orange-500' : 
                            passwordStrength === 2 ? 'bg-yellow-500' : 
                            passwordStrength === 3 ? 'bg-blue-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${(passwordStrength / 4) * 100}%` }}
                        ></div>
                      </div>
                      <p className="text-xs mt-1 text-gray-500 dark:text-gray-400">
                        {passwordStrength === 0 && 'Very weak'}
                        {passwordStrength === 1 && 'Weak'}
                        {passwordStrength === 2 && 'Fair'}
                        {passwordStrength === 3 && 'Good'}
                        {passwordStrength === 4 && 'Strong'}
                      </p>
                    </div>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">Confirm Password</label>
                  <div className={`relative rounded-lg border ${darkMode ? 'border-gray-600 focus-within:border-emerald-500' : 'border-gray-300 focus-within:border-emerald-500'}`}>
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <i className="fas fa-lock text-gray-400"></i>
                    </div>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      className={`block w-full pl-10 pr-10 py-2 rounded-lg focus:outline-none ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
                      placeholder="Confirm your password"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="text-gray-400 hover:text-gray-500 cursor-pointer !rounded-button whitespace-nowrap"
                      >
                        <i className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      type="checkbox"
                      className="h-4 w-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="terms" className="font-medium text-gray-700 dark:text-gray-300">
                      I agree to the <a href="#" className="text-emerald-600 hover:text-emerald-500">Terms of Service</a> and <a href="#" className="text-emerald-600 hover:text-emerald-500">Privacy Policy</a>
                    </label>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-lg transition-colors duration-200 font-medium cursor-pointer !rounded-button whitespace-nowrap"
                >
                  Create Account
                </button>
              </div>
            </form>

            {/* Login Link */}
            <div className="text-center mt-6">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Already have an account?{' '}
                <a 
                  href="https://readdy.ai/home/48016c2a-6837-4c39-9ad5-e2db5b0b0864/7dc0d66c-3923-4584-8a84-3ae567bfef21" 
                  data-readdy="true"
                  className="text-emerald-600 hover:text-emerald-500 font-medium"
                >
                  Log in
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className={`py-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <a 
              href="https://readdy.ai/home/48016c2a-6837-4c39-9ad5-e2db5b0b0864/7dc0d66c-3923-4584-8a84-3ae567bfef21" 
              data-readdy="true"
              className="flex items-center space-x-2"
            >
              <i className="fas fa-mosque text-emerald-600 text-xl"></i>
              <span className="text-lg font-semibold">Nur Web</span>
            </a>
          </div>
          
          <div className="flex space-x-6">
            <a href="#" className="text-sm text-gray-500 hover:text-emerald-600 cursor-pointer !rounded-button whitespace-nowrap">Privacy Policy</a>
            <a href="#" className="text-sm text-gray-500 hover:text-emerald-600 cursor-pointer !rounded-button whitespace-nowrap">Terms of Service</a>
            <a href="#" className="text-sm text-gray-500 hover:text-emerald-600 cursor-pointer !rounded-button whitespace-nowrap">Contact Us</a>
          </div>
          
          <div className="flex items-center mt-4 md:mt-0">
            <span className="text-sm text-gray-500">© 2025 Nur Web. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default App;
