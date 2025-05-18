"use client"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { questions } from "@/lib/data/question"
import Catgeory from "@/components/editor/catgeory"


export default function page() {

    const [selectedScene, setSelectedScene] = useState(0)
    const [answers, setAnswers] = useState<any>([])
    const [showResults, setShowResults] = useState(false)


    const handleInputChange = (idCategory: any, idQuestion: any, value: any) => {
        setAnswers((prev: any) => {
            const updated = [...prev]
            const index = updated.findIndex(
                (answer) => answer.idCategory === idCategory && answer.idQuestion === idQuestion
            )
            if (index !== -1) {
                updated[index].value = value
            } else {
                updated.push({ idCategory, idQuestion, value })
            }
            return updated
        })
    }



    const handleStartOver = () => {
        setShowResults(false)
        setSelectedScene(0)
        setAnswers([])
    }


    if (showResults) {
        const carbonFootprint: any = getRecommendationsAndValue(questions, answers)
        const recommendations = []

        return (
            <div className="min-h-screen w-full bg-background flex flex-col">
                <div className={cn(
                    "flex-1 w-full overflow-auto bg-gradient-to-b from-emerald-500 to-emerald-600"
                )}>
                    <div className="container mx-auto px-4 py-6 md:py-10">
                        <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-sm rounded-lg shadow-lg p-6 md:p-10">
                            <h1 className="text-3xl font-bold text-white mb-6 text-center">Your Carbon Footprint Results</h1>

                            <div className="bg-white/20 rounded-lg p-6 mb-8">
                                <div className="text-center">
                                    <p className="text-lg text-white mb-2">Your Estimated Annual Carbon Footprint</p>
                                    <p className="text-5xl font-bold text-white mb-2">{carbonFootprint.reduce((acc: any, item: any) => acc + item.value, 0).toFixed(2)}</p>
                                    <p className="text-white/80">Metric Tons CO2e/year</p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-xl font-semibold text-white mb-4">Category Breakdown</h2>
                                    <div className="space-y-3">
                                        {questions.map((category, index) => (
                                            <div key={index} className="bg-white/10 rounded-lg p-4">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-white">{category.name}</span>
                                                    <span className="text-white font-semibold">
                                                        {carbonFootprint[index].value.toFixed(2)} MT
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
 
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navigation Buttons */}
                <div className="sticky bottom-0 w-full bg-background/80 backdrop-blur-sm p-4 shadow-lg">
                    <div className="container mx-auto max-w-3xl flex justify-between gap-4">

                        <button
                            onClick={handleStartOver}
                            className="px-6 py-2 rounded-lg font-semibold transition-all duration-200 bg-emerald-500 text-white hover:bg-emerald-600 w-full"
                        >
                            Start Over
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="flex-1 w-full  bg-background flex flex-col overflow-auto pb-10 p-4">
            <div className="w-full lg:mt-10">
                <div className="w-full p-3 md:p-5 overflow-auto">
                    <div className="mx-auto items-center justify-center flex flex-wrap gap-4 md:gap-3 border w-max p-2 rounded-full bg-muted/20">
                        {questions.map((v, index) => (
                            <div key={index} onClick={() => setSelectedScene(index)} className="cursor-pointer">
                                <div className={cn(
                                    "flex items-center  rounded-full gap-2   px-3 py-2 text-sm font-semibold transition-all duration-200 hover:opacity-80",
                                    selectedScene === index ? v.extra.class : "text-foreground/80"
                                )}>
                                    {v.extra.icon}
                                    {v.name}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Catgeory {...{ questions, answers, selectedScene, handleInputChange, setShowResults, setSelectedScene }} />
            <div className={cn("h-16 w-2/3 -translate-x-1/2 rounded-full blur-3xl opacity-40 pointer-events-none ease-in-out duration-700 left-1/2 absolute  bottom-0 ", questions[selectedScene].extra.bg)} />

            <div className="text-yellow-500 bg-yellow-500/5 hidden" />
            <div className="text-red-500 bg-red-500/5 hidden" />
            <div className="text-blue-500 bg-blue-500/5 hidden" />
            <div className="text-purple-500 bg-purple-500/5 hidden" />
            <div className="text-green-500 bg-green-500/5 hidden" />
            <div className="text-yellow-500 bg-yellow-500/30 hidden" />
            <div className="text-red-500 bg-red-500/30 hidden" />
            <div className="text-blue-500 bg-blue-500/30 hidden" />
            <div className="text-purple-500 bg-purple-500/30 hidden" />
            <div className="text-green-500 bg-green-500/30 hidden" />
            <div className="text-yellow-500 bg-yellow-500/10 hidden" />
            <div className="text-red-500 bg-red-500/10 hidden" />
            <div className="text-blue-500 bg-blue-500/10 hidden" />
            <div className="text-purple-500 bg-purple-500/10 hidden" />
            <div className="text-green-500 bg-green-500/10 hidden" />
            <div className="focus-visible:ring-yellow-500  hidden data-[state=checked]:bg-yellow-500" />
            <div className="focus-visible:ring-green-500  hidden data-[state=checked]:bg-green-500" />
            <div className="focus-visible:ring-red-500  hidden data-[state=checked]:bg-red-500" />
            <div className="focus-visible:ring-blue-500  hidden data-[state=checked]:bg-blue-500" />
            <div className="focus-visible:ring-purple-500  hidden data-[state=checked]:bg-purple-500" />

        </div>
    )
}


function getRecommendationsAndValue(questions: any, answers: any) {
    return questions.map((category: any) => {
        const categoryAnswers = answers.filter((answer: any) => answer.idCategory === category.name);
        let totalValue = 0;

        categoryAnswers.forEach((answer: any) => {
            const question = category.question.find((q: any) => q.question === answer.idQuestion);
            if (question) {
                if (question.type === 'select' && answer.value.select !== undefined) {
                    const selectedOption = question.options.find((option: any) => option.value === answer.value.select);
                    totalValue += selectedOption.value;
                }
                if (question.type === 'number' && answer.value.number !== undefined) {
                    totalValue += answer.value.number * question.valuePerEach;
                }
                if (question.type === 'mutli-select' && Array.isArray(answer.value.mutliSelect)) {
                    answer.value.mutliSelect.forEach((val: any) => {
                        const selectedOption = question.options.find((option: any) => option.value === val);
                        if (selectedOption) {
                            totalValue += selectedOption.value;
                        }
                    });
                }
            }
        });

        return {
            value: totalValue,
        };
    });
}