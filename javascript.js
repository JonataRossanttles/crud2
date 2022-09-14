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
  <td class= "td-edit" ><img src="imagens-firebase/editar.png" class = "editar" onclick = editardoc(${dados.cpf})> </td> 
  <td class= "td-edit" ><img src="imagens-firebase/excluir.png" class = "excluir" onclick = excluirdoc(${dados.cpf})> </td> 
  
  </tr> ` 
 
 })


})

function editardoc(cpf){
  modal.style.display="block"
  
  db.collection("turmaA").doc(cpf.toString()).get().then((snapshot)=>{
    let dados1 = snapshot.data()
    cpf_cliente.value = cpf
    nome_cliente.value = dados1.nome
    celular_cliente.value = dados1.celular
    
  })
   
}

 function excluirdoc(cpf){
  db.collection("turmaA").doc(cpf.toString()).delete().then(()=>{console.log("Apagou")})
  console.log(cpf)
  location.reload()
 }

function salvar_dados(){
  db.collection("turmaA").doc(cpf_cliente.value.toString()).set({cpf:cpf_cliente.value, nome:nome_cliente.value.toString(), celular:parseInt(celular_cliente.value)})

   console.log(cpf_cliente.value)
   modal.style.display="none"
location.reload()
}

db.collection("turmaA").doc('12345').set({cpf:'12345', nome:'patativa', celular:'87869606'})
