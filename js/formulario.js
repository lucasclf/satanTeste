// CPF precisa ser válido
// Nome de usuário não permite caracteres especiais, apenas letras e numeros
// Nome de usuário deve ter min 3 e max 12 caracteres
// Senha precisa ter min 6 e max 12 caracteres

///////////////////////////////////////////////////////////////////
import * as validaCpf from './validadorCPF'

class ValidarCadastro {
    constructor() {
        //capturar o formulario
        //capturar os campos de cadastro
        this.formulario = document.querySelector('.form')
        this.enviarBtn = document.querySelector('.cadastrar')
        this.cancelarBtn = document.querySelector('.cancelar')
        //executar os eventos de click e checagem quando clicar em cadastrar
        this.eventos()
    }

    //eventos de click e checagem
    eventos() {
        //capturar o clique em enviar
        this.formulario.addEventListener('click', evento => {
            //executar o evento que faz todas as checagens
            evento.preventDefault()
        })

        this.cancelarBtn.addEventListener('click', evento => {
            this.cancelar(evento)
        })

        this.enviarBtn.addEventListener('click', evento => {
            this.enviar(evento)
        })
    }


    //função de envio
    enviar(evento) {
        //previnir que o formulario seja enviado sem validação
        evento.preventDefault()
        //verificar se todos os campos estão preenchidos
        const camposPreenchidos = this.camposPreenchidos()
        //verificar se é um CPF válido
        const verificarCpf = this.verificarCpf()
        //verificar se é um email valido
        const verificarEmail = this.verificarEmail()

        //verificar se o nome do usuário está no padrão de tamanho e de tipos de caracteres
        const verificarUsuario = this.verificarUsuario()

        //verificar se a senha está no padrão
        const verificarSenha = this.verificarSenha()
        //verificar se a senha repetida é igual ao campo anterior
        const verificarRepetir = this.verificarRepetir()

        //verificar se todas as flags são true antes de permitir o envio
        console.log(
            " campos " + camposPreenchidos +
            " cpf " + verificarCpf +
            " email " + verificarEmail +
            " usuario " + verificarUsuario +
            " senha " + verificarSenha +
            " repetir " + verificarRepetir)

        if (camposPreenchidos &&
            verificarCpf &&
            verificarEmail &&
            verificarUsuario &&
            verificarSenha &&
            verificarRepetir) {
            alert('Tudo certo! Cadastro realizado com sucesso.')
            this.formulario.submit()
        }
    }


    //função de verificação de campos em branco
    camposPreenchidos() {
        //setar uma flag de controle antes da checagem
        let valido = true
        //remover todas as mensagens de erro do formulário, como controle
        this.removerErro()
        //varrer os inputs de dentro formulario para verificação
        for (let input of this.formulario.querySelectorAll('input')) {
            //armazenar o label de cada campo sendo iterado, para indicar, caso exista erro
            const htmlLabel = input.previousElementSibling.htmlFor
            //verificar se todos os campos estão preenchidos
            if (input.value === '') {
                //mudar a flag de validade para impedir o envio
                valido = false
                //executar o erro ao usuário, indicando qual campo está com problema
                this.AvisoErro(input, `O campo de ${htmlLabel} não foi preenchido`)
            }
        }
        return valido
    }

    //funçao de exibir o erro para o usuário
    AvisoErro(input, mensagem) {
        //criar uma nova <div> pra ser inserida no html com o aviso de erro
        const div = document.createElement('div')
        //definir o conteúdo da div
        div.innerHTML = mensagem
        //inserir a div com a mensagem de erro no input correspondente
        input.insertAdjacentElement('afterend', div)
        //inserir uma classe na nova div, para customização CSS
        div.classList.add('erro_preenchimento')
    }

    //função de remover mensagens de erro para evitar que se acumulem
    removerErro() {
        for (let msgErro of this.formulario.querySelectorAll('.erro_preenchimento')) {
            msgErro.remove()
        }
    }


    //verificar se é um cpf válido
    verificarCpf(){
        const cpf = document.querySelector('#cpf')
        validaCpf(cpf)
        //CHAMAR O ARQUIVO VALIDDOR CPF.js
    }


    //verificar se é um email em formato válido
    verificarEmail(validarEmail) {
        //setar flag de controle
        let valido = true
        //capturar o email inserido
        const inputEmail = document.querySelector('#email')
        //verificar se tem @
        if (inputEmail.value.includes('@')) {
            //executar a função de validação
            //remover mensagens de erro
            this.removerErro()
            //extrair o valor do campo input de email
            const emailValor = inputEmail.value
            //dividir o email entre nome de usuário e provedor
            let usuarioEmail = emailValor.substring(0, emailValor.indexOf("@"))
            let servidorEmail = emailValor.substring(emailValor.indexOf("@") + 1, emailValor.length)
            //executar função de verificação de outros campos vazios
            this.camposPreenchidos()
            //validar o email
            if (
                //verificar se tem tem tamanho mínimo de caracteres
                usuarioEmail.length >= 1 && servidorEmail.length >= 3 &&
                //verificar se tem caracteres inválidos
                !usuarioEmail.includes('@') && !servidorEmail.includes('@') &&
                !usuarioEmail.includes(' ') && !servidorEmail.includes(' ') &&
                //verificar se possui ponto após o @
                servidorEmail.includes('.') &&
                //verificar se existe domínio após o ponto
                servidorEmail.lastIndexOf('.') < servidorEmail.length - 1
            ) {
                console.log('o email inserido foi validado')
            } else {
                this.AvisoErro(inputEmail, `O email "${inputEmail.value}" não possui um formato de email válido`)
                valido = false
            }
        } else if (inputEmail.value == "") {
            valido = false
            this.camposPreenchidos()
        } else {
            valido = false
            this.AvisoErro(inputEmail, `O formato de "${inputEmail.value}" não é um email válido`)
        }
        return valido
    }

    //função de validação de nome de usuário
    verificarUsuario() {
        //criar variavel de controle
        let valido = true

        //capturar o campo de usuario
        const usuario = document.querySelector('#usuario')
        const nick = usuario.value
        //criar variavel de teste de caracteres
        const regex = /[a-zA-Z]/g

        //verificar se o usuário tem mínimo de 3 e maximo de 12 caracteres
        if (nick.length <= 2 || nick.length >= 13) {
            valido = false
            this.AvisoErro(usuario, 'O nome de usuário deve conter entre 3 e 12 caracteres')
            //verificar se o usuário é composto de ao menos uma letra
        } else if (!regex.test(nick)) {
            this.AvisoErro(usuario, 'O nome de usuário deve conter ao menos uma letra')
            valido = false
        } else {
            console.log('nick valido')
        }
        return valido
    }

    //Função de validação de senha
    verificarSenha() {
        //criar variavel de controle
        let valido = true
        //capturar o campo de senha
        const senha = document.querySelector('#senha')
        const senhaValor = senha.value
        //criar variavel de teste de caractere
        const regex = /^(?:[0-9]+[a-z]|[a-z]+[0-9])[a-z0-9]*$/i

        //verificar se a senha tem o tamanho mínimo requerido
        if (senhaValor.length < 6) {
            this.AvisoErro(senha, 'A senha deve ter, no mínimo, 6 caracteres')
            valido = false
            //verificar se a senha tem ao menos uma letra e um número
        } else if (!regex.test(senhaValor)) {
            this.AvisoErro(senha, 'A senha deve conter ao menos uma letra e um número')
            valido = false
        } else {
            console.log('senha válida')
        }
        return valido
    }

    //verificar se os campos de senha são identicos
    verificarRepetir() {
        //variavel de controle
        let valido = true
        //capturar os dois campos de senha
        const senha = document.querySelector('#senha')
        const repetir = document.querySelector('#senha_repetir')

        //verificar se os campos estão iguais
        if (senha.value === repetir.value) {
            console.log('a senha é igual')
        } else {
            valido = false
            this.AvisoErro(repetir, "Os campos de senha e de repetir a senha devem estar iguais")
        }
        return valido
    }

    //função de cancelar o cadastro
    cancelar() {
        alert('cadastro cancelado')
        //resetar os campos
        const campos = document.querySelector('.form').reset()
        //remover qualquer mensagem de erro
        this.removerErro()
    }
}

const validar = new ValidarCadastro()
