import React, { useState, useEffect } from 'react';
import { Activity, Heart, Coffee, Calendar, Globe, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';

const LifeStats = ({ ageData }) => {
  const [stats, setStats] = useState(null);
  const [yearProgress, setYearProgress] = useState(0);

  useEffect(() => {
    if (ageData && ageData.birthDate) {
      calculateStats(ageData);
    }
  }, [ageData]);

  useEffect(() => {
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const endOfYear = new Date(now.getFullYear() + 1, 0, 1);
    const progress = ((now - startOfYear) / (endOfYear - startOfYear)) * 100;
    setYearProgress(progress);
  }, []);

  const calculateStats = (data) => {
    const totalDays = data.totalDays || 0;
    const totalHours = data.totalHours || 0;
    const totalMinutes = data.totalMinutes || 0;

    const totalWeeks = Math.floor(totalDays / 7);
    const totalMondays = Math.floor(totalWeeks);
    
    // Average heart rate: 70 bpm
    const heartbeats = totalMinutes * 70;
    
    // Average meals: 3 per day
    const mealsEaten = totalDays * 3;
    
    // Earth orbits
    const earthOrbits = data.years || 0;
    
    // Average sleep: 8 hours per day
    const hoursSlept = totalDays * 8;
    
    // Breaths: ~20 per minute
    const breathsTaken = totalMinutes * 20;

    // Life expectancy progress (assuming 80 years)
    const lifeExpectancy = 80;
    const lifeProgress = ((data.years || 0) / lifeExpectancy) * 100;

    setStats({
      totalWeeks: totalWeeks.toLocaleString(),
      totalMondays: totalMondays.toLocaleString(),
      heartbeats: heartbeats.toLocaleString(),
      mealsEaten: mealsEaten.toLocaleString(),
      earthOrbits: earthOrbits.toLocaleString(),
      hoursSlept: hoursSlept.toLocaleString(),
      breathsTaken: breathsTaken.toLocaleString(),
      lifeProgress: Math.min(lifeProgress, 100).toFixed(1),
      lifeExpectancy
    });
  };

  if (!ageData || !stats) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-lg">
          <CardContent className="py-16 text-center">
            <Activity className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              Calculate your age first to see fascinating life statistics
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Time Lived Stats */}
      <Card className="shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-500">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-emerald-600" />
            <span>Time You've Lived</span>
          </CardTitle>
          <CardDescription>Breaking down your life into different time units</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
              <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                {stats.totalWeeks}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Weeks</div>
            </div>
            <div className="p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg">
              <div className="text-2xl font-bold text-teal-600 dark:text-teal-400">
                {ageData.totalDays.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Days</div>
            </div>
            <div className="p-4 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg">
              <div className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">
                {ageData.totalHours.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Hours</div>
            </div>
            <div className="p-4 bg-sky-50 dark:bg-sky-900/20 rounded-lg">
              <div className="text-2xl font-bold text-sky-600 dark:text-sky-400">
                {ageData.totalMinutes.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Minutes</div>
            </div>
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {ageData.totalSeconds.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Seconds</div>
            </div>
            <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
              <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                {stats.totalMondays}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Mondays</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Fun Facts */}
      <Card className="shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-700">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Heart className="w-5 h-5 text-pink-500" />
            <span>Fascinating Life Facts</span>
          </CardTitle>
          <CardDescription>Interesting statistics about your life journey</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-pink-50 dark:bg-pink-900/20 rounded-lg hover:scale-105 transition-transform duration-200">
              <div className="flex items-center space-x-3">
                <Heart className="w-6 h-6 text-pink-500" />
                <span className="font-medium text-gray-700 dark:text-gray-300">Approximate Heartbeats</span>
              </div>
              <div className="text-xl font-bold text-pink-600 dark:text-pink-400">
                {stats.heartbeats}
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg hover:scale-105 transition-transform duration-200">
              <div className="flex items-center space-x-3">
                <Coffee className="w-6 h-6 text-orange-500" />
                <span className="font-medium text-gray-700 dark:text-gray-300">Meals Eaten</span>
              </div>
              <div className="text-xl font-bold text-orange-600 dark:text-orange-400">
                {stats.mealsEaten}
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:scale-105 transition-transform duration-200">
              <div className="flex items-center space-x-3">
                <Globe className="w-6 h-6 text-blue-500" />
                <span className="font-medium text-gray-700 dark:text-gray-300">Earth Orbits Completed</span>
              </div>
              <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
                {stats.earthOrbits}
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:scale-105 transition-transform duration-200">
              <div className="flex items-center space-x-3">
                <Activity className="w-6 h-6 text-purple-500" />
                <span className="font-medium text-gray-700 dark:text-gray-300">Breaths Taken</span>
              </div>
              <div className="text-xl font-bold text-purple-600 dark:text-purple-400">
                {stats.breathsTaken}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progress Indicators */}
      <Card className="shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-900">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-emerald-600" />
            <span>Progress Indicators</span>
          </CardTitle>
          <CardDescription>Track your journey through time</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Current Year Progress</span>
              <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                {yearProgress.toFixed(1)}%
              </span>
            </div>
            <Progress value={yearProgress} className="h-3" />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Life Expectancy Progress (Based on {stats.lifeExpectancy} years)
              </span>
              <span className="text-sm font-bold text-teal-600 dark:text-teal-400">
                {stats.lifeProgress}%
              </span>
            </div>
            <Progress value={parseFloat(stats.lifeProgress)} className="h-3" />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              This is based on average life expectancy and is for fun purposes only
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LifeStats;