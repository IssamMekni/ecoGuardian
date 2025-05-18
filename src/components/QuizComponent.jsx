import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle, XCircle } from 'lucide-react';

const QuizComponent = () => {
  // Sample quiz data - you would replace this with your actual quiz data
  const quizData = {
    quizName: "Geography Quiz",
    quizQuestion: "What is the capital of Algeria?",
    options: ["Oran", "Constantine", "Algiers", "Annaba"],
    answer: 2, // Index of the correct answer (Algiers)
    moreDescription: "Algiers is the capital and largest city of Algeria. Located along the Mediterranean coast, it is an important political, economic, and cultural center."
  };
  

  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleOptionSelect = (index) => {
    setSelectedOption(index);
  };

  const handleSubmit = () => {
    if (selectedOption !== null) {
      setIsCorrect(selectedOption === quizData.answer);
      setIsSubmitted(true);
    }
  };

  const handleReset = () => {
    setSelectedOption(null);
    setIsSubmitted(false);
    setIsCorrect(false);
  };

  return (
    <div className="flex justify-center w-full">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="bg-slate-50 dark:bg-slate-800 border-b">
          <CardTitle className="text-xl font-bold">{quizData.quizName}</CardTitle>
          <CardDescription>Test your knowledge</CardDescription>
        </CardHeader>
        
        <CardContent className="pt-6 pb-4">
          <div className="mb-6 text-lg font-medium">{quizData.quizQuestion}</div>
          
          <RadioGroup 
            value={selectedOption !== null ? selectedOption.toString() : undefined} 
            className="space-y-3 grid grid-cols-2 "
          >
            {quizData.options.map((option, index) => (
              <div 
                key={index} 
                className={`flex items-center space-x-2 p-3 rounded-md border ${
                  isSubmitted && index === quizData.answer 
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/20' 
                    : isSubmitted && index === selectedOption 
                      ? index !== quizData.answer 
                        ? 'border-red-500 bg-red-50 dark:bg-red-900/20' 
                        : '' 
                      : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <RadioGroupItem
                  value={index.toString()}
                  id={`option-${index}`}
                  disabled={isSubmitted}
                  onClick={() => handleOptionSelect(index)}
                />
                <Label 
                  htmlFor={`option-${index}`}
                  className="flex-grow cursor-pointer font-normal"
                >
                  {option}
                </Label>
                {isSubmitted && index === quizData.answer && (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                )}
                {isSubmitted && index === selectedOption && index !== quizData.answer && (
                  <XCircle className="h-5 w-5 text-red-500" />
                )}
              </div>
            ))}
          </RadioGroup>
          
          {isSubmitted && (
            <Alert className={`mt-6 ${isCorrect ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800' : 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800'}`}>
              <AlertTitle className={`${isCorrect ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>
                {isCorrect ? "Correct!" : "Incorrect!"}
              </AlertTitle>
              <AlertDescription className="text-sm mt-1">
                {quizData.moreDescription}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
        
        <CardFooter className="border-t bg-slate-50 dark:bg-slate-800 flex justify-end gap-3">
          {isSubmitted ? (
            <Button 
              onClick={handleReset}
              variant="outline"
            >
              Try Again
            </Button>
          ) : (
            <Button 
              onClick={handleSubmit}
              disabled={selectedOption === null}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Submit Answer
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default QuizComponent;