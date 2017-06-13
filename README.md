Hapi-API-boilerplate Node(8.1.0)
===
[![Build Status][travis-badge]][travis-url]

[travis-badge]: https://travis-ci.org/FernandoCagale/hapi-api-boilerplate.svg?branch=master
[travis-url]: https://travis-ci.org/FernandoCagale/hapi-api-boilerplate


[![js-semistandard-style](https://cdn.rawgit.com/flet/semistandard/master/badge.svg)](https://github.com/Flet/semistandard)

Este é um boilerplate baseado no projeto [start-hapiness](https://github.com/thebergamo/start-hapiness) que utiliza Hapi.js e MongoDB, porém foi alterado para aplicar os frameworks Hapi.js e Sequelize(PostgreSQL).

#### Estrutura do Projeto
Na raiz, temos os diretórios: `scripts`, `data` e `src`. 

* **scripts** são responsáveis pelos scripts bash, tais como: `bootstrap`,` server` e `test`.
* **data**  é o diretório que contém os scripts que serão executados.
    * **fixtures** são dados padrões para o ambiente de teste, desenvolvimento e até mesmo para ambiente de homologação, não sendo necessário cadastrar os dados quando o banco de dados é resetado. Podendo assim, simular um ambiente mais real.
    * **migrations** são os scripts para criação do banco de dados, como por exemplo criar tabelas, alterar, deletar e etc.
    * **seeders** são dados reais, que serão executados em todos os ambientes, inclusive no ambiente de produção.
* **src** é o diretório principal do código-fonte.
    * **core** é o local onde fica todos os plugins e os arquivos importantes para o bootstrap do sistema.
        * **bin** é o local onde fica a configuração responsável por rodar os scripts SQL que será executado com base nos seguintes ambientes: `test`, `development`, `sandbox` e `production`. De acordo a necessidade, podem ser facilmente alterados.
        * **plugins** é o local onde ficam os plugins relacionados ao ecossistema Hapi, como auth e log etc.
        * **util** é o local onde podemos encontrar algumas funções úteis para a API.
    * **models** é o local onde é definido os modelos do SEQUELIZE.
    * **modules** é o local onde encontram-se os arquivos das entidades que serão utilizadas na API.
    * **test** é o local responsável por carregar todo o ambiente de teste.
    * **test-utils** é o local onde encontram-se algumas funções úteis para os testes da API.

#### Entidades e Escopos
* **src**
    * **modules**

O diretório modules, é o local onde será criada as entidades da API, como por exemplo `task`.

* **task**
   * **admin** `escopo`
      * **test**
        * **task.admin.spec.js**
      * **task.admin.controller.js**
      * **task.admin.routes.js**
      * **task.admin.validation.js**
   * **public** `escopo`
      * **test**
        * **task.public.spec.js**
      * **task.public.controller.js**
      * **task.public.routes.js**
      * **task.public.validation.js**
   * **task.schema.js**

Na maioria dos casos, precisamos de vários escopos de acesso em uma API. Na estrutura atual existem dois tipos de escopos, admin no qual somente o administrador terá acesso, e public, no qual não é necessário estar logado para enviar uma requisição. Dessa forma, estamos separando as responsabilidades entre os escopos, o que torna mais fácil a manutenção do mesmo.

É obrigatório seguir a estrutura descrita acima, {entidade}.{escopo}.{controller}.js

Você terá os arquivos: `{entidade}.{escopo}.routes.js`, `{entidade}.{escopo}.validation.js` e `{entidade}.{escopo}.controller.js`.
* `task.public.validation.js` neste arquivo é especificado as regras para cada endpoint com base no arquivo `task.schema.js`. . Podendo haver outras regras se necessário.
* `task.public.controller.js` é o arquivo responsável pelas regras de negócios.
* `task.public.routes.js`  é o arquivo que contém as configurações de roteamento do Hapijs.

Geralmente o arquivo `{entidade}.schema.js`  é comum entre os escopos, podendo ficar na raiz do `modules` de cada entidade.
* `task.schema.js` regras de validações como `header`, `params`, `query` entre outras.

Para executar API é necessário configurar as variáveis de ambiente com base no exemplo `.envsamble`. Caso prefira, crie um arquivo `.env` e cole as informações do arquivo `.envsample` e ajuste de acordo com sua necessidade.

Após configurar, execute `npm start`. Lembrando que para usuários Windows é necessário executar o mesmo através de um terminal tipo `Git BASH`, acesse `scripts` e execute `./server`.

Para rodar o teste, é necessário existir um banco de dados criado com a seguinte nomenclatura: `BD_NAME`  que é o nome do banco configurado na variável de ambiente seguido por `_test`, e por fim, basta executar `npm test`.

Caso você utilize docker, execute `docker-compose up -d` acesse `localhost:8080/documentation` e tudo estará funcionando. Você ainda pode rodar com o docker o ambiente de teste `docker-compose --file docker-compose-test.yml up` você verá os testes sendo executados. Altere algum teste e automaticamente os testes serão executados novamente.

#### Algumas features implementadas na API

* `JWT`  Autenticação via token.
* `Swagger` Para documentação da API.
* `Paginação` Paginação da API.
* `Dynamic Fields` Opção para informar quais campos serão retornados na API com base no header. [Dynamic](https://github.com/FernandoCagale/hapi-sequelize-dynamic-fields)
* `Cache` Opção para configurar cache em Redis, em alguns casos podemos armazenar em cache informações para otimizar nosso tempo de resposta. [Slap](https://github.com/FernandoCagale/hapi-slap)

#### Qualquer sugestão de melhorias ou PR será bem-vinda.

## License

Licensed under [MIT](https://github.com/FernandoCagale/hapi-api-boilerplate/blob/master/LICENSE)
