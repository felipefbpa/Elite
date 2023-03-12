// Comportamento icone duvidas frequentes
let accordions = document.querySelectorAll(".accordion")

for (let i = 0; i < accordions.length; i++) {
  accordions[i].addEventListener('click', function () {
    this.classList.toggle('is-open');

    let content = this.nextElementSibling;
    if (content.style.maxHeight) {
      // accordion está aberto no momento, então feche-o
      content.style.maxHeight = null;
    } else {
      // accordion está fechado no momento, então abra-o
      content.style.maxHeight = content.scrollHeight + "px"
    }
  })
}

// FORMULARIO

//Mascara de telefone

const telefone = document.querySelector('#telefone')

telefone.addEventListener('click', () => {
  telefone.value = '('

})

telefone.addEventListener('focusout', () => {
  if (telefone.value == '(') {

    telefone.value = ''
  }

})

telefone.addEventListener('keypress', () => {
  let telefoneComprimento = telefone.value.length

  if (telefoneComprimento === 3) {
    telefone.value = telefone.value + ') '
  }

  if (telefoneComprimento === 10) {
    telefone.value = telefone.value + '-'
  }

})

//Entrega e instalação - MARQUE UMA OPÇÃO

let servicos = document.querySelectorAll('input[name="servico"]')
let enviar = document.querySelector('#submit')
let styleAlert = document.querySelector('.styleAlert')  

function checagem() {
  let primeiraOpcao = servicos [0].checked
  let segundaOpcao = servicos [1].checked

  if (!primeiraOpcao && !segundaOpcao){
    styleAlert.style.display = 'block'
  } else {
    styleAlert.style.display = 'none'
  }
}

enviar.addEventListener('click', checagem)



