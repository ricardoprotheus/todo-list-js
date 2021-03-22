// JavaScript Vanila

var incompleteTasksHolder = document.getElementById("incomplete-tasks");    // Tarefa pendente
var completedTasksHolder = document.getElementById("completed-tasks");      // Tarefa completa
var taskInput = document.getElementById("new-task");                        // Nova tarefa
var addButton = document.getElementsByTagName("button")[0];                 // Primeiro botão

// Criar tarefa
var createNewTaskElement = function(taskString) {

    var listItem = document.createElement("li");        // Item da lista da nova tarefa
    var checkBox = document.createElement("input");     // Checkbox
    var label = document.createElement("label");        // Etiqueta
    var editInput = document.createElement("input");    // Texto
    var editButton = document.createElement("button");  // Botão edit
    var deleteButton = document.createElement("button");// Botão delete  
    var closedButton = document.createElement("button");// Botão closed  

    // Objetos necessários na modificação
    checkBox.type = "checkbox";         
    editInput.type = "text";            
    editButton.innerText = "Editar";      
    editButton.className = "edit";      
    deleteButton.innerText = "Apagar";  
    deleteButton.className = "delete";  
    closedButton.innerText = "Encerrar";  
    closedButton.className = "closed";  
    label.innerText = taskString;       

    // Objetos necessários na inclusão
    listItem.appendChild(checkBox);      
    listItem.appendChild(label);         
    listItem.appendChild(editInput);     
    listItem.appendChild(editButton);    
    listItem.appendChild(deleteButton);  
    listItem.appendChild(closedButton);  
    
    return listItem;

};

// Criar uma nova tarefa
var addTask = function() {

    var listItemName = taskInput.value || "New Item";   // Recebe o valor atual ou define um valor padrão
    var listItem = createNewTaskElement(listItemName);  // Criar uma nova tarefa com o texto de #new-task

    incompleteTasksHolder.appendChild(listItem);        // Inclui listItem em incompleteTasksHolder
    bindTaskEvents(listItem, taskCompleted);            // Associamos a tarefas pendentes
    taskInput.value = "";                               // Limpa o campo

};

// Altera uma tarefa
var editTask = function() { 
                                        
    var listItem = this.parentNode;                               // Cria uma tarefa
    var editInput = listItem.querySelector("input[type=text");    // Recebe o texto
    var label = listItem.querySelector("label");                  // Etiqueta
    var button = listItem.getElementsByTagName("button")[0];      // Botão

    var containsClass = listItem.classList.contains("editMode");    // Verificar .editMode e atribuir valor para variável
    if(containsClass) {                                             // Alterar valor de .editMode
        label.innerText = editInput.value;                          // O valor da Etiqueta vem do texto de entrada
        button.innerText = "Editar";                                  // Altera o nome do botão para Edit
    } else {                                                        // Altera valor para .editMode
        editInput.value = label.innerText;                          // O valor de entrada vem da Etiqueta
        button.innerText = "Gravar";                                  // Altera o nome do botão para Salvar
    }
    
    listItem.classList.toggle("editMode");                          // Troca .editMode no objeto pai

};

// Apagar uma tarefa
var deleteTask = function() {

    var listItem = this.parentNode;     // Uso do parentNode para direcionar o objeto que contém o botão excluir
    var ul = listItem.parentNode;       // Uso do parentNode novamente para segmentar a lista com a tarefa

    ul.removeChild(listItem);           // Apaga o item da lista dos objetos pai da <ul>

};

