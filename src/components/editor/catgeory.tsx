import { cn } from '@/lib/utils'
import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '../ui/button'
import { ArrowLeft, ArrowRight } from 'lucide-react'

export default function Catgeory({ questions, answers, selectedScene, handleInputChange, setShowResults, setSelectedScene }: any) {

    const isAllSectionsComplete = () => {
        return questions.every((section: any, index: any) => {
            const currentQuestions = section.question
            const currentAnswers = answers.filter(
                (answer: any) => answer.idCategory === section.name
            )

            return currentQuestions.every((question: any) => {
                const answer = currentAnswers.find((a: any) => a.idQuestion === question.question)
                if (!answer) return false

                switch (question.type) {
                    case 'select':
                        return answer.value.select !== ''
                    case 'mutli-select':
                        return answer.value.mutliSelect && answer.value.mutliSelect.length > 0
                    case 'number':
                        return answer.value.number !== null && answer.value.number !== undefined
                    default:
                        return false
                }
            })
        })
    }

    const isCurrentSectionComplete = () => {
        const currentQuestions = questions[selectedScene].question
        const currentAnswers = answers.filter(
            (answer: any) => answer.idCategory === questions[selectedScene].name
        )

        return currentQuestions.every((question: any) => {
            const answer = currentAnswers.find((a: any) => a.idQuestion === question.question)
            if (!answer) return false

            // Check if the answer has a valid value based on its type
            switch (question.type) {
                case 'select':
                    return answer.value.select !== ''
                case 'mutli-select':
                    return answer.value.mutliSelect && answer.value.mutliSelect.length > 0
                case 'number':
                    return answer.value.number !== null && answer.value.number !== undefined
                default:
                    return false
            }
        })
    }

    const countValidAnswers = () => {
        let count = 0

        questions.forEach((scene: any) => {
            const currentQuestions = scene.question
            const currentAnswers = answers.filter((answer: any) => answer.idCategory === scene.name)

            currentQuestions.forEach((question: any) => {
                const answer = currentAnswers.find((a: any) => a.idQuestion === question.question)

                if (!answer) return

                switch (question.type) {
                    case 'select':
                        if (answer.value.select !== '') count++
                        break
                    case 'mutli-select':
                        if (answer.value.mutliSelect && answer.value.mutliSelect.length > 0) count++
                        break
                    case 'number':
                        if (answer.value.number !== null && answer.value.number !== undefined) count++
                        break
                    default:
                        break
                }
            })
        })

        return count
    }

    const handleNext = () => {
        if (selectedScene < questions.length - 1) {
            setSelectedScene(selectedScene + 1)
        } else if (selectedScene === questions.length - 1) {
            setShowResults(true)
        }
    }

    // const handlePrevious = () => {
    //     if (showResults) {
    //         setShowResults(false)
    //     } else if (selectedScene > 0) {
    //         setSelectedScene(selectedScene - 1)
    //     }
    // }

    const totalLength = () => {

        let count = 0
        for (const category in questions) {
            count += questions[category].question.length
        }

        return count
    }

    return (
        <>
            <div className='mb-7 mt-3 h-2 mx-auto w-full max-w-3xl bg-muted/20 rounded-full'>
                <div style={{ width: `${countValidAnswers() / totalLength() * 100}%` }} className={cn("rounded-full h-full ease-in-out duration-700", questions[selectedScene].extra.bg)} />
            </div>
            <div className={cn(questions[selectedScene].extra.withBr, "w-full  max-w-3xl ease-in-out decoration-neutral-700 duration-0  mx-auto backdrop-blur-sm rounded-xl shadow-lg p-6 md:p-10")}>
                <div className={cn(questions[selectedScene].extra.bg, "w-max flex items-center justify-center mb-5 gap-4 rounded-full px-5 py-2")}>
                    {questions[selectedScene].extra.icon}
                    {questions[selectedScene].name}
                </div>
                {questions[selectedScene].question.map((q: any) => (
                    <div key={q.question} className="mb-8">
                        <h1 className="text-lg md:text-xl font-semibold">{q.question}</h1>
                        {q.note && (
                            <p className="text-sm opacity-50 mb-3 italic">{q.note}</p>
                        )}
                        {q.type === "select" && (
                            <Select
                                value={
                                    answers.find(
                                        (answer: any) =>
                                            answer.idCategory === questions[selectedScene].name &&
                                            answer.idQuestion === q.question
                                    )?.value?.select || ''
                                }
                                onValueChange={(value) =>
                                    handleInputChange(
                                        questions[selectedScene].name,
                                        q.question,
                                        { select: value }
                                    )
                                }
                            >
                                <SelectTrigger className={cn("!bg-muted/20 ", questions[selectedScene].extra.input)}>
                                    <SelectValue placeholder={q.placeholder} />
                                </SelectTrigger>
                                <SelectContent>
                                    {q.options?.map((o: any, index: any) => (
                                        <SelectItem key={index} value={o.value}>
                                            {o.text}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}

                        {q.type === "mutli-select" && (
                            <div className="flex flex-wrap gap-3">
                                {q.options?.map((o: any, index: any) => {
                                    const selected = answers.find(
                                        (a: any) =>
                                            a.idCategory === questions[selectedScene].name &&
                                            a.idQuestion === q.question
                                    )?.value?.mutliSelect || []

                                    return (
                                        <Label
                                            key={index}
                                            className="flex items-center gap-2  px-6 py-4 rounded-lg cursor-pointer  transition-all duration-200 hover:bg-muted/40 bg-muted/20"
                                        >
                                            <Checkbox
                                                checked={selected.includes(o.value)}
                                                className={cn("border-muted ", questions[selectedScene].extra.input)}
                                                onCheckedChange={(checked) => {
                                                    if (checked) {
                                                        handleInputChange(
                                                            questions[selectedScene].name,
                                                            q.question,
                                                            { mutliSelect: [...selected, o.value] }
                                                        )
                                                    } else {
                                                        handleInputChange(
                                                            questions[selectedScene].name,
                                                            q.question,
                                                            {
                                                                mutliSelect: selected.filter(
                                                                    (val: any) => val !== o.value
                                                                ),
                                                            }
                                                        )
                                                    }
                                                }}
                                            />
                                            <span>{o.text}</span>
                                        </Label>
                                    )
                                })}
                            </div>
                        )}
                        {q.type === "number" && (
                            <Input
                                min={0}
                                type="number"
                                className={cn("w-full bg-muted/20", questions[selectedScene].extra.input)}
                                placeholder={q.placeholder}
                                value={
                                    answers.find(
                                        (answer: any) =>
                                            answer.idCategory === questions[selectedScene].name &&
                                            answer.idQuestion === q.question
                                    )?.value?.number || 0
                                }
                                onChange={(e) =>
                                    handleInputChange(
                                        questions[selectedScene].name,
                                        q.question,
                                        { number: parseFloat(e.target.value) ? parseFloat(e.target.value) : 0 }
                                    )
                                }
                            />
                        )}
                    </div>
                ))}
            </div>
            <div className='w-full max-w-3xl mx-auto flex flex-row gap-2 my-4'>
                {selectedScene === questions.length - 1 ? (
                    <Button
                        onClick={() => setShowResults(true)}
                        disabled={!isAllSectionsComplete()}
                        className={cn(
                            "px-6 py-2 rounded-lg font-semibold transition-all duration-700 w-full gap-2 hover:gap-6 hover:poin",
                            isAllSectionsComplete() ? questions[selectedScene].extra.bg + " hover:opacity-100 opacity-70 text-white " : questions[selectedScene].extra.bg + "opacity-40 text-white"
                        )}
                    >
                        View Results
                    </Button>
                ) : (
                    <Button
                        onClick={handleNext}
                        disabled={!isCurrentSectionComplete()}
                        className={cn(
                            "px-6 py-2 rounded-lg font-semibold transition-all duration-700 w-full gap-2 hover:gap-6",
                            isCurrentSectionComplete()
                                ? questions[selectedScene].extra.bg + " hover:opacity-100 opacity-70 text-white "
                                : questions[selectedScene].extra.bg + "opacity-40 text-white"
                        )}
                    >
                        Next
                        <ArrowRight size={20} />
                    </Button>
                )}
            </div>
        </>
    )
}


/*

*/