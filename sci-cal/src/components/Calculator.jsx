import DisplayWindow from "./DisplayWindow";
import KeysWindow from "./KeysWindow";
import {useState} from 'react';

export default function Calculator() {
    const [expression, setExpression] = useState("");
    const [displayEXP, setDisplayEXP] = useState("");
    const [result, setResult] = useState("0");

    const sciFuc = {
        sin:"Math.sin",
        cos:"Math.cos",
        tan:"Math.tan",
        ln:"Math.log",
        log:"Math.log10",
        π:"Math.PI",
        e:"Math.E",
        "^":"**",
        "√":"Math.sqrt",
    };

    function calcResult(){
        if(expression.length !== 0){
            try{
                let compute = eval(expression);
                compute = parseFloat(compute.toFixed(4));
                setResult(compute);
            } catch (error) {
                setResult("Error!");
            }
        } else {
            setResult("Error!");
        }
    }
    function handleButton(value){
        if (value === "AC") {
            setExpression("");
            setDisplayEXP("");
            setResult("0");
        } else if (value === "DEL") {
            setExpression(expression.slice(0,-1));
            setDisplayEXP(displayEXP.slice(0,-1));
        } else if (sciFuc.hasOwnProperty(value)) {
            setExpression(expression + sciFuc[value]);
            setDisplayEXP(displayEXP + value);
        } else if (value === "!") {
            const lastNum = extractLastNum(expression);
            if(lastNum != null){
                const num = parseFloat(lastNum);
                setDisplayEXP(displayEXP + value);
                setExpression(expression.replace(lastNum, factorial(num)))
            }
        } else if (value === "=") {
            calcResult();
        } else {
            setExpression(expression + value);
            setDisplayEXP(displayEXP + value);
        }
    }

    function factorial(n){
        let result = 1;
        for (let i = 1; i <= n; i++) {
            result *= i;
        };
        return result;
    }

    function extractLastNum(exp){
        const numbers = exp.match(/\d+/g);
        return numbers ? numbers[numbers.length - 1] : null;
    }

    return (
        <div className='calculator'>
            <DisplayWindow expression={displayEXP} result={result} />
            <KeysWindow handleButton={handleButton}/>
        </div>
    )
}