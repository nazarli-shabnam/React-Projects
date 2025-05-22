// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState } from 'react';
const App: React.FC = () => {
const [darkMode, setDarkMode] = useState(false);
const [activeTab, setActiveTab] = useState('hadith');
const [activeCollection, setActiveCollection] = useState('all');
const [activeCategory, setActiveCategory] = useState('all');
const [viewMode, setViewMode] = useState('grid');
const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
const [currentPage, setCurrentPage] = useState(1);
const [bookmarkedHadiths, setBookmarkedHadiths] = useState<number[]>([]);
const [searchQuery, setSearchQuery] = useState('');
const [authenticityFilter, setAuthenticityFilter] = useState('all');
const [narratorFilter, setNarratorFilter] = useState('all');
const [fontSize, setFontSize] = useState('medium');
const [showSidebar, setShowSidebar] = useState(true);
const [showShareDialog, setShowShareDialog] = useState(false);
const [selectedHadithForShare, setSelectedHadithForShare] = useState<number | null>(null);
const [shareNote, setShareNote] = useState('');
// Hijri date calculation (simplified)
const hijriDate = "Shawwal 15, 1446 AH";
const handleShare = (hadithId: number) => {
setSelectedHadithForShare(hadithId);
setShowShareDialog(true);
setShareNote('');
};
const handleShareAction = (platform: string) => {
const hadith = hadiths.find(h => h.id === selectedHadithForShare);
if (!hadith) return;
const shareText = `${hadith.translation}\n\n${shareNote ? `${shareNote}\n\n` : ''}`;
const shareUrl = `https://nurweb.com/hadith/${hadith.id}`;
switch (platform) {
case 'facebook':
window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`);
break;
case 'twitter':
window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`);
break;
case 'whatsapp':
window.open(`https://wa.me/?text=${encodeURIComponent(shareText + shareUrl)}`);
break;
case 'email':
window.open(`mailto:?subject=Shared Hadith&body=${encodeURIComponent(shareText + shareUrl)}`);
break;
case 'copy':
navigator.clipboard.writeText(shareText + shareUrl);
// You can add a toast notification here
break;
}
setShowShareDialog(false);
};
// Prayer times (static for demo)
const prayerTimes = {
fajr: "4:32 AM",
dhuhr: "12:15 PM",
asr: "3:45 PM",
maghrib: "7:21 PM",
isha: "8:52 PM"
};
// Sample hadith data
const hadiths = [
{
id: 1,
collection: "Sahih Bukhari",
book: "Book of Faith",
chapter: "The saying of the Prophet: 'Religion is sincerity'",
number: "57",
arabic: "عَنْ تَمِيمٍ الدَّارِيِّ أَنَّ النَّبِيَّ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ قَالَ الدِّينُ النَّصِيحَةُ قُلْنَا لِمَنْ قَالَ لِلَّهِ وَلِكِتَابِهِ وَلِرَسُولِهِ وَلِأَئِمَّةِ الْمُسْلِمِينَ وَعَامَّتِهِمْ",
translation: "Tamim al-Dari reported: The Prophet, peace and blessings be upon him, said, 'Religion is sincerity.' We said, 'To whom?' The Prophet said, 'To Allah, His Book, His Messenger, the leaders of the Muslims, and their common people.'",
narrator: "Tamim al-Dari",
authenticity: "Sahih",
topics: ["Faith", "Sincerity", "Community"],
explanation: "This hadith emphasizes that the essence of religion is sincerity in all matters. This sincerity should be directed towards Allah by believing in Him, avoiding disbelief in Him, and attributing to Him what He deserves. Sincerity to His Book means believing in it, acting upon it, and reciting it properly. Sincerity to His Messenger means affirming his prophethood, obeying his commands, and avoiding what he prohibited. Sincerity to the leaders of Muslims means obeying them in obedience to Allah, helping them in truth, and reminding them with gentleness. Sincerity to the common Muslims means guiding them to their best interests, helping them in religious and worldly matters, and desiring for them what one desires for oneself."
},
{
id: 2,
collection: "Sahih Muslim",
book: "Book of Faith",
chapter: "Clarifying that Islam is built upon five pillars",
number: "16",
arabic: "عَنْ ابْنِ عُمَرَ رَضِيَ اللَّهُ عَنْهُمَا قَالَ قَالَ رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ بُنِيَ الْإِسْلَامُ عَلَى خَمْسٍ شَهَادَةِ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَأَنَّ مُحَمَّدًا رَسُولُ اللَّهِ وَإِقَامِ الصَّلَاةِ وَإِيتَاءِ الزَّكَاةِ وَالْحَجِّ وَصَوْمِ رَمَضَانَ",
translation: "Ibn Umar reported: The Messenger of Allah, peace and blessings be upon him, said, 'Islam is built upon five: the testimony that there is no god but Allah and Muhammad is the Messenger of Allah, establishing prayer, giving charity, performing pilgrimage, and fasting the month of Ramadan.'",
narrator: "Ibn Umar",
authenticity: "Sahih",
topics: ["Faith", "Pillars of Islam"],
explanation: "This hadith outlines the five fundamental pillars upon which the religion of Islam is built. These pillars represent the core practices and beliefs that every Muslim must adhere to. The first pillar is the declaration of faith, acknowledging the oneness of Allah and the prophethood of Muhammad. The second is the establishment of regular prayer, which serves as a direct connection between the worshipper and Allah. The third is giving zakat (charity), which purifies wealth and helps those in need. The fourth is performing the Hajj pilgrimage to Mecca, which unites Muslims from around the world in worship. The fifth is fasting during the month of Ramadan, which develops self-discipline and God-consciousness."
},
{
id: 3,
collection: "Sunan Abu Dawud",
book: "Book of Prayer",
chapter: "On the virtue of prayer at its proper time",
number: "427",
arabic: "عَنْ عَبْدِ اللَّهِ بْنِ مَسْعُودٍ رَضِيَ اللَّهُ عَنْهُ قَالَ سَأَلْتُ النَّبِيَّ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ أَيُّ الْعَمَلِ أَحَبُّ إِلَى اللَّهِ قَالَ الصَّلَاةُ عَلَى وَقْتِهَا قُلْتُ ثُمَّ أَيٌّ قَالَ بِرُّ الْوَالِدَيْنِ قُلْتُ ثُمَّ أَيٌّ قَالَ الْجِهَادُ فِي سَبِيلِ اللَّهِ",
translation: "Abdullah ibn Mas'ud reported: I asked the Prophet, peace and blessings be upon him, 'Which deed is most beloved to Allah?' The Prophet said, 'Prayer at its proper time.' I said, 'Then what?' The Prophet said, 'Honoring one's parents.' I said, 'Then what?' The Prophet said, 'Jihad in the way of Allah.'",
narrator: "Abdullah ibn Mas'ud",
authenticity: "Hasan",
topics: ["Prayer", "Parents", "Jihad"],
explanation: "This hadith highlights the importance of prayer performed at its prescribed time as the most beloved deed to Allah. This emphasizes the significance of punctuality in worship and making prayer a priority in one's life. The second most beloved deed is honoring and being dutiful to one's parents, which shows the high status Islam gives to parents and family relationships. The third is striving in the way of Allah, which includes all forms of struggle to establish truth and justice. This hadith provides guidance on prioritizing good deeds in our lives."
},
{
id: 4,
collection: "Jami at-Tirmidhi",
book: "Book of Righteousness and Maintaining Good Relations with Relatives",
chapter: "What has been related about compassion towards people",
number: "1924",
arabic: "عَنْ عَبْدِ اللَّهِ بْنِ عَمْرٍو رَضِيَ اللَّهُ عَنْهُمَا أَنَّ رَسُولَ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ قَالَ الرَّاحِمُونَ يَرْحَمُهُمْ الرَّحْمَنُ ارْحَمُوا مَنْ فِي الْأَرْضِ يَرْحَمْكُمْ مَنْ فِي السَّمَاءِ",
translation: "Abdullah ibn Amr reported: The Messenger of Allah, peace and blessings be upon him, said, 'The merciful will be shown mercy by the Most Merciful. Be merciful to those on the earth and the One in the heavens will have mercy upon you.'",
narrator: "Abdullah ibn Amr",
authenticity: "Sahih",
topics: ["Mercy", "Compassion", "Divine Reward"],
explanation: "This hadith teaches the importance of showing mercy and compassion to all of Allah's creation. It establishes a direct relationship between how we treat others and how Allah will treat us. The mercy mentioned here is comprehensive and includes kindness, forgiveness, empathy, and compassion towards humans, animals, and all living beings. This hadith encourages Muslims to develop a merciful character, as mercy is one of the most emphasized attributes of Allah in the Quran. By showing mercy to others, we align ourselves with divine values and open ourselves to receiving Allah's infinite mercy."
},
{
id: 5,
collection: "Sahih Bukhari",
book: "Book of Knowledge",
chapter: "The virtue of knowledge",
number: "79",
arabic: "عَنْ مُعَاوِيَةَ رَضِيَ اللَّهُ عَنْهُ قَالَ قَالَ رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ مَنْ يُرِدْ اللَّهُ بِهِ خَيْرًا يُفَقِّهْهُ فِي الدِّينِ",
translation: "Mu'awiyah reported: The Messenger of Allah, peace and blessings be upon him, said, 'When Allah wants to do good for someone, He gives him understanding of the religion.'",
narrator: "Mu'awiyah",
authenticity: "Sahih",
topics: ["Knowledge", "Understanding", "Divine Favor"],
explanation: "This hadith highlights the importance of religious knowledge and understanding in Islam. It indicates that when Allah intends good for a person, He guides them to gain a deep understanding of the religion. This understanding goes beyond mere memorization of texts to comprehending the wisdom, purposes, and applications of Islamic teachings. The hadith encourages Muslims to seek knowledge as it is a sign of Allah's favor and a path to goodness. It also implies that those who have been blessed with religious understanding have a responsibility to act upon their knowledge and share it with others."
},
{
id: 6,
collection: "Sahih Muslim",
book: "Book of Virtue, Good Manners, and Joining of the Ties of Kinship",
chapter: "The prohibition of envy",
number: "2564",
arabic: "عَنْ أَبِي هُرَيْرَةَ رَضِيَ اللَّهُ عَنْهُ أَنَّ رَسُولَ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ قَالَ إِيَّاكُمْ وَالْحَسَدَ فَإِنَّ الْحَسَدَ يَأْكُلُ الْحَسَنَاتِ كَمَا تَأْكُلُ النَّارُ الْحَطَبَ",
translation: "Abu Hurairah reported: The Messenger of Allah, peace and blessings be upon him, said, 'Beware of envy, for envy consumes good deeds just as fire consumes wood.'",
narrator: "Abu Hurairah",
authenticity: "Sahih",
topics: ["Character", "Envy", "Good Deeds"],
explanation: "This hadith warns against the destructive nature of envy (hasad), which is wishing that someone would lose a blessing they have. The comparison to fire consuming wood vividly illustrates how envy can destroy one's good deeds and spiritual progress. Envy is considered particularly harmful because it combines ingratitude for one's own blessings with resentment of Allah's generosity to others. The hadith encourages Muslims to purify their hearts from envy and instead develop contentment with Allah's decree and genuine happiness for others' success. It teaches that spiritual health requires monitoring not just our actions but also our inner attitudes."
}
];
// Font size options
const fontSizeClasses = {
small: 'text-sm',
medium: 'text-base',
large: 'text-lg',
xlarge: 'text-xl'
};
// Toggle bookmark
const toggleBookmark = (id: number) => {
if (bookmarkedHadiths.includes(id)) {
setBookmarkedHadiths(bookmarkedHadiths.filter(hadithId => hadithId !== id));
} else {
setBookmarkedHadiths([...bookmarkedHadiths, id]);
}
};
// Filter hadiths based on search and filters
const filteredHadiths = hadiths.filter(hadith => {
const matchesSearch = searchQuery === '' ||
hadith.translation.toLowerCase().includes(searchQuery.toLowerCase()) ||
hadith.arabic.includes(searchQuery) ||
hadith.narrator.toLowerCase().includes(searchQuery.toLowerCase());
const matchesCollection = activeCollection === 'all' || hadith.collection === activeCollection;
const matchesCategory = activeCategory === 'all' || hadith.topics.some(topic => topic.toLowerCase() === activeCategory.toLowerCase());
const matchesAuthenticity = authenticityFilter === 'all' || hadith.authenticity === authenticityFilter;
const matchesNarrator = narratorFilter === 'all' || hadith.narrator === narratorFilter;
return matchesSearch && matchesCollection && matchesCategory && matchesAuthenticity && matchesNarrator;
});
// Get unique collections, topics, narrators, and authenticity ratings for filters
const collections = [...new Set(hadiths.map(hadith => hadith.collection))];
const topics = [...new Set(hadiths.flatMap(hadith => hadith.topics))];
const narrators = [...new Set(hadiths.map(hadith => hadith.narrator))];
const authenticityRatings = [...new Set(hadiths.map(hadith => hadith.authenticity))];
// Pagination
const itemsPerPage = 3;
const totalPages = Math.ceil(filteredHadiths.length / itemsPerPage);
const paginatedHadiths = filteredHadiths.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
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
{/* Hadith Browser Header */}
<div className={`py-8 ${darkMode ? 'bg-gray-800' : 'bg-emerald-50'}`}>
<div className="max-w-7xl mx-auto px-6">
<div className="flex items-center mb-4">
<a
href="https://readdy.ai/home/48016c2a-6837-4c39-9ad5-e2db5b0b0864/7dc0d66c-3923-4584-8a84-3ae567bfef21"
data-readdy="true"
className="text-emerald-600 hover:text-emerald-700 mr-3 cursor-pointer !rounded-button whitespace-nowrap"
>
<i className="fas fa-arrow-left"></i> Back to Home
</a>
</div>
<h1 className="text-3xl md:text-4xl font-bold mb-2">Hadith Browser</h1>
<p className="text-lg mb-6">Search and explore authentic hadith collections from trusted sources</p>
{/* Search and Filter Bar */}
<div className={`p-6 rounded-xl shadow-md ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
<div className="flex flex-col md:flex-row gap-4">
{/* Search Input */}
<div className="flex-grow">
<div className={`flex items-center px-4 py-2 rounded-lg border ${darkMode ? 'border-gray-600 bg-gray-800' : 'border-gray-300'}`}>
<i className="fas fa-search text-gray-400 mr-2"></i>
<input
type="text"
placeholder="Search hadith by text, narrator, or keywords..."
className={`w-full border-none focus:outline-none ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}
value={searchQuery}
onChange={(e) => setSearchQuery(e.target.value)}
/>
</div>
</div>
{/* Collection Filter */}
<div className="relative w-full md:w-64">
<div className={`flex items-center justify-between px-4 py-2 rounded-lg border cursor-pointer ${darkMode ? 'border-gray-600 bg-gray-800' : 'border-gray-300'}`}>
<span className={`${activeCollection === 'all' ? 'text-gray-500' : ''}`}>
{activeCollection === 'all' ? 'All Collections' : activeCollection}
</span>
<i className="fas fa-chevron-down text-gray-400"></i>
</div>
<div className={`absolute z-10 mt-1 w-full rounded-md shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} hidden group-hover:block`}>
<div className="py-1">
<button
onClick={() => setActiveCollection('all')}
className={`block px-4 py-2 text-sm w-full text-left ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} cursor-pointer !rounded-button whitespace-nowrap`}
>
All Collections
</button>
{collections.map((collection) => (
<button
key={collection}
onClick={() => setActiveCollection(collection)}
className={`block px-4 py-2 text-sm w-full text-left ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} cursor-pointer !rounded-button whitespace-nowrap`}
>
{collection}
</button>
))}
</div>
</div>
</div>
{/* Category Filter */}
<div className="relative w-full md:w-64">
<div className={`flex items-center justify-between px-4 py-2 rounded-lg border cursor-pointer ${darkMode ? 'border-gray-600 bg-gray-800' : 'border-gray-300'}`}>
<span className={`${activeCategory === 'all' ? 'text-gray-500' : ''}`}>
{activeCategory === 'all' ? 'All Categories' : activeCategory}
</span>
<i className="fas fa-chevron-down text-gray-400"></i>
</div>
<div className={`absolute z-10 mt-1 w-full rounded-md shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} hidden group-hover:block`}>
<div className="py-1">
<button
onClick={() => setActiveCategory('all')}
className={`block px-4 py-2 text-sm w-full text-left ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} cursor-pointer !rounded-button whitespace-nowrap`}
>
All Categories
</button>
{topics.map((topic) => (
<button
key={topic}
onClick={() => setActiveCategory(topic)}
className={`block px-4 py-2 text-sm w-full text-left ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} cursor-pointer !rounded-button whitespace-nowrap`}
>
{topic}
</button>
))}
</div>
</div>
</div>
{/* Advanced Filters Button */}
<button
onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
className={`px-4 py-2 rounded-lg border flex items-center justify-center ${darkMode ? 'border-gray-600 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-100'} cursor-pointer !rounded-button whitespace-nowrap`}
>
<i className={`fas fa-sliders-h mr-2 ${showAdvancedFilters ? 'text-emerald-600' : 'text-gray-500'}`}></i>
Advanced Filters
</button>
</div>
{/* Advanced Filters Section */}
{showAdvancedFilters && (
<div className={`mt-4 pt-4 border-t ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
{/* Authenticity Filter */}
<div>
<label className="block text-sm font-medium mb-2">Authenticity</label>
<div className="flex flex-wrap gap-2">
<button
onClick={() => setAuthenticityFilter('all')}
className={`px-3 py-1 rounded-full text-sm ${authenticityFilter === 'all' ? 'bg-emerald-600 text-white' : darkMode ? 'bg-gray-700' : 'bg-gray-200'} cursor-pointer !rounded-button whitespace-nowrap`}
>
All
</button>
{authenticityRatings.map((rating) => (
<button
key={rating}
onClick={() => setAuthenticityFilter(rating)}
className={`px-3 py-1 rounded-full text-sm ${authenticityFilter === rating ? 'bg-emerald-600 text-white' : darkMode ? 'bg-gray-700' : 'bg-gray-200'} cursor-pointer !rounded-button whitespace-nowrap`}
>
{rating}
</button>
))}
</div>
</div>
{/* Narrator Filter */}
<div>
<label className="block text-sm font-medium mb-2">Narrator</label>
<select
value={narratorFilter}
onChange={(e) => setNarratorFilter(e.target.value)}
className={`w-full px-3 py-2 rounded-lg border ${darkMode ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300 bg-white'}`}
>
<option value="all">All Narrators</option>
{narrators.map((narrator) => (
<option key={narrator} value={narrator}>{narrator}</option>
))}
</select>
</div>
{/* View Mode */}
<div>
<label className="block text-sm font-medium mb-2">View Mode</label>
<div className="flex space-x-2">
<button
onClick={() => setViewMode('grid')}
className={`px-3 py-2 rounded-lg flex items-center ${viewMode === 'grid' ? 'bg-emerald-600 text-white' : darkMode ? 'bg-gray-700' : 'bg-gray-200'} cursor-pointer !rounded-button whitespace-nowrap`}
>
<i className="fas fa-th-large mr-2"></i> Grid
</button>
<button
onClick={() => setViewMode('list')}
className={`px-3 py-2 rounded-lg flex items-center ${viewMode === 'list' ? 'bg-emerald-600 text-white' : darkMode ? 'bg-gray-700' : 'bg-gray-200'} cursor-pointer !rounded-button whitespace-nowrap`}
>
<i className="fas fa-list mr-2"></i> List
</button>
</div>
</div>
</div>
</div>
)}
</div>
</div>
</div>
{/* Main Content Area */}
<div className="max-w-7xl mx-auto px-6 py-8">
<div className="flex flex-col md:flex-row gap-8">
{/* Sidebar Filters (Desktop) */}
{showSidebar && (
<div className={`w-full md:w-64 shrink-0 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-md p-6 h-fit sticky top-4`}>
<div className="flex justify-between items-center mb-6">
<h3 className="font-semibold">Filters</h3>
<button
onClick={() => setShowSidebar(false)}
className="text-gray-500 hover:text-gray-700 md:hidden cursor-pointer !rounded-button whitespace-nowrap"
>
<i className="fas fa-times"></i>
</button>
</div>
{/* Collections Filter */}
<div className="mb-6">
<h4 className="text-sm font-medium mb-3">Collections</h4>
<div className="space-y-2">
<div className="flex items-center">
<input
type="radio"
id="all-collections"
name="collection"
checked={activeCollection === 'all'}
onChange={() => setActiveCollection('all')}
className="mr-2"
/>
<label htmlFor="all-collections" className="text-sm cursor-pointer">All Collections</label>
</div>
{collections.map((collection) => (
<div key={collection} className="flex items-center">
<input
type="radio"
id={`collection-${collection}`}
name="collection"
checked={activeCollection === collection}
onChange={() => setActiveCollection(collection)}
className="mr-2"
/>
<label htmlFor={`collection-${collection}`} className="text-sm cursor-pointer">{collection}</label>
</div>
))}
</div>
</div>
{/* Topics Filter */}
<div className="mb-6">
<h4 className="text-sm font-medium mb-3">Topics</h4>
<div className="space-y-2">
<div className="flex items-center">
<input
type="radio"
id="all-topics"
name="topic"
checked={activeCategory === 'all'}
onChange={() => setActiveCategory('all')}
className="mr-2"
/>
<label htmlFor="all-topics" className="text-sm cursor-pointer">All Topics</label>
</div>
{topics.map((topic) => (
<div key={topic} className="flex items-center">
<input
type="radio"
id={`topic-${topic}`}
name="topic"
checked={activeCategory === topic}
onChange={() => setActiveCategory(topic)}
className="mr-2"
/>
<label htmlFor={`topic-${topic}`} className="text-sm cursor-pointer">{topic}</label>
</div>
))}
</div>
</div>
{/* Authenticity Filter */}
<div className="mb-6">
<h4 className="text-sm font-medium mb-3">Authenticity</h4>
<div className="space-y-2">
<div className="flex items-center">
<input
type="radio"
id="all-authenticity"
name="authenticity"
checked={authenticityFilter === 'all'}
onChange={() => setAuthenticityFilter('all')}
className="mr-2"
/>
<label htmlFor="all-authenticity" className="text-sm cursor-pointer">All Ratings</label>
</div>
{authenticityRatings.map((rating) => (
<div key={rating} className="flex items-center">
<input
type="radio"
id={`authenticity-${rating}`}
name="authenticity"
checked={authenticityFilter === rating}
onChange={() => setAuthenticityFilter(rating)}
className="mr-2"
/>
<label htmlFor={`authenticity-${rating}`} className="text-sm cursor-pointer">{rating}</label>
</div>
))}
</div>
</div>
{/* Reading Preferences */}
<div>
<h4 className="text-sm font-medium mb-3">Reading Preferences</h4>
<div className="space-y-4">
{/* Font Size */}
<div>
<label className="text-sm block mb-2">Font Size</label>
<div className="flex items-center space-x-2">
<button
onClick={() => setFontSize('small')}
className={`w-8 h-8 flex items-center justify-center rounded-full ${fontSize === 'small' ? 'bg-emerald-600 text-white' : darkMode ? 'bg-gray-700' : 'bg-gray-200'} cursor-pointer !rounded-button whitespace-nowrap`}
>
<i className="fas fa-font text-xs"></i>
</button>
<button
onClick={() => setFontSize('medium')}
className={`w-8 h-8 flex items-center justify-center rounded-full ${fontSize === 'medium' ? 'bg-emerald-600 text-white' : darkMode ? 'bg-gray-700' : 'bg-gray-200'} cursor-pointer !rounded-button whitespace-nowrap`}
>
<i className="fas fa-font"></i>
</button>
<button
onClick={() => setFontSize('large')}
className={`w-8 h-8 flex items-center justify-center rounded-full ${fontSize === 'large' ? 'bg-emerald-600 text-white' : darkMode ? 'bg-gray-700' : 'bg-gray-200'} cursor-pointer !rounded-button whitespace-nowrap`}
>
<i className="fas fa-font text-lg"></i>
</button>
<button
onClick={() => setFontSize('xlarge')}
className={`w-8 h-8 flex items-center justify-center rounded-full ${fontSize === 'xlarge' ? 'bg-emerald-600 text-white' : darkMode ? 'bg-gray-700' : 'bg-gray-200'} cursor-pointer !rounded-button whitespace-nowrap`}
>
<i className="fas fa-font text-xl"></i>
</button>
</div>
</div>
{/* Dark Mode Toggle */}
<div className="flex items-center justify-between">
<span className="text-sm">Dark Mode</span>
<button
onClick={() => setDarkMode(!darkMode)}
className={`w-12 h-6 rounded-full relative ${darkMode ? 'bg-emerald-600' : 'bg-gray-300'} transition-colors duration-200 cursor-pointer !rounded-button whitespace-nowrap`}
>
<span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform duration-200 ${darkMode ? 'translate-x-6' : 'translate-x-1'}`}></span>
</button>
</div>
</div>
</div>
</div>
)}
{/* Main Content */}
<div className="flex-grow">
{/* Results Header */}
<div className="flex justify-between items-center mb-6">
<div>
<h2 className="text-xl font-semibold">Results</h2>
<p className="text-sm text-gray-500">{filteredHadiths.length} hadiths found</p>
</div>
<div className="flex items-center space-x-2">
{!showSidebar && (
<button
onClick={() => setShowSidebar(true)}
className={`px-3 py-2 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} cursor-pointer !rounded-button whitespace-nowrap`}
>
<i className="fas fa-filter"></i>
</button>
)}
<div className={`px-3 py-2 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} border ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}>
<select
className={`border-none bg-transparent focus:outline-none ${darkMode ? 'text-white' : 'text-gray-800'}`}
>
<option value="relevance">Sort by: Relevance</option>
<option value="collection">Sort by: Collection</option>
<option value="authenticity">Sort by: Authenticity</option>
</select>
</div>
</div>
</div>
{/* Hadith Results */}
{paginatedHadiths.length > 0 ? (
<div className={`space-y-6 ${viewMode === 'grid' ? 'md:grid md:grid-cols-2 md:gap-6 md:space-y-0' : ''}`}>
{paginatedHadiths.map((hadith) => (
<div
key={hadith.id}
className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-md overflow-hidden`}
>
{/* Hadith Header */}
<div className={`px-6 py-4 ${darkMode ? 'bg-gray-700' : 'bg-emerald-50'}`}>
<div className="flex justify-between items-start">
<div>
<h3 className="font-semibold">{hadith.collection}</h3>
<p className="text-sm text-gray-500">{hadith.book}, {hadith.chapter}</p>
</div>
<div className="flex items-center space-x-1">
<span className={`px-2 py-1 rounded-full text-xs ${hadith.authenticity === 'Sahih' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
{hadith.authenticity}
</span>
<span className="text-sm text-gray-500">#{hadith.number}</span>
</div>
</div>
</div>
{/* Hadith Content */}
<div className="p-6">
{/* Arabic Text */}
<div className="mb-4 text-right" dir="rtl">
<p className={`${fontSizeClasses[fontSize]} font-arabic leading-loose`}>{hadith.arabic}</p>
</div>
{/* Translation */}
<div className="mb-4">
<p className={`${fontSizeClasses[fontSize]} leading-relaxed`}>{hadith.translation}</p>
</div>
{/* Metadata */}
<div className="flex flex-wrap gap-2 mb-4">
<span className="text-sm text-gray-500">Narrator: {hadith.narrator}</span>
<span className="text-sm text-gray-500">•</span>
<div className="flex flex-wrap gap-1">
{hadith.topics.map((topic, index) => (
<span
key={index}
className={`text-xs px-2 py-1 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
>
{topic}
</span>
))}
</div>
</div>
{/* Action Buttons */}
<div className="flex justify-between items-center">
<button className="text-emerald-600 hover:text-emerald-700 font-medium cursor-pointer !rounded-button whitespace-nowrap">
View Details
</button>
<div className="flex space-x-2">
<button
onClick={() => toggleBookmark(hadith.id)}
className={`w-8 h-8 flex items-center justify-center rounded-full ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} cursor-pointer !rounded-button whitespace-nowrap`}
>
<i className={`${bookmarkedHadiths.includes(hadith.id) ? 'fas text-emerald-600' : 'far'} fa-bookmark`}></i>
</button>
<button className={`w-8 h-8 flex items-center justify-center rounded-full ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} cursor-pointer !rounded-button whitespace-nowrap`}>
<i className="far fa-copy"></i>
</button>
<button
onClick={() => handleShare(hadith.id)}
className={`w-8 h-8 flex items-center justify-center rounded-full ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} cursor-pointer !rounded-button whitespace-nowrap`}
>
<i className="far fa-share-square"></i>
</button>
</div>
</div>
</div>
</div>
))}
</div>
) : (
<div className={`p-8 text-center ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-md`}>
<i className="fas fa-search text-4xl text-gray-400 mb-4"></i>
<h3 className="text-xl font-semibold mb-2">No results found</h3>
<p className="text-gray-500">Try adjusting your search or filters to find what you're looking for.</p>
</div>
)}
{/* Pagination */}
{filteredHadiths.length > 0 && (
<div className="mt-8 flex justify-center">
<div className="flex space-x-2">
<button
onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
disabled={currentPage === 1}
className={`px-3 py-2 rounded-lg ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${darkMode ? 'bg-gray-700' : 'bg-white border border-gray-300'} !rounded-button whitespace-nowrap`}
>
<i className="fas fa-chevron-left"></i>
</button>
{Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
const pageNum = i + 1;
return (
<button
key={i}
onClick={() => setCurrentPage(pageNum)}
className={`w-10 h-10 rounded-lg ${currentPage === pageNum ? `bg-emerald-600 text-white` : darkMode ? 'bg-gray-700' : 'bg-white border border-gray-300'} cursor-pointer !rounded-button whitespace-nowrap`}
>
{pageNum}
</button>
);
})}
{totalPages > 5 && (
<span className="flex items-center px-2">...</span>
)}
{totalPages > 5 && (
<button
onClick={() => setCurrentPage(totalPages)}
className={`w-10 h-10 rounded-lg ${currentPage === totalPages ? `bg-emerald-600 text-white` : darkMode ? 'bg-gray-700' : 'bg-white border border-gray-300'} cursor-pointer !rounded-button whitespace-nowrap`}
>
{totalPages}
</button>
)}
<button
onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
disabled={currentPage === totalPages}
className={`px-3 py-2 rounded-lg ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${darkMode ? 'bg-gray-700' : 'bg-white border border-gray-300'} !rounded-button whitespace-nowrap`}
>
<i className="fas fa-chevron-right"></i>
</button>
</div>
</div>
)}
</div>
</div>
</div>
{/* Features Section */}
<section className={`py-16 ${darkMode ? 'bg-gray-800' : 'bg-emerald-50'}`}>
<div className="max-w-7xl mx-auto px-6">
<h2 className="text-2xl font-bold mb-8 text-center">Hadith Browser Features</h2>
<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
{/* Feature 1 */}
<div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-white'} shadow-md`}>
<div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
<i className="fas fa-search text-emerald-600"></i>
</div>
<h3 className="text-xl font-semibold mb-2">Advanced Search</h3>
<p className="text-gray-500">Search by keywords, narrators, topics, or collections to find exactly what you're looking for.</p>
</div>
{/* Feature 2 */}
<div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-white'} shadow-md`}>
<div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
<i className="fas fa-bookmark text-emerald-600"></i>
</div>
<h3 className="text-xl font-semibold mb-2">Bookmarks & Collections</h3>
<p className="text-gray-500">Save your favorite hadiths and organize them into personal collections for easy reference.</p>
</div>
{/* Feature 3 */}
<div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-white'} shadow-md`}>
<div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
<i className="fas fa-book-open text-emerald-600"></i>
</div>
<h3 className="text-xl font-semibold mb-2">Detailed Explanations</h3>
<p className="text-gray-500">Access scholarly explanations and context for each hadith to deepen your understanding.</p>
</div>
</div>
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
<span className="text-sm text-gray-500">Thursday, May 22, 2025</span>
<span className="text-sm text-gray-500">|</span>
<span className="text-sm text-gray-500">{hijriDate}</span>
</div>
</div>
</div>
{/* Share Dialog */}
{showShareDialog && (
<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
<div className={`w-full max-w-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-xl p-6 m-4`}>
<div className="flex justify-between items-center mb-4">
<h3 className="text-xl font-semibold">Share Hadith</h3>
<button
onClick={() => setShowShareDialog(false)}
className="text-gray-500 hover:text-gray-700"
>
<i className="fas fa-times"></i>
</button>
</div>
{/* Hadith Preview */}
<div className={`p-4 rounded-lg mb-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
<p className="text-sm">
{hadiths.find(h => h.id === selectedHadithForShare)?.translation.slice(0, 150)}...
</p>
</div>
{/* Personal Note */}
<div className="mb-4">
<label className="block text-sm font-medium mb-2">Add a note (optional)</label>
<textarea
value={shareNote}
onChange={(e) => setShareNote(e.target.value)}
className={`w-full p-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
rows={2}
placeholder="Add your thoughts..."
></textarea>
</div>
{/* Share Options */}
<div className="grid grid-cols-2 md:grid-cols-3 gap-3">
<button
onClick={() => handleShareAction('facebook')}
className="flex items-center justify-center p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
>
<i className="fab fa-facebook-f mr-2"></i> Facebook
</button>
<button
onClick={() => handleShareAction('twitter')}
className="flex items-center justify-center p-2 rounded-lg bg-sky-500 text-white hover:bg-sky-600"
>
<i className="fab fa-twitter mr-2"></i> Twitter
</button>
<button
onClick={() => handleShareAction('whatsapp')}
className="flex items-center justify-center p-2 rounded-lg bg-green-500 text-white hover:bg-green-600"
>
<i className="fab fa-whatsapp mr-2"></i> WhatsApp
</button>
<button
onClick={() => handleShareAction('email')}
className="flex items-center justify-center p-2 rounded-lg bg-gray-500 text-white hover:bg-gray-600"
>
<i className="fas fa-envelope mr-2"></i> Email
</button>
<button
onClick={() => handleShareAction('copy')}
className="flex items-center justify-center p-2 rounded-lg bg-gray-500 text-white hover:bg-gray-600"
>
<i className="fas fa-link mr-2"></i> Copy Link
</button>
<button
className="flex items-center justify-center p-2 rounded-lg bg-gray-500 text-white hover:bg-gray-600"
>
<i className="fas fa-image mr-2"></i> Save as Image
</button>
</div>
</div>
</div>
)}
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
{/* Mobile Filter Toggle Button (Fixed) */}
{!showSidebar && (
<button
onClick={() => setShowSidebar(true)}
className={`fixed bottom-20 right-6 w-12 h-12 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-emerald-600'} text-white shadow-lg flex items-center justify-center md:hidden z-20 cursor-pointer !rounded-button whitespace-nowrap`}
>
<i className="fas fa-filter"></i>
</button>
)}
</div>
);
};
export default App