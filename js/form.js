var botaoAdicionar = document.querySelector("#adicionar-paciente");

botaoAdicionar.addEventListener("click", function (event) {
    event.preventDefault();

    var form = document.querySelector("#form-adiciona");

    //Extraindo informações do paciente.
    var paciente = obtemPacienteDoFormulario(form);

    //Criar paciente
    var pacienteTr = criaTr(paciente);

    var erros = validaPaciente(paciente);
    console.log(erros);
    if (erros.length > 0) {
        exibeMsgDeErros(erros);
        return;
    }

    var tabela = document.querySelector("#tabela-pacientes");
    tabela.appendChild(pacienteTr);

    form.reset(form);
    document.querySelector("#msg-erro").innerHTML ="";
});

function exibeMsgDeErros(erros) {
    var ul = document.querySelector("#msg-erro");
    ul.innerHTML = "";
    erros.forEach(function (erro) {
        var li = document.createElement("li");
        li.textContent = erro;
        ul.appendChild(li);
    });
}

function obtemPacienteDoFormulario(form) {
    var paciente = {
        nome: form.nome.value,
        peso: form.peso.value,
        altura: form.altura.value,
        gordura: form.gordura.value,
        imc: calculaImc(form.peso.value, form.altura.value)
    }

    return paciente;
}

function criaTr(paciente) {

    var pacienteTr = document.createElement("tr");
    pacienteTr.classList.add("paciente");

    pacienteTr.appendChild(criaTd(paciente.nome, "info-nome"));
    pacienteTr.appendChild(criaTd(paciente.peso, "info-peso"));
    pacienteTr.appendChild(criaTd(paciente.altura, "info-altura"));
    pacienteTr.appendChild(criaTd(paciente.gordura, "info-gordura"));
    pacienteTr.appendChild(criaTd(paciente.imc, "info-imc"));

    return pacienteTr;
}

function criaTd(dado, classe) {

    var td = document.createElement("td");
    td.textContent = dado;
    td.classList.add(classe);

    return td;
}

function validaPaciente(paciente) {

    var erros = [];

    if (!validaPeso(paciente.peso))
        erros.push("Peso Inválido!");

    if (!validaAltura(paciente.altura))
        erros.push("Altura Inválido!");

    if (paciente.nome.length <= 0)
        erros.push("O campo Nome não pode estar em branco!");

    if (paciente.peso.length <= 0)
        erros.push("O campo Peso não pode estar em branco!");

    if (paciente.altura.length <= 0)
        erros.push("O campo Altura não pode estar em branco!");

    if (paciente.gordura.length <= 0) {
        erros.push("O campo Gordura não pode estar em branco!");
    }

    return erros;
}