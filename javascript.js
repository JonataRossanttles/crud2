const db = firebase.firestore()


let modal = document.querySelector(".modal-container")
const meu_tbody = document.querySelector("#meu_tbody")
let cpf_cliente = document.querySelector("#m-cpf")
let nome_cliente = document.querySelector("#m-nome")
let celular_cliente = document.querySelector("#m-celular")
let salvar = document.querySelector("#btnSalvar")
salvar.addEventListener("click",salvar_dados)

function openModal(){
  modal.style.display="block"
}


db.collection("turmaA").get().then((snapshot)=>{
snapshot.forEach((doc)=>{
  let dados = doc.data()
 
 meu_tbody.innerHTML += ` <tr> 
  
  <td> ${dados.cpf} </td>
  <td> ${dados.nome} </td>
  <td> ${dados.celular} </td>
  <td class= "td-edit" ><img src="imagens-firebase/editar.png" class = "editar" onclick = editardoc('${doc.id}')> </td> 
  <td class= "td-edit" ><img src="imagens-firebase/excluir.png" class = "excluir" onclick = excluirdoc('${doc.id}')> </td> 
  
  </tr> ` 
 
 })


})



function editardoc(id_doc){
  modal.style.display="block"


  
  db.collection("turmaA").doc(id_doc).get().then((snapshot)=>{
    let dados1 = snapshot.data()
    cpf_cliente.value = id_doc
    nome_cliente.value = dados1.nome
    celular_cliente.value = dados1.celular
    
  })
  
}

 function excluirdoc(id_doc){
  db.collection("turmaA").doc(id_doc).delete()
  .then(()=>{ console.log(id_doc)
    location.reload()})
 
 }

function salvar_dados(){
  db.collection("turmaA").doc(cpf_cliente.value)
  .set({cpf:cpf_cliente.value, nome:nome_cliente.value, celular:parseInt(celular_cliente.value)})
  .then(()=>{ console.log(cpf_cliente.value)
    modal.style.display="none"
 location.reload()})

  
}


