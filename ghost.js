const inputMusica = document.querySelector('#inputMusica');
const btnAdicionar = document.querySelector('#btnAdicionar');
const listaMestas = document.querySelector('#listaMestas');
const mensagem = document.querySelector('#mensagem');
const btnLimparTudo = document.querySelector('#btnLimparTudo');

const musicasEscutadasArray = [];

inputMusica.addEventListener('keydown', function(event) {
  if(event.key === "Enter") {
    btnAdicionar.click();
  }
});

btnAdicionar.addEventListener('click', () => {
  const nomeDaMusica = inputMusica.value.trim();

  if(nomeDaMusica === '') {
    mensagem.textContent = 'Por favor, digite o nome da música!';
    return;
  }

  mensagem.textContent = '';

  const novaMusicaObjeto = {
    id: Date.now(),
    titulo: nomeDaMusica,
    ouvida: false
  };

  musicasEscutadasArray.push(novaMusicaObjeto);

  const li = document.createElement('li');
  li.classList.add('tarefa');

  const spanTexto = document.createElement('span');
  spanTexto.textContent = novaMusicaObjeto.titulo;
  li.append(spanTexto);

  const divAcoes = document.createElement('div');
  divAcoes.classList.add('tarefa__acoes');

  const btnConcluir = document.createElement('button');
  btnConcluir.textContent = 'Marcar Ouvida';
  btnConcluir.classList.add('btn', 'btn--success');

  btnConcluir.addEventListener('click', () => {
    if (!novaMusicaObjeto.ouvida) {
        spanTexto.style.textDecoration = 'line-through';
        spanTexto.style.opacity = '0.4';
        btnConcluir.textContent = 'Pendente';
        novaMusicaObjeto.ouvida = true;
    } else {
        spanTexto.style.textDecoration = 'none';
        spanTexto.style.opacity = '1';
        btnConcluir.textContent = 'Marcar Ouvida';
        novaMusicaObjeto.ouvida = false;
    }
  });

  const btnRemover = document.createElement('button');
  btnRemover.textContent = 'Remover';
  btnRemover.classList.add('btn', 'btn--danger');

  btnRemover.addEventListener('click', () => {
    li.remove(); // Tira do HTML

    const indice = musicasEscutadasArray.indexOf(novaMusicaObjeto);
    if (indice > -1) {
        musicasEscutadasArray.splice(indice, 1);
    }
  });

  divAcoes.append(btnConcluir, btnRemover);
  li.append(divAcoes);
  listaMestas.append(li);

  inputMusica.value = '';
  inputMusica.focus();
});

btnLimparTudo.addEventListener('click', () => {
    // 1. Limpa o HTML da lista na tela (DOM)
    listaMestas.innerHTML = '';

    musicasEscutadasArray.length = 0;
    
    inputMusica.focus();
});
