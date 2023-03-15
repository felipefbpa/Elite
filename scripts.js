// Comportamento icone duvidas frequentes
let accordions = document.querySelectorAll('.accordion')

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

//Mascara de telefone e bloqueio de caracteres diferentes de numeros

const telefone = document.querySelector('#telefone')

telefone.addEventListener('focus', () => {
  telefone.value = '('

})

telefone.addEventListener('focusout', () => {
  if (telefone.value == '(') {

    telefone.value = ''
  }

})

telefone.addEventListener('keydown', (event) => {
  let telefoneComprimento = telefone.value.length
  if (telefoneComprimento === 1) {
    if (event.keyCode === 8) {
      event.preventDefault()
      return false
    }
  }

})

telefone.addEventListener('keypress', (event) => {
  let telefoneComprimento = telefone.value.length

  let oQueOUsuarioDigitou = String.fromCharCode(event.which)
  let caracteresPermitidos = "1234567890"
  if (caracteresPermitidos.indexOf(oQueOUsuarioDigitou) < 0) {
    event.preventDefault()
    return false
  }

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

//VALIDAÇÃO DE FORMULARIO

let inputsCampos = document.querySelectorAll('input')
let submitClick = document.querySelector('#submit')
let textarea = document.querySelectorAll('textarea')

async function validacao(event) {

  event.preventDefault();

  console.log('teste')

  let campoNome = inputsCampos[0]
  let campoEmail = inputsCampos[1]
  let campoTelefone = inputsCampos[2]
  let campoTexto = textarea[0]
  let campoEntrega = inputsCampos[3]
  let campoInstalacao = inputsCampos[4]
  let campoEndereco = inputsCampos[5]
  let arroba = '@'
  let temArromba = campoEmail.value.includes(arroba)
  let eValido = true;
  let entrega = ''
  let primeiraOpcao = servicos[0].checked
  let segundaOpcao = servicos[1].checked

  if (campoNome.value.length === 0) {
    eValido = false
    campoNome.classList.add('invalid')
    campoNome.classList.remove('valid')
  } else {
    campoNome.classList.remove('invalid')
    campoNome.classList.add('valid')
  }

  if (campoEmail.value.length === 0 || !temArromba) {
    eValido = false
    campoEmail.classList.add('invalid')
    campoEmail.classList.remove('valid')
  } else {
    campoEmail.classList.add('valid')
    campoEmail.classList.remove('invalid')
  }

  if (campoTelefone.value.length === 0) {
    eValido = false
    campoTelefone.classList.add('invalid')
    campoTelefone.classList.remove('valid')
  } else {
    campoTelefone.classList.remove('invalid')
    campoTelefone.classList.add('valid')
  }

  if (campoTexto.value.length === 0) {
    eValido = false
    campoTexto.classList.add('invalid')
    campoTexto.classList.remove('valid')
  } else {
    campoTexto.classList.remove('invalid')
    campoTexto.classList.add('valid')
  }

  if (!primeiraOpcao && !segundaOpcao) {
    eValido = false
    styleAlert.style.display = 'block'
  } else {
    styleAlert.style.display = 'none'
  }

  if (campoEndereco.value.length === 0) {
    eValido = false
    campoEndereco.classList.add('invalid')
    campoEndereco.classList.remove('valid')
  } else {
    campoEndereco.classList.remove('invalid')
    campoEndereco.classList.add('valid')
  }

  if (eValido) {

    if (primeiraOpcao) {
      entrega = 'Somente entrega'
    } else {
      entrega = 'Entrega e instalação'
    }

    const request = await fetch("http://localhost:3000/email", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        {
          email: campoEmail.value,
          nome: campoNome.value,
          telefone: campoTelefone.value,
          ideia: campoTexto.value,
          entrega: entrega,
          endereco: campoEndereco.value

        })
    })
    const response = await request.json();
    swal({
      title: "Enviado com sucesso",
      text: "Recebemos seu email, em breve retornamos!",
      icon: "success",
      button: "Entendi",
    });
  } else {
    swal({
      title: "Ops",
      text: "Existem campos a serem preenchidos!",
      icon: "error",
      button: "Entendi",
    });
  }


}

submitClick.addEventListener('click', validacao)




