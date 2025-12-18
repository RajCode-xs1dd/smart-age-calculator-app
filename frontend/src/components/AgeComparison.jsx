import React, { useState } from 'react';
import { Users, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { toast } from '../hooks/use-toast';

const AgeComparison = () => {
  const [yourDate, setYourDate] = useState('');
  const [friendDate, setFriendDate] = useState('');
  const [comparison, setComparison] = useState(null);

  const compareAges = () => {
    if (!yourDate || !friendDate) {
      toast({
        title: "Missing Information",
        description: "Please enter both birth dates.",
        variant: "destructive"
      });
      return;
    }

    const date1 = new Date(yourDate);
    const date2 = new Date(friendDate);
    const now = new Date();

    if (date1 > now || date2 > now) {
      toast({
        title: "Invalid Date",
        description: "Birth dates cannot be in the future.",
        variant: "destructive"
      });
      return;
    }

    const diffMs = Math.abs(date1 - date2);
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    // Calculate years, months, days difference
    const older = date1 < date2 ? date1 : date2;
    const younger = date1 < date2 ? date2 : date1;
    const isYouOlder = date1 < date2;

    let years = younger.getFullYear() - older.getFullYear();
    let months = younger.getMonth() - older.getMonth();
    let days = younger.getDate() - older.getDate();

    if (days < 0) {
      const prevMonth = new Date(younger.getFullYear(), younger.getMonth(), 0);
      days += prevMonth.getDate();
      months--;
    }
    if (months < 0) {
      months += 12;
      years--;
    }

    setComparison({
      isYouOlder,
      years,
      months,
      days,
      totalDays,
      yourAge: calculateSimpleAge(date1),
      friendAge: calculateSimpleAge(date2)
    });
  };

  const calculateSimpleAge = (birthDate) => {
    const now = new Date();
    let age = now.getFullYear() - birthDate.getFullYear();
    const monthDiff = now.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-emerald-600" />
            <span>Compare Ages</span>
          </CardTitle>
          <CardDescription>Find out who's older and by how much</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="yourdate" className="text-lg">Your Birth Date</Label>
              <Input
                id="yourdate"
                type="date"
                value={yourDate}
                onChange={(e) => setYourDate(e.target.value)}
                max={new Date().toISOString().split('T')[0]}
                className="text-lg"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="frienddate" className="text-lg">Friend's Birth Date</Label>
              <Input
                id="frienddate"
                type="date"
                value={friendDate}
                onChange={(e) => setFriendDate(e.target.value)}
                max={new Date().toISOString().split('T')[0]}
                className="text-lg"
              />
            </div>
          </div>
          <Button
            onClick={compareAges}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white transition-all duration-200"
            size="lg"
          >
            Compare Ages
          </Button>
        </CardContent>
      </Card>

      {comparison && (
        <Card className="shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-500">
          <CardHeader>
            <CardTitle>Comparison Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Age Display */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-6 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg text-center">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Your Age</div>
                <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                  {comparison.yourAge} years
                </div>
              </div>
              <div className="p-6 bg-teal-50 dark:bg-teal-900/20 rounded-lg text-center">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Friend's Age</div>
                <div className="text-3xl font-bold text-teal-600 dark:text-teal-400">
                  {comparison.friendAge} years
                </div>
              </div>
            </div>

            {/* Comparison Result */}
            <div className="p-6 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg text-center">
              <div className="text-2xl font-bold mb-4">
                {comparison.years === 0 && comparison.months === 0 && comparison.days === 0 ? (
                  "You were born on the same day!"
                ) : (
                  <>
                    {comparison.isYouOlder ? "You are" : "Your friend is"}{" "}
                    {comparison.years > 0 && `${comparison.years} year${comparison.years > 1 ? 's' : ''}`}
                    {comparison.years > 0 && comparison.months > 0 && " "}
                    {comparison.months > 0 && `${comparison.months} month${comparison.months > 1 ? 's' : ''}`}
                    {(comparison.years > 0 || comparison.months > 0) && comparison.days > 0 && " "}
                    {comparison.days > 0 && `${comparison.days} day${comparison.days > 1 ? 's' : ''}`}
                    {" "}{comparison.isYouOlder ? "older" : "younger"}
                  </>
                )}
              </div>
              <div className="text-lg opacity-90">
                Total difference: {comparison.totalDays.toLocaleString()} days
              </div>
            </div>

            {/* Visual Timeline */}
            <div className="relative pt-8">
              <div className="flex items-center justify-between">
                <div className="text-center flex-1">
                  <div className="w-16 h-16 mx-auto bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-xl mb-2">
                    {comparison.isYouOlder ? "1" : "2"}
                  </div>
                  <div className="font-semibold text-gray-700 dark:text-gray-300">
                    {comparison.isYouOlder ? "You" : "Friend"}
                  </div>
                  <div className="text-sm text-gray-500">
                    {comparison.isYouOlder ? yourDate : friendDate}
                  </div>
                </div>
                <ArrowRight className="w-8 h-8 text-gray-400 mx-4" />
                <div className="text-center flex-1">
                  <div className="w-16 h-16 mx-auto bg-teal-500 rounded-full flex items-center justify-center text-white font-bold text-xl mb-2">
                    {comparison.isYouOlder ? "2" : "1"}
                  </div>
                  <div className="font-semibold text-gray-700 dark:text-gray-300">
                    {comparison.isYouOlder ? "Friend" : "You"}
                  </div>
                  <div className="text-sm text-gray-500">
                    {comparison.isYouOlder ? friendDate : yourDate}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AgeComparison;