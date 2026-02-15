# TREI Percentual

Um pequeno serviço em Node.js que calcula a percentagem individual de cada aluno de um grupo com base em notas parciais. O projeto está organizado seguindo uma arquitetura simples com camadas de *domain*, *service* e *controller*.

---

## Visão Geral

O objetivo principal da aplicação é receber uma lista de alunos com quatro notas (participação, conhecimento, participação na compra e participação no relatório) e distribuir 100% do peso entre eles, devolvendo a percentagem final de cada estudante.

O cálculo é feito da seguinte forma:

1. **Média do aluno**: soma das quatro notas dividida por 4.
2. **Percentual por integrante**: 100 dividido pelo número total de alunos.
3. **Percentagem final**: média do aluno multiplicada pelo percentual por integrante e dividida por 20 (já que cada nota varia de 0 a 20).

O serviço expõe uma API HTTP com um endpoint `/v1/calcular-percentagem` que aceita requisições `POST` com os dados dos alunos e responde com o resultado ordenado.

---

## 🛠 Estrutura do Projeto

```
index.js                # Versão CLI antiga (comentada)
server.js               # Inicializa o servidor Fastify e configura plugins
package.json
README.md

src/
  controller/
    calcular-percentagem.controller.js   # Define rota e validação JSON
  domain/
    aluno.domain.js                     # Funções de cálculo matemático
  service/
    calcular-percentagem.service.js    # Orquestra lógica de domínio para cada aluno
```

### Camadas explicadas

- **Domain** (`src/domain`): contém a lógica pura de negócio, sem dependências externas. No caso, funções para calcular médias e percentagens.
- **Service** (`src/service`): usa as funções de domínio para processar um array de alunos e montar o resultado final.
- **Controller** (`src/controller`): define a rota HTTP, aplicando schema de validação (usando AJV) para o corpo e a resposta, e chama o serviço.

---

## Instalação

1. Certifique‑se de ter **Node.js (>= 14)** instalado.
2. Abra o terminal no diretório do projeto.
3. Execute:

```bash
npm install
```

---

## Como executar

Inicie o servidor com:

```bash
node server.js
```

Por padrão o servidor roda em `http://localhost:3000` e a documentação Swagger fica disponível em `http://localhost:3000/docs`.

> ⚠️ Se o `port` já estiver em uso, exporte `PORT` antes de iniciar ou altere no código.

---

## API

### POST `/v1/calcular-percentagem`

Recebe um JSON com a propriedade `alunos`, que é um array de objetos. Cada objeto deve conter as quatro notas e o nome do aluno.

Exemplo de corpo de requisição:

```json
{
  "alunos": [
    {
      "nome": "João",
      "participacao": 18,
      "conhecimento": 17,
      "participacaoNaCompra": 19,
      "participacaoNoRelatorio": 16
    },
    {
      "nome": "Maria",
      "participacao": 20,
      "conhecimento": 20,
      "participacaoNaCompra": 20,
      "participacaoNoRelatorio": 20
    }
  ]
}
```

Resposta esperada (`200`):

```json
{
  "resultado": [
    { "ordem": 1, "nome": "João", "percentagem": 23.75 },
    { "ordem": 2, "nome": "Maria", "percentagem": 50 }
  ]
}
```

O Swagger autogerado já fornece a interface para testar interativamente.

---

## Lógica de Cálculo

- **`calcularMediaDoAluno`** (domain): recebe as quatro notas e retorna a média aritmética.
- **`calcularPercentagemDoAluno`** (domain): transforma a média em percentagem considerando o peso de cada integrante no grupo.
- **`executarCalculoDePercentagem`** (service): itera sobre o array de alunos, chama as funções de domínio e monta objetos com `ordem`, `nome` e `percentagem`.

Os valores resultantes são retornados na mesma ordem em que os alunos foram enviados.

---

## Testes e CLI (legado)

O arquivo `index.js` contém um protótipo de CLI para rodar o cálculo no terminal. Está todo comentado, mas pode ser usado como base para construir testes manuais ou automatizados.

---

## Boas práticas e sugestões

- Adicione testes automatizados (mocha, jest, etc.) para assegurar que cálculos não regressam.
- Valide também limites de notas no serviço, caso o controller seja omitido em outros usos.
- Considere separar a porta e configurações em variáveis de ambiente.

---

📝 *Criado em fevereiro de 2026 por projeto de algoritmos TREI.*