// Encerrar uma tarefa
var closedTask = function() { 

    var listItem = this.parentNode;                                 // Cria uma tarefa
    var editInput = listItem.querySelector("input[type=text");      // Recebe o texto
    var label = listItem.querySelector("label");                    // Etiqueta
    var button = listItem.getElementsByTagName("button")[2];        // Botão
    var ul = listItem.parentNode;                                   // Uso do parentNode novamente para segmentar a lista com a tarefa

    console.log(this.parentNode);                                   // Cria uma tarefa
    console.log(label); 
    console.log(label.innerText);                                   // Etiqueta
    console.log(button);
    console.log(ul);

    var listItemName = label.innerText;                              // Recebe o valor atual ou define um valor padrão
    var listItemNew = createNewTaskElement(listItemName);   // Criar uma nova tarefa com o texto de #new-task

    completedTasksHolder.appendChild(listItemNew);          // Inclui listItem em incompleteTasksHolder
    bindTaskEvents(listItemNew, taskIncomplete);            // Associamos a tarefas pendentes
    //taskInput.value = "";                                 // Limpa o campo

    console.log(listItemName);                              // Recebe o valor atual ou define um valor padrão
    console.log(listItemNew);                               // Criar uma nova tarefa com o texto de #new-task

    ul.removeChild(listItem);                               // Apaga o item da lista dos objetos pai da <ul>

    /*
    var containsClass = listItem.classList.contains("editMode");    // Verificar .editMode e atribuir valor para variável
    if(containsClass) {                                             // Alterar valor de .editMode
        label.innerText = editInput.value;                          // O valor da Etiqueta vem do texto de entrada
        button.innerText = "Editar";                                  // Altera o nome do botão para Edit
    } else {                                                        // Altera valor para .editMode
        editInput.value = label.innerText;                          // O valor de entrada vem da Etiqueta
        button.innerText = "Gravar";                                  // Altera o nome do botão para Salvar
    }
    
    listItem.classList.toggle("editMode");                          // Troca .editMode no objeto pai
    */
};

// Marca tarefa como concluida
var taskCompleted = function() {               

    var listItem = this.parentNode;                 // Uso do parentNode para ter clareza
    
    completedTasksHolder.appendChild(listItem);     // Insere a tarefa na lista de concluidas #completed-tasks
    bindTaskEvents(listItem, taskIncomplete);       // Conecta com o anterior 

};

// Marca tarefa como pendente
var taskIncomplete = function() {               

    var listItem = this.parentNode;                 // Uso do parentNode para ter clareza

    incompleteTasksHolder.appendChild(listItem);    // Insere a tarefa na lista de pendentes #incomplete-tasks
    bindTaskEvents(listItem, taskCompleted);        // Conecta com o anterior

};

// Seleciona as tarefas filhos
var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {   

    var checkBox = taskListItem.querySelector("input[type=checkbox]");  // Recebe o valor do Checkbox  
    var editButton = taskListItem.querySelector("button.edit");         // Recebe o valor do Botão Alterar         
    var deleteButton = taskListItem.querySelector("button.delete");     // Recebe o valor do Botão Apagar    
    var closedButton = taskListItem.querySelector("button.closed");     // Recebe o valor do Botão Apagar    

    editButton.onclick = editTask;              // Associamos editTask com o botão alterar
    deleteButton.onclick = deleteTask;          // Associamos deleteTask com o button apagar
    closedButton.onclick = closedTask;          // Associamos closedTask com o button encerrar
    checkBox.onchange = checkBoxEventHandler;   // Associamos checkBoxEventHandler com o checkbox

};

// Cria uma requisição Ajax
var ajaxRequest = function() {
    console.log("Ajax request !");
};

// Cria evento de escuta para a função de click ao criar uma tarefa
addButton.addEventListener("click", addTask);  
// Cria evento de escuta para a função de click ao criar uma tarefa

// Cria evento de escuta para a requisição Ajax    
addButton.addEventListener("click", ajaxRequest);  
  
for(var i = 0; i < incompleteTasksHolder.children.length; i++) {        // Lista todas as tarefas pendentes em incompleteTasksHolder <ul>
    bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);   // Associa eventos para listar os itens filhos (taskCompleted)
};
  
for(var i = 0; i < completedTasksHolder.children.length; i++) {      // Lista todas as tarefas concluidas em completedTasksHolder <ul>
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);   // Associa eventos para listar os itens filhos (taskIncomplete)
}