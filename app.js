// Solicitar el nombre del usuario mediante una ventana emergente
const userName = prompt("Por favor, ingresa tu nombre:");
if (userName === null || userName === "") {
    alert("Nombre no proporcionado. La aplicación no puede continuar sin un nombre de usuario.");
}

const quizContainer = document.getElementById("quiz-container");
const resultContainer = document.getElementById("result-container");
const timerContainer = document.getElementById("timer-container");

const questions = [
        {
            question: "¿Cuál es la definición de software?",
            options: ["Conjunto de programas que controlan la operación de la computadora", "Conjunto de aparatos físicos", "Es el cerebro de la computadora"],
            correctAnswer: "Conjunto de programas que controlan la operación de la computadora"
        },
        {
            question: "¿Qué es el CPU?",
            options: ["Es el que realiza las operaciones aritméticas y lógicas controlando la ejecución de instrucciones", "Es el cerebro de la computadora", "Almacena la información de manera permanente"],
            correctAnswer: "Es el que realiza las operaciones aritméticas y lógicas controlando la ejecución de instrucciones"
        },
        {
           
            question: "¿De qué se ocupa la informática?",
            options: ["Para dar información de manera rápida", "De la manipulación de la información", "Para procesar la información"],
            correctAnswer: "De la manipulación de la información"
        },
        {
            question: "Menciona tres componentes básicos de una computadora",
            options: ["Mouse, Cámara, Teclado ", "Memoria RAM, Disco Duro, Tarjeta Madre", "Almacenamiento, Software, Sistema Operativo"],
            correctAnswer: "Memoria RAM, Disco Duro, Tarjeta Madre"
        },
        {
            question: "Menciona la estructura de un sitema informático y cuáles son sus componentes",
            options: ["Cámara, Teclado, Mouse", "Hardware, Sistemas Operativos, Almacenamiento", "Redes, Softaware, Disco Duro"],
            correctAnswer: "Hardware, Sistemas Operativos, Almacenamiento"
        },
        {
           
            question: "¿Porqué es esencial la lógica de programación al crear una aplicación?",
            options: ["Para llegar a un fin ", "Para procesar información", "Para convertir un problema en una secuencia de pasos"],
            correctAnswer: "Para convertir un problema en una secuencia de pasos"
        },
        {
            question: "¿Qué es un Algoritmo?",
            options: ["Una serie de pasos para llegar a un fin", "La ejecución de tareas cotidianas", "Seguir un manual de instrucciones"],
            correctAnswer: "Una serie de pasos para llegar a un fin"
            
        },
    
        
        // Agrega más preguntas según sea necesario
    ];

let currentQuestion = 0;
let score = 0;
let timer;
let timeRemaining = 100; // 5 minutos en segundos

function startQuiz() {
    // Solo iniciamos el cuestionario si el nombre del usuario es válido
    if (userName && userName.trim() !== "") {
        showNextQuestion();
    } else {
        alert("Nombre no proporcionado. La aplicación no puede continuar sin un nombre de usuario.");
    }
}
    function showNextQuestion() {
        if (currentQuestion < questions.length) {
            const currentQ = questions[currentQuestion];
            const card = createQuestionCard(currentQ);

            const timerDiv = document.createElement("div");
            timerDiv.id = "timer-container";
            card.appendChild(timerDiv);

            card.appendChild(createOptions(currentQ.options));

            const nextButton = document.createElement("button");
            nextButton.textContent = "Siguiente Pregunta";
            nextButton.onclick = () => {
                calculateScore(currentQ.options);
                currentQuestion++;
                clearInterval(timer);
                quizContainer.innerHTML = "";
                showNextQuestion();
            };

            quizContainer.appendChild(card);
            quizContainer.appendChild(nextButton);

            startTimer(timerDiv);
        } else {
            clearInterval(timer);
            showResults();
        }
    }

    function createQuestionCard(question) {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `<h2>${question.question}</h2>`;
        return card;
    }

    function createOptions(options) {
        const optionsContainer = document.createElement("div");

        options.forEach((option, index) => {
            const radioBtn = document.createElement("input");
            radioBtn.type = "radio";
            radioBtn.name = "answer";
            radioBtn.value = option;
            radioBtn.id = `option${index}`;

            const label = document.createElement("label");
            label.textContent = option;
            label.htmlFor = `option${index}`;

            optionsContainer.appendChild(radioBtn);
            optionsContainer.appendChild(label);
            optionsContainer.appendChild(document.createElement("br"));
        });

        return optionsContainer;
    }

    function startTimer(timerDiv) {
        timer = setInterval(() => {
            const minutes = Math.floor(timeRemaining / 60);
            const seconds = timeRemaining % 60;
            timerDiv.textContent = `Tiempo restante: ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

            if (timeRemaining === 0) {
                clearInterval(timer);
                showResults();
            } else {
                timeRemaining--;
            }
        }, 1000);
    }

    function calculateScore(options) {
        const selectedAnswer = document.querySelector('input[name="answer"]:checked');
        if (selectedAnswer && selectedAnswer.value === questions[currentQuestion].correctAnswer) {
            score++;
        }
    }

    function showResults() {   
        const scorePercentage = ((score / questions.length) * 100).toFixed(2);
        resultContainer.innerHTML = `<h2>Resultado Final</h2>
            <p>${userName || "Usuario"}, tu puntuación es: ${score} de ${questions.length} preguntas correctas (${scorePercentage}%)</p>`;
    }