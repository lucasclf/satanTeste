export default class ValidaCpf {
    constructor(cpfEnviado) {
        Object.defineProperty(this, 'cpfLimpo', {
            value: cpfEnviado.replace(/\D+/g, '')
        })
    }
    isSequencia() {
        return this.cpfLimpo.charAt(0).repeat(this.cpfLimpo.length) === this.cpfLimpo
    }

    geraNovoCpf() {
        const cpfSemDigito = this.cpfLimpo.slice(0, -2)
        const digito1 = this.geraDigito(cpfSemDigito)
        const digito2 = this.geraDigito(cpfSemDigito + digito1)
        this.cpfCalculado = cpfSemDigito + digito1 + digito2
    }

    geraDigito(cpfSemDigito) {
        let total = 0
        let reverso = cpfSemDigito.length + 1

        for (let numerosCpf of cpfSemDigito) {
            total += reverso * Number(numerosCpf)
            reverso--
        }
        const digito = 11 - (total % 11)
        return digito <= 9 ? String(digito) : '0'
    }

    valida() {
        if (!this.cpfLimpo) return false
        if (typeof this.cpfLimpo !== 'string') return false
        if (this.cpfLimpo.length !== 11) return false
        if (this.isSequencia()) return false
        this.geraNovoCpf()

        return this.cpfCalculado === this.cpfLimpo
    }
}

 
// const validaCpf = new ValidaCpf('070.987.720-03')

// if (validaCpf.valida()) {
// console.log('cpf válido')
// }else{
//     console.log('cpf inválido')
// }


