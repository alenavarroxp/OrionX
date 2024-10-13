import { useEffect, useState } from "react";
import { geminiAPI } from "../api/gemini";

export default function ButtonIA() {
    const [text, setText] = useState<string | undefined>("");

    useEffect(() => {
        const fetchResponse = async () => {
            const prompt = "Generate a unique and intriguing question I could ask AI about techologies, no more than 20 words it is important.";
            try {
                const response = await geminiAPI(prompt);
                setText(response);
            } catch (error) {
                console.error("Error fetching response:", error);
            }
        };
        setTimeout(() => {
            fetchResponse();
        }, 2000);
    }, []);

    return (<>
        {text && <div className="bg-gradient-to-r from-sky-600 to-blue-700 w-fit h-fit p-2 rounded-xl text-white">{text}</div>}
    </>

    )
}
