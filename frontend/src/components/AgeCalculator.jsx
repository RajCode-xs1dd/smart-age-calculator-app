import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Gift, Cake } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { toast } from '../hooks/use-toast';

const AgeCalculator = ({ onCalculate }) => {
  const [birthDate, setBirthDate] = useState('');
  const [age, setAge] = useState(null);
  const [liveSeconds, setLiveSeconds] = useState(0);
  const [nextBirthdayCountdown, setNextBirthdayCountdown] = useState(null);

  useEffect(() => {
    if (age) {
      const interval = setInterval(() => {
        calculateAge(birthDate, true);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [age, birthDate]);

  const calculateAge = (dateStr, isLiveUpdate = false) => {
    if (!dateStr) return;

    const birth = new Date(dateStr);
    const now = new Date();

    if (birth > now) {
      if (!isLiveUpdate) {
        toast({
          title: "Invalid Date",
          description: "Birth date cannot be in the future.",
          variant: "destructive"
        });
      }
      return;
    }

    // Calculate exact age
    let years = now.getFullYear() - birth.getFullYear();
    let months = now.getMonth() - birth.getMonth();
    let days = now.getDate() - birth.getDate();
    let hours = now.getHours() - birth.getHours();
    let minutes = now.getMinutes() - birth.getMinutes();
    let seconds = now.getSeconds() - birth.getSeconds();

    if (seconds < 0) {
      seconds += 60;
      minutes--;
    }
    if (minutes < 0) {
      minutes += 60;
      hours--;
    }
    if (hours < 0) {
      hours += 24;
      days--;
    }
    if (days < 0) {
      const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += prevMonth.getDate();
      months--;
    }
    if (months < 0) {
      months += 12;
      years--;
    }

    // Calculate next birthday
    const nextBirthday = new Date(now.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBirthday < now) {
      nextBirthday.setFullYear(now.getFullYear() + 1);
    }

    const diffMs = nextBirthday - now;
    const daysUntil = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hoursUntil = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutesUntil = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const secondsUntil = Math.floor((diffMs % (1000 * 60)) / 1000);

    const ageData = {
      years,
      months,
      days,
      hours,
      minutes,
      seconds,
      nextBirthday: {
        days: daysUntil,
        hours: hoursUntil,
        minutes: minutesUntil,
        seconds: secondsUntil
      },
      totalDays: Math.floor((now - birth) / (1000 * 60 * 60 * 24)),
      totalHours: Math.floor((now - birth) / (1000 * 60 * 60)),
      totalMinutes: Math.floor((now - birth) / (1000 * 60)),
      totalSeconds: Math.floor((now - birth) / 1000),
      birthDate: birth
    };

    setAge(ageData);
    setLiveSeconds(ageData.seconds);
    setNextBirthdayCountdown(ageData.nextBirthday);

    if (onCalculate && !isLiveUpdate) {
      onCalculate(ageData);
      // Save to localStorage
      localStorage.setItem('lastBirthDate', dateStr);
    }
  };

  const handleCalculate = () => {
    if (!birthDate) {
      toast({
        title: "Missing Information",
        description: "Please enter your birth date.",
        variant: "destructive"
      });
      return;
    }
    calculateAge(birthDate);
  };

  useEffect(() => {
    const saved = localStorage.getItem('lastBirthDate');
    if (saved) {
      setBirthDate(saved);
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-emerald-600" />
            <span>Enter Your Birth Date</span>
          </CardTitle>
          <CardDescription>Calculate your exact age with precision</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="birthdate">Birth Date</Label>
            <Input
              id="birthdate"
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              max={new Date().toISOString().split('T')[0]}
              className="text-lg"
            />
          </div>
          <Button
            onClick={handleCalculate}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white transition-all duration-200"
            size="lg"
          >
            Calculate Age
          </Button>
        </CardContent>
      </Card>

      {age && (
        <>
          <Card className="shadow-lg bg-gradient-to-r from-emerald-500 to-teal-500 text-white animate-in fade-in slide-in-from-bottom-4 duration-500">
            <CardHeader>
              <CardTitle className="text-2xl">Your Exact Age</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
                  <div className="text-4xl font-bold">{age.years}</div>
                  <div className="text-sm opacity-90">Years</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
                  <div className="text-4xl font-bold">{age.months}</div>
                  <div className="text-sm opacity-90">Months</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
                  <div className="text-4xl font-bold">{age.days}</div>
                  <div className="text-sm opacity-90">Days</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
                  <div className="text-4xl font-bold">{age.hours}</div>
                  <div className="text-sm opacity-90">Hours</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
                  <div className="text-4xl font-bold">{age.minutes}</div>
                  <div className="text-sm opacity-90">Minutes</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
                  <div className="text-4xl font-bold">{liveSeconds}</div>
                  <div className="text-sm opacity-90">Seconds</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-700">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Gift className="w-5 h-5 text-pink-500" />
                <span>Next Birthday Countdown</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-pink-50 dark:bg-pink-900/20 rounded-lg">
                  <div className="text-3xl font-bold text-pink-600 dark:text-pink-400">
                    {nextBirthdayCountdown?.days || 0}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Days</div>
                </div>
                <div className="text-center p-4 bg-pink-50 dark:bg-pink-900/20 rounded-lg">
                  <div className="text-3xl font-bold text-pink-600 dark:text-pink-400">
                    {nextBirthdayCountdown?.hours || 0}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Hours</div>
                </div>
                <div className="text-center p-4 bg-pink-50 dark:bg-pink-900/20 rounded-lg">
                  <div className="text-3xl font-bold text-pink-600 dark:text-pink-400">
                    {nextBirthdayCountdown?.minutes || 0}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Minutes</div>
                </div>
                <div className="text-center p-4 bg-pink-50 dark:bg-pink-900/20 rounded-lg">
                  <div className="text-3xl font-bold text-pink-600 dark:text-pink-400">
                    {nextBirthdayCountdown?.seconds || 0}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Seconds</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default AgeCalculator;