import { Car, Building2, Utensils, Tv2, Hotel } from 'lucide-react';

export const questions = [
    {
        name: "Transportation",
        question: [
            {
                question: "What type of transportation was used for the event?",
                note: "Select the primary mode of transportation used",
                placeholder: "Select transportation type",
                type: "select",
                options: [
                    { text: "Electric Vehicle", value: 0.05 },
                    { text: "Hybrid Vehicle", value: 0.1 },
                    { text: "Gasoline Vehicle", value: 0.2 },
                    { text: "Diesel Bus", value: 0.06 },
                    { text: "Electric Train", value: 0.03 }
                ]
            },
            {
                question: "What was the total distance traveled (in km)?",
                note: "Enter the round-trip distance",
                placeholder: "Enter distance in kilometers",
                type: "number",
                valuePerEach: 0.1 // Example valuePerEach added here
            }
        ],
        extra: {
            icon: <Car size={20} />,
            bg: "hover:bg-blue-500 bg-blue-500 ",
            class: "text-blue-500 bg-blue-500/10",
            input: "focus-visible:ring-blue-500 data-[state=checked]:bg-blue-500",
            withBr: "bg-blue-500/5 border border-blue-500 ",
        }
    },
    {
        name: "Venue Energy Usage",
        question: [
            {
                question: "What type of venue was used?",
                note: "Select the venue type to calculate energy consumption",
                placeholder: "Select venue type",
                type: "select",
                options: [
                    { text: "Small Conference Room", value: 5 },
                    { text: "Large Conference Hall", value: 15 },
                    { text: "Stadium", value: 50 },
                    { text: "Outdoor Venue", value: 2 }
                ]
            },
            {
                question: "Duration of the event (in hours)",
                note: "Enter the total duration including setup and teardown",
                placeholder: "Enter hours",
                type: "number",
                valuePerEach: 1.5 // Example valuePerEach added here
            }
        ],
        extra: {
            icon: <Building2 size={20} />,
            bg: "hover:bg-green-500 bg-green-500",
            class: "text-green-500 bg-green-500/10",
            input: "focus-visible:ring-green-500 data-[state=checked]:bg-green-500",
            withBr: "bg-green-500/5 border border-green-500 "
        }
    },
    {
        name: "Catering & Waste",
        question: [
            {
                question: "What types of meals were served?",
                note: "Select all types of meals provided",
                placeholder: "Select meal types",
                type: "mutli-select",
                options: [
                    { text: "Vegetarian Meal", value: 0.5 },
                    { text: "Meat-based Meal", value: 2.5 },
                    { text: "Seafood Meal", value: 1.8 },
                    { text: "Vegan Meal", value: 0.3 }
                ]
            },
            {
                question: "Number of attendees",
                note: "Enter the total number of participants",
                placeholder: "Enter number of people",
                type: "number",
                valuePerEach: 2 // Example valuePerEach added here
            }
        ],
        extra: {
            icon: <Utensils size={20} />,
            bg: "hover:bg-yellow-500 bg-yellow-500",
            class: "text-yellow-500 bg-yellow-500/10",
            input: "focus-visible:ring-yellow-500 data-[state=checked]:bg-yellow-500",
            withBr: "bg-yellow-500/5 border border-yellow-500 "
        }
    },
    {
        name: "Equipment & Materials",
        question: [
            {
                question: "What type of equipment was used?",
                note: "Select all equipment used during the event",
                placeholder: "Select equipment types",
                type: "mutli-select",
                options: [
                    { text: "Audio System", value: 0.8 },
                    { text: "Lighting System", value: 1.2 },
                    { text: "Video Projectors", value: 0.5 },
                    { text: "Computers/Laptops", value: 0.3 },
                    { text: "Stage Equipment", value: 0.7 }
                ]
            },
            {
                question: "What materials were used?",
                note: "Select all materials used for the event",
                placeholder: "Select materials",
                type: "mutli-select",
                options: [
                    { text: "Paper Materials", value: 0.1 },
                    { text: "Plastic Materials", value: 0.4 },
                    { text: "Biodegradable Materials", value: 0.05 },
                    { text: "Signage and Banners", value: 0.3 }
                ]
            }
        ],
        extra: {
            icon: <Tv2 size={20} />,
            bg: "hover:bg-purple-500 bg-purple-500",
            class: "text-purple-500 bg-purple-500/10",
            input: "focus-visible:ring-purple-500 data-[state=checked]:bg-purple-500",
            withBr: "bg-purple-500/5 border border-purple-500 "
        }
    },
    {
        name: "Accommodation",
        question: [
            {
                question: "What type of accommodation was used?",
                note: "Select the type of accommodation for attendees",
                placeholder: "Select accommodation type",
                type: "select",
                options: [
                    { text: "Eco-certified Hotel", value: 15 },
                    { text: "Standard Hotel", value: 30 },
                    { text: "Luxury Hotel", value: 45 },
                    { text: "No Accommodation", value: 0 }
                ]
            },
            {
                question: "Number of nights",
                note: "Enter the average number of nights stayed",
                placeholder: "Enter number of nights",
                type: "number",
                valuePerEach: 5 // Example valuePerEach added here
            }
        ],
        extra: {
            icon: <Hotel size={20} />,
            bg: "hover:bg-red-500 bg-red-500",
            class: "text-red-500 bg-red-500/10",
            input: "focus-visible:ring-red-500 data-[state=checked]:bg-red-500",
            withBr: "bg-red-500/5 border border-red-500 "
        }
    }
];