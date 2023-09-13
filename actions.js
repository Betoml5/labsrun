export const displayQuestion = (question, options, level, questionNumber) => {
  const html = `
  <div class='questionContainer'>
      <h2>Nivel ${level}</h2>
      <p>Responde la siguiente pregunta. Pregunta no. ${questionNumber}</p>

      <label name='question'>
        ${question}
      </label>  

     <div class="questionContainer__options">
      ${options
        .map((option) => {
          return `
        <div class="questionContainer__option-wrap">
          <input  type='radio' name='answer' value='${option.text}' />
          <span>${option.text}</span>  
        </div>
        `;
        })
        .join("")}
     </div>

      <button id='btnSubmitAnswer'>Enviar</button>
  </div>
`;

  const modal = document.querySelector("#modal");
  modal.innerHTML = html;
};
