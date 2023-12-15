// let consultaCEP = fetch('https://viacep.com.br/ws/01001000/json')
//     .then(resposta => resposta.json())
//     .then(r => {
//         if (r.erro) {
//             throw Error('esse cep não existe!');
//         } else
//             console.log(r);
//     })
//     .catch(erro => console.log(erro))
//     .finally(mensagem => console.log("Processamento concluído!"));

// console.log(consultaCEP);

async function buscaEndereco(cep) {
    var mensagemErro = document.getElementById("erro");
    mensagemErro.innerHTML = "";
    try {
        let consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json`);
        var consultaCEPConvertida = await consultaCEP.json();
        if(consultaCEPConvertida.erro){
            throw Error("CEP não existente!");
        }
        var cidade = document.getElementById("cidade");
        var logradouro = document.getElementById("endereco");
        var estado = document.getElementById("estado");
        var bairro = document.getElementById("bairro");

        cidade.value = consultaCEPConvertida.localidade;
        logradouro.value = consultaCEPConvertida.logradouro;
        estado.value = consultaCEPConvertida.uf;
        bairro.value = consultaCEPConvertida.bairro;

        console.log(consultaCEPConvertida);
        return consultaCEPConvertida;
    } catch (erro) {
        mensagemErro.innerHTML = `<p>CEP inválido. Tente novamente!</p>`
        console.log(erro);
    }
}

var cep = document.getElementById("cep");
cep.addEventListener("focusout", () => buscaEndereco(cep.value));
 

// Varias requisições com Promise.all
// let ceps = ["01001000", "06385680"];
// let conjuntoCeps = ceps.map(valores => buscaEndereco(valores));
// console.log(conjuntoCeps);
// Promise.all(conjuntoCeps).then(respostas => console.log(respostas));