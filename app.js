const inputTarefa = document.querySelector('.input-tarefa')
const btnAddTarefa = document.querySelector('.btn-add-tarefa')
const listaTarefas= document.querySelector('.lista-de-tarefas')


function criarLi(){
    const li = document.createElement('li')
    return li
}

function criarBtnApagar(li){
    li.innerText += ' '

    const btnApagar = document.createElement('button')
    btnApagar.innerText = 'Apagar'

    li.appendChild(btnApagar)

    btnApagar.setAttribute('class', 'apagar')
}

function salvarTarefas(){
    const liTarefas = listaTarefas.querySelectorAll('li')
    const listaDeTarefas = []
    
    for (let tarefa of liTarefas){
        let tarefaTexto = tarefa.innerText
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim()
        listaDeTarefas.push(tarefaTexto)
        
    }

    const tarefasJSON = JSON.stringify(listaDeTarefas)
    localStorage.setItem('tarefas', tarefasJSON)
}

function criarTarefa(inputText){
    const li = criarLi()
    li.innerText = inputText
    listaTarefas.appendChild(li)
    limparInput()
    criarBtnApagar(li)
    salvarTarefas()
}

function limparInput(){
    inputTarefa.value = ""
    inputTarefa.focus()
}

function recuperarTarefasSalvas(){
    const tarefasSalvas = localStorage.getItem('tarefas')
    const tarefasSalvasArray = JSON.parse(tarefasSalvas)
    
    for(let tarefaSalva of tarefasSalvasArray){
        criarTarefa(tarefaSalva)
    }
}

inputTarefa.addEventListener('keypress', (e) => {
    if(!inputTarefa.value) return
    if(e.keyCode ===  13) criarTarefa(inputTarefa.value)
})

btnAddTarefa.addEventListener('click', (e) => {
    if(!inputTarefa.value) return
    criarTarefa(inputTarefa.value)
})

document.addEventListener('click', (e) => {
    const el = e.target
    
    if(el.classList.contains('apagar')){
        el.parentElement.remove()
        salvarTarefas()
    }
})

recuperarTarefasSalvas()


