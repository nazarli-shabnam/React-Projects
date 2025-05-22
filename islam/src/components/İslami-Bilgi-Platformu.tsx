// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState } from 'react';
const App: React.FC = () => {
const [activeTab, setActiveTab] = useState('home');
const [darkMode, setDarkMode] = useState(false);
const currentDate = new Date();
const formattedDate = currentDate.toLocaleDateString('en-US', {
weekday: 'long',
year: 'numeric',
month: 'long',
day: 'numeric'
});
// Hijri date calculation (simplified)
const hijriDate = "Shawwal 15, 1446 AH";
// Prayer times (static for demo)
const prayerTimes = {
fajr: "4:32 AM",
dhuhr: "12:15 PM",
asr: "3:45 PM",
maghrib: "7:21 PM",
isha: "8:52 PM"
};
// Daily knowledge content
const dailyKnowledge = {
nurLesson: {
title: "From 'The Words'",
content: "The universe is a book of the Eternally Besought One. Its letters and words point not to themselves but to the essence, attributes and names of another. Yes, they make known another."
},
hadith: {
title: "Sahih Bukhari",
content: "The Prophet (ﷺ) said, 'Religion is sincerity.' We said, 'To whom?' He said, 'To Allah, His Book, His Messenger, the leaders of the Muslims, and their common folk.'"
},
dua: {
title: "Morning Dua",
content: "O Allah, by You we enter the morning and by You we enter the evening, by You we live and by You we die, and to You is the Resurrection."
}
};
return (
<div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'}`}>
{/* Navigation Bar */}
<nav className={`px-6 py-4 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
<div className="max-w-7xl mx-auto flex justify-between items-center">
<div className="flex items-center space-x-2">
<i className="fas fa-mosque text-emerald-600 text-2xl"></i>
<span className="text-xl font-semibold">Nur Web</span>
</div>
<div className="hidden md:flex space-x-8">
<button
onClick={() => setActiveTab('home')}
className={`cursor-pointer whitespace-nowrap ${activeTab === 'home' ? 'text-emerald-600 font-medium' : ''}`}
>
Home
</button>
<button
onClick={() => setActiveTab('risale')}
className={`cursor-pointer whitespace-nowrap ${activeTab === 'risale' ? 'text-emerald-600 font-medium' : ''}`}
>
Risale-i Nur
</button>
<button
onClick={() => setActiveTab('hadith')}
className={`cursor-pointer whitespace-nowrap ${activeTab === 'hadith' ? 'text-emerald-600 font-medium' : ''}`}
>
Hadith
</button>
<button
onClick={() => setActiveTab('quran')}
className={`cursor-pointer whitespace-nowrap ${activeTab === 'quran' ? 'text-emerald-600 font-medium' : ''}`}
>
Qur'an
</button>
<button
onClick={() => setActiveTab('reflections')}
className={`cursor-pointer whitespace-nowrap ${activeTab === 'reflections' ? 'text-emerald-600 font-medium' : ''}`}
>
Reflections
</button>
</div>
<div className="flex items-center space-x-4">
<button className="cursor-pointer !rounded-button whitespace-nowrap">
<i className="fas fa-search text-gray-500"></i>
</button>
<button className="cursor-pointer !rounded-button whitespace-nowrap">
<i className="fas fa-user-circle text-gray-500 text-xl"></i>
</button>
<button
onClick={() => setDarkMode(!darkMode)}
className="cursor-pointer !rounded-button whitespace-nowrap"
>
<i className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'} ${darkMode ? 'text-yellow-400' : 'text-gray-500'}`}></i>
</button>
</div>
</div>
</nav>
{/* Hero Section */}
<section className="relative">
<div className="absolute inset-0 overflow-hidden">
<img
src="https://readdy.ai/api/search-image?query=Islamic%20geometric%20patterns%20with%20soft%20emerald%20and%20blue%20gradient%20background%2C%20modern%20minimalist%20design%20with%20subtle%20mosque%20silhouette%2C%20peaceful%20and%20serene%20atmosphere%2C%20perfect%20for%20Islamic%20knowledge%20platform%2C%20high%20quality%20digital%20art&width=1440&height=500&seq=1&orientation=landscape"
alt="Islamic knowledge platform"
className="w-full h-full object-cover object-top"
/>
<div className={`absolute inset-0 ${darkMode ? 'bg-gray-900/70' : 'bg-white/50'}`}></div>
</div>
<div className="relative max-w-7xl mx-auto px-6 py-20">
<div className="max-w-2xl">
<h1 className="text-4xl md:text-5xl font-bold mb-4">Discover the Wisdom of Islamic Knowledge</h1>
<p className="text-xl mb-8">Explore Risale-i Nur, Hadith collections, and reflect on timeless wisdom in one place.</p>
<div className="flex flex-wrap gap-4">
<button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 cursor-pointer !rounded-button whitespace-nowrap">
Start Exploring
</button>
<button className={`${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-gray-100'} px-6 py-3 rounded-lg font-medium transition-colors duration-200 cursor-pointer !rounded-button whitespace-nowrap`}>
Learn More
</button>
</div>
</div>
</div>
</section>
{/* Main Features Grid */}
<section className="max-w-7xl mx-auto px-6 py-16">
<h2 className="text-3xl font-bold mb-12 text-center">Main Features</h2>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
{/* Risale-i Nur Card */}
<div className={`rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:transform hover:scale-105 cursor-pointer ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
<div className="h-48 overflow-hidden">
<img
src="https://readdy.ai/api/search-image?query=An%20open%20antique%20book%20with%20ornate%20Islamic%20calligraphy%2C%20pages%20glowing%20with%20soft%20light%2C%20peaceful%20emerald%20and%20gold%20tones%2C%20knowledge%20radiating%20from%20the%20pages%2C%20high%20quality%20digital%20art%20with%20subtle%20details&width=400&height=200&seq=2&orientation=landscape"
alt="Risale-i Nur Library"
className="w-full h-full object-cover object-top"
/>
</div>
<div className="p-6">
<div className="flex items-center mb-3">
<i className="fas fa-book text-emerald-600 mr-2"></i>
<h3 className="text-xl font-semibold">Risale-i Nur Library</h3>
</div>
<p className="text-sm mb-4">Access the complete collection of Bediüzzaman Said Nursi's works with translations and commentary.</p>
<button className="text-emerald-600 hover:text-emerald-700 font-medium cursor-pointer !rounded-button whitespace-nowrap">
Explore Library <i className="fas fa-arrow-right ml-1"></i>
</button>
</div>
</div>
{/* Hadith Browser Card */}
<div className={`rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:transform hover:scale-105 cursor-pointer ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
<div className="h-48 overflow-hidden">
<img
src="https://readdy.ai/api/search-image?query=Ancient%20scrolls%20with%20Arabic%20text%20and%20Islamic%20patterns%2C%20soft%20lighting%20illuminating%20the%20wisdom%20contained%20within%2C%20peaceful%20atmosphere%20with%20subtle%20blue%20and%20gold%20tones%2C%20high%20quality%20digital%20art%20with%20detailed%20calligraphy&width=400&height=200&seq=3&orientation=landscape"
alt="Hadith Browser"
className="w-full h-full object-cover object-top"
/>
</div>
<div className="p-6">
<div className="flex items-center mb-3">
<i className="fas fa-scroll text-emerald-600 mr-2"></i>
<h3 className="text-xl font-semibold">Hadith Browser</h3>
</div>
<p className="text-sm mb-4">Search and explore authentic hadith collections categorized by topics and sources.</p>
<button className="text-emerald-600 hover:text-emerald-700 font-medium cursor-pointer !rounded-button whitespace-nowrap">
Browse Hadith <i className="fas fa-arrow-right ml-1"></i>
</button>
</div>
</div>
{/* Daily Knowledge Card */}
<div className={`rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:transform hover:scale-105 cursor-pointer ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
<div className="h-48 overflow-hidden">
<img
src="https://readdy.ai/api/search-image?query=A%20daily%20calendar%20with%20Islamic%20wisdom%20quotes%2C%20surrounded%20by%20soft%20morning%20light%2C%20peaceful%20atmosphere%20with%20gentle%20emerald%20and%20gold%20tones%2C%20a%20cup%20of%20tea%20nearby%2C%20high%20quality%20digital%20art%20with%20subtle%20details%20and%20calming%20colors&width=400&height=200&seq=4&orientation=landscape"
alt="Daily Knowledge"
className="w-full h-full object-cover object-top"
/>
</div>
<div className="p-6">
<div className="flex items-center mb-3">
<i className="fas fa-sun text-emerald-600 mr-2"></i>
<h3 className="text-xl font-semibold">Daily Knowledge</h3>
</div>
<p className="text-sm mb-4">Receive daily Nur lessons, hadith selections, and morning/evening duas.</p>
<button className="text-emerald-600 hover:text-emerald-700 font-medium cursor-pointer !rounded-button whitespace-nowrap">
Today's Wisdom <i className="fas fa-arrow-right ml-1"></i>
</button>
</div>
</div>
{/* Reflections Card */}
<div className={`rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:transform hover:scale-105 cursor-pointer ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
<div className="h-48 overflow-hidden">
<img
src="https://readdy.ai/api/search-image?query=A%20journal%20with%20handwritten%20reflections%20next%20to%20a%20window%20overlooking%20a%20peaceful%20garden%2C%20soft%20natural%20light%2C%20pen%20resting%20on%20open%20pages%2C%20calm%20atmosphere%20with%20subtle%20blue%20and%20emerald%20tones%2C%20high%20quality%20digital%20art%20with%20detailed%20textures&width=400&height=200&seq=5&orientation=landscape"
alt="Reflections & Notes"
className="w-full h-full object-cover object-top"
/>
</div>
<div className="p-6">
<div className="flex items-center mb-3">
<i className="fas fa-pen-fancy text-emerald-600 mr-2"></i>
<h3 className="text-xl font-semibold">Reflections & Notes</h3>
</div>
<p className="text-sm mb-4">Save personal reflections, bookmarks, and share insights with the community.</p>
<button className="text-emerald-600 hover:text-emerald-700 font-medium cursor-pointer !rounded-button whitespace-nowrap">
My Reflections <i className="fas fa-arrow-right ml-1"></i>
</button>
</div>
</div>
</div>
</section>
{/* Daily Knowledge Section */}
<section className={`py-16 ${darkMode ? 'bg-gray-800' : 'bg-emerald-50'}`}>
<div className="max-w-7xl mx-auto px-6">
<h2 className="text-3xl font-bold mb-12 text-center">Today's Knowledge</h2>
<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
{/* Nur Lesson Card */}
<div className={`rounded-xl overflow-hidden shadow-lg ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
<div className="p-6">
<div className="flex items-center mb-4">
<i className="fas fa-book-open text-emerald-600 text-xl mr-3"></i>
<h3 className="text-xl font-semibold">Today's Nur Lesson</h3>
</div>
<h4 className="font-medium text-emerald-600 mb-2">{dailyKnowledge.nurLesson.title}</h4>
<p className="mb-4">{dailyKnowledge.nurLesson.content}</p>
<div className="flex justify-between items-center">
<button className="text-emerald-600 hover:text-emerald-700 font-medium cursor-pointer !rounded-button whitespace-nowrap">
Read More
</button>
<div className="flex space-x-2">
<button className="text-gray-400 hover:text-emerald-600 transition-colors cursor-pointer !rounded-button whitespace-nowrap">
<i className="fas fa-bookmark"></i>
</button>
<button className="text-gray-400 hover:text-emerald-600 transition-colors cursor-pointer !rounded-button whitespace-nowrap">
<i className="fas fa-share-alt"></i>
</button>
</div>
</div>
</div>
</div>
{/* Hadith Card */}
<div className={`rounded-xl overflow-hidden shadow-lg ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
<div className="p-6">
<div className="flex items-center mb-4">
<i className="fas fa-scroll text-emerald-600 text-xl mr-3"></i>
<h3 className="text-xl font-semibold">Today's Hadith</h3>
</div>
<h4 className="font-medium text-emerald-600 mb-2">{dailyKnowledge.hadith.title}</h4>
<p className="mb-4">{dailyKnowledge.hadith.content}</p>
<div className="flex justify-between items-center">
<button className="text-emerald-600 hover:text-emerald-700 font-medium cursor-pointer !rounded-button whitespace-nowrap">
Read More
</button>
<div className="flex space-x-2">
<button className="text-gray-400 hover:text-emerald-600 transition-colors cursor-pointer !rounded-button whitespace-nowrap">
<i className="fas fa-bookmark"></i>
</button>
<button className="text-gray-400 hover:text-emerald-600 transition-colors cursor-pointer !rounded-button whitespace-nowrap">
<i className="fas fa-share-alt"></i>
</button>
</div>
</div>
</div>
</div>
{/* Dua Card */}
<div className={`rounded-xl overflow-hidden shadow-lg ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
<div className="p-6">
<div className="flex items-center mb-4">
<i className="fas fa-hands text-emerald-600 text-xl mr-3"></i>
<h3 className="text-xl font-semibold">Du'a of the Day</h3>
</div>
<h4 className="font-medium text-emerald-600 mb-2">{dailyKnowledge.dua.title}</h4>
<p className="mb-4">{dailyKnowledge.dua.content}</p>
<div className="flex justify-between items-center">
<button className="text-emerald-600 hover:text-emerald-700 font-medium cursor-pointer !rounded-button whitespace-nowrap">
Read More
</button>
<div className="flex space-x-2">
<button className="text-gray-400 hover:text-emerald-600 transition-colors cursor-pointer !rounded-button whitespace-nowrap">
<i className="fas fa-bookmark"></i>
</button>
<button className="text-gray-400 hover:text-emerald-600 transition-colors cursor-pointer !rounded-button whitespace-nowrap">
<i className="fas fa-share-alt"></i>
</button>
</div>
</div>
</div>
</div>
</div>
</div>
</section>
{/* Community Reflections Preview */}
<section className="max-w-7xl mx-auto px-6 py-16">
<div className="flex justify-between items-center mb-8">
<h2 className="text-3xl font-bold">Community Reflections</h2>
<button className="text-emerald-600 hover:text-emerald-700 font-medium cursor-pointer !rounded-button whitespace-nowrap">
View All <i className="fas fa-arrow-right ml-1"></i>
</button>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
{/* Reflection Card 1 */}
<div className={`rounded-xl overflow-hidden shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} p-6`}>
<div className="flex items-start mb-4">
<div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center mr-3">
<i className="fas fa-user text-emerald-600"></i>
</div>
<div>
<h4 className="font-medium">Ahmed S.</h4>
<p className="text-sm text-gray-500">3 days ago</p>
</div>
</div>
<p className="mb-4">"The concept of Divine Unity as explained in 'The Words' has completely transformed my understanding of tawheed. The metaphor of the sun and its reflections helped me grasp how Allah's names are manifested in creation."</p>
<div className="flex items-center text-sm text-gray-500">
<span className="flex items-center mr-4">
<i className="fas fa-heart text-rose-500 mr-1"></i> 24
</span>
<span className="flex items-center">
<i className="fas fa-comment text-gray-400 mr-1"></i> 5
</span>
<span className="ml-auto text-emerald-600">
From: The Words, Tenth Word
</span>
</div>
</div>
{/* Reflection Card 2 */}
<div className={`rounded-xl overflow-hidden shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} p-6`}>
<div className="flex items-start mb-4">
<div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center mr-3">
<i className="fas fa-user text-emerald-600"></i>
</div>
<div>
<h4 className="font-medium">Fatima K.</h4>
<p className="text-sm text-gray-500">1 week ago</p>
</div>
</div>
<p className="mb-4">"I've been struggling with patience during difficult times, but the hadith about Allah loving those who show patience has been a constant reminder. The commentary helped me understand that patience isn't passive acceptance but active trust in Allah's wisdom."</p>
<div className="flex items-center text-sm text-gray-500">
<span className="flex items-center mr-4">
<i className="fas fa-heart text-rose-500 mr-1"></i> 42
</span>
<span className="flex items-center">
<i className="fas fa-comment text-gray-400 mr-1"></i> 8
</span>
<span className="ml-auto text-emerald-600">
From: Sahih Bukhari, Book of Patience
</span>
</div>
</div>
{/* Reflection Card 3 */}
<div className={`rounded-xl overflow-hidden shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} p-6`}>
<div className="flex items-start mb-4">
<div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center mr-3">
<i className="fas fa-user text-emerald-600"></i>
</div>
<div>
<h4 className="font-medium">Omar H.</h4>
<p className="text-sm text-gray-500">2 days ago</p>
</div>
</div>
<p className="mb-4">"The Twenty-Third Flash on nature has completely changed how I view the natural world. I now see every leaf, flower, and creature as a letter from the Divine, pointing to the Creator rather than to themselves. This perspective brings such peace."</p>
<div className="flex items-center text-sm text-gray-500">
<span className="flex items-center mr-4">
<i className="fas fa-heart text-rose-500 mr-1"></i> 18
</span>
<span className="flex items-center">
<i className="fas fa-comment text-gray-400 mr-1"></i> 3
</span>
<span className="ml-auto text-emerald-600">
From: The Flashes, Twenty-Third Flash
</span>
</div>
</div>
</div>
</section>
{/* Call to Action */}
<section className={`py-16 ${darkMode ? 'bg-gray-800' : 'bg-emerald-50'}`}>
<div className="max-w-4xl mx-auto px-6 text-center">
<h2 className="text-3xl font-bold mb-6">Begin Your Journey of Knowledge</h2>
<p className="text-lg mb-8 max-w-2xl mx-auto">Join thousands of seekers exploring the depths of Islamic wisdom through Risale-i Nur, authentic Hadith, and meaningful reflection.</p>
<a href="https://readdy.ai/home/48016c2a-6837-4c39-9ad5-e2db5b0b0864/fd8246a9-6c88-4367-a922-7eaa7cadbb1f" data-readdy="true">
  <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 cursor-pointer !rounded-button whitespace-nowrap">
    Create Free Account
  </button>
</a>
</div>
</section>
{/* Footer */}
<footer className={`py-12 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
<div className="max-w-7xl mx-auto px-6">
<div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
<div>
<div className="flex items-center space-x-2 mb-4">
<i className="fas fa-mosque text-emerald-600 text-2xl"></i>
<span className="text-xl font-semibold">Nur Web</span>
</div>
<p className="text-sm mb-4">An Islamic knowledge platform combining Risale-i Nur, Hadith collections, and tools for reflection.</p>
<div className="flex space-x-4">
<a href="#" className="text-gray-500 hover:text-emerald-600 cursor-pointer !rounded-button whitespace-nowrap">
<i className="fab fa-facebook-f"></i>
</a>
<a href="#" className="text-gray-500 hover:text-emerald-600 cursor-pointer !rounded-button whitespace-nowrap">
<i className="fab fa-twitter"></i>
</a>
<a href="#" className="text-gray-500 hover:text-emerald-600 cursor-pointer !rounded-button whitespace-nowrap">
<i className="fab fa-instagram"></i>
</a>
<a href="#" className="text-gray-500 hover:text-emerald-600 cursor-pointer !rounded-button whitespace-nowrap">
<i className="fab fa-youtube"></i>
</a>
</div>
</div>
<div>
<h4 className="font-semibold mb-4">Resources</h4>
<ul className="space-y-2">
<li><a href="#" className="text-gray-500 hover:text-emerald-600 cursor-pointer !rounded-button whitespace-nowrap">Risale-i Nur Collection</a></li>
<li><a href="#" className="text-gray-500 hover:text-emerald-600 cursor-pointer !rounded-button whitespace-nowrap">Hadith Collections</a></li>
<li><a href="#" className="text-gray-500 hover:text-emerald-600 cursor-pointer !rounded-button whitespace-nowrap">Qur'an Studies</a></li>
<li><a href="#" className="text-gray-500 hover:text-emerald-600 cursor-pointer !rounded-button whitespace-nowrap">Islamic Articles</a></li>
<li><a href="#" className="text-gray-500 hover:text-emerald-600 cursor-pointer !rounded-button whitespace-nowrap">Audio Lectures</a></li>
</ul>
</div>
<div>
<h4 className="font-semibold mb-4">Community</h4>
<ul className="space-y-2">
<li><a href="#" className="text-gray-500 hover:text-emerald-600 cursor-pointer !rounded-button whitespace-nowrap">Discussion Forums</a></li>
<li><a href="#" className="text-gray-500 hover:text-emerald-600 cursor-pointer !rounded-button whitespace-nowrap">Study Circles</a></li>
<li><a href="#" className="text-gray-500 hover:text-emerald-600 cursor-pointer !rounded-button whitespace-nowrap">Events Calendar</a></li>
<li><a href="#" className="text-gray-500 hover:text-emerald-600 cursor-pointer !rounded-button whitespace-nowrap">Volunteer</a></li>
<li><a href="#" className="text-gray-500 hover:text-emerald-600 cursor-pointer !rounded-button whitespace-nowrap">Donate</a></li>
</ul>
</div>
<div>
<h4 className="font-semibold mb-4">About</h4>
<ul className="space-y-2">
<li><a href="#" className="text-gray-500 hover:text-emerald-600 cursor-pointer !rounded-button whitespace-nowrap">Our Mission</a></li>
<li><a href="#" className="text-gray-500 hover:text-emerald-600 cursor-pointer !rounded-button whitespace-nowrap">Team</a></li>
<li><a href="#" className="text-gray-500 hover:text-emerald-600 cursor-pointer !rounded-button whitespace-nowrap">Contact Us</a></li>
<li><a href="#" className="text-gray-500 hover:text-emerald-600 cursor-pointer !rounded-button whitespace-nowrap">Privacy Policy</a></li>
<li><a href="#" className="text-gray-500 hover:text-emerald-600 cursor-pointer !rounded-button whitespace-nowrap">Terms of Service</a></li>
</ul>
</div>
</div>
<div className="pt-8 border-t border-gray-300 flex flex-col md:flex-row justify-between items-center">
<p className="text-sm text-gray-500 mb-4 md:mb-0">© 2025 Nur Web. All rights reserved.</p>
<div className="flex items-center space-x-4">
<span className="text-sm text-gray-500">{formattedDate}</span>
<span className="text-sm text-gray-500">|</span>
<span className="text-sm text-gray-500">{hijriDate}</span>
</div>
</div>
</div>
</footer>
{/* Utility Bar */}
<div className={`fixed bottom-0 left-0 right-0 z-10 py-2 px-4 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
<div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center">
<div className="flex items-center space-x-4">
<span className="text-sm font-medium">Prayer Times:</span>
<span className="text-xs px-2 py-1 rounded-full bg-emerald-100 text-emerald-800">Fajr: {prayerTimes.fajr}</span>
<span className="text-xs px-2 py-1 rounded-full bg-emerald-100 text-emerald-800">Dhuhr: {prayerTimes.dhuhr}</span>
<span className="text-xs px-2 py-1 rounded-full bg-emerald-100 text-emerald-800">Asr: {prayerTimes.asr}</span>
<span className="text-xs px-2 py-1 rounded-full bg-emerald-100 text-emerald-800">Maghrib: {prayerTimes.maghrib}</span>
<span className="text-xs px-2 py-1 rounded-full bg-emerald-100 text-emerald-800">Isha: {prayerTimes.isha}</span>
</div>
<div className="flex items-center space-x-4 mt-2 md:mt-0">
<button className="flex items-center text-xs cursor-pointer !rounded-button whitespace-nowrap">
<i className="fas fa-compass text-emerald-600 mr-1"></i> Qibla Direction
</button>
<button className="flex items-center text-xs cursor-pointer !rounded-button whitespace-nowrap">
<i className="fas fa-calendar-alt text-emerald-600 mr-1"></i> {hijriDate}
</button>
<button
onClick={() => setDarkMode(!darkMode)}
className="flex items-center text-xs cursor-pointer !rounded-button whitespace-nowrap"
>
<i className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'} ${darkMode ? 'text-yellow-400' : 'text-emerald-600'} mr-1`}></i>
{darkMode ? 'Light Mode' : 'Dark Mode'}
</button>
</div>
</div>
</div>
</div>
);
};
export default App