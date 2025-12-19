import React, { useState, useEffect } from 'react';
import './App.css';
import { Calculator, Users, TrendingUp, Moon, Sun } from 'lucide-react';
import AgeCalculator from './components/AgeCalculator';
import AgeComparison from './components/AgeComparison';
import LifeStats from './components/LifeStats';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [ageData, setAgeData] = useState(null);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      {/* Header */}
      <header className="border-b border-emerald-100 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Calculator className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Smart Age Calculator</h1>
          </div>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg bg-emerald-100 dark:bg-gray-700 hover:bg-emerald-200 dark:hover:bg-gray-600 transition-all duration-200"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-gray-700" />
            )}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Calculate Your Age with Precision
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Discover your exact age, compare with friends, and explore fascinating life statistics
        </p>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 pb-16">
        <Tabs defaultValue="calculator" className="w-full">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 mb-8">
            <TabsTrigger value="calculator" className="flex items-center space-x-2">
              <Calculator className="w-4 h-4" />
              <span>Calculator</span>
            </TabsTrigger>
            <TabsTrigger value="comparison" className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Compare</span>
            </TabsTrigger>
            <TabsTrigger value="stats" className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4" />
              <span>Life Stats</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calculator">
            <AgeCalculator onCalculate={setAgeData} />
          </TabsContent>

          <TabsContent value="comparison">
            <AgeComparison />
          </TabsContent>

          <TabsContent value="stats">
            <LifeStats ageData={ageData} />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer>
        <p>Made with ❤️ by <strong>RajCode</strong></p>
        <div class="social-icons">
          <a href="https://github.com/RajCode-xs1dd" target="_blank"><i class="fab fa-github"></i></a>
          <a href="https://facebook.com" target="_blank"><i class="fab fa-facebook"></i></a>
          <a href="https://instagram.com" target="_blank"><i class="fab fa-instagram"></i></a>
          <a href="https://linkedin.com" target="_blank"><i class="fab fa-linkedin"></i></a>
        </div>
        <p>© <span id="year"></span> Smart Age Calculator. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;