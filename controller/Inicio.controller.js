sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,JSONModel) {
        "use strict";

        return Controller.extend("projetonetflix.controller.Inicio", {
            onInit: function () {
                //EQUIVALE AO INITIALIZATION DO ABAP
                //EVENTO QUE E EXECUTADO QUANDO O PROGRAMA É INICIADO
                var menu = {
                    primeiro : "BEGIN",
                    segundo: "MOVIES"
                };

                //CRIAR MODELO E PREENCHER COM DADOS
                var menuModel = new JSONModel();
                menuModel.setData(menu);
                
                //ATRIBUIR MODEL NA TELA
                var tela = this.getView();
                tela.setModel(menuModel, "ModeloMenu");

                var resultados = {
                    titles : []
                };

                var filmesModel = new JSONModel();
                filmesModel.setData(resultados);
                tela.setModel(filmesModel, "APIFilmes");

            },
            onPressLinkInicio: function(){
                alert("Voçe clicou em Início! É um javascript!");
            },
            onPressLinkSeries: function(){
                alert("Voçe clicou em Séries! É um javascript!");
            },
            onApertarBuscar: function(){
                //obter o valor do campo de busca
                var filtro = this.byId("inputBuscar").getValue();
                //alert(query);

                const settings = {
                    async: true,
                    crossDomain: true,
                    url: 'https://netflix54.p.rapidapi.com/search/?query=' + filtro + '&offset=0&limit_titles=50&limit_suggestions=20&lang=en',
                    method: 'GET',
                    headers: {
                        'X-RapidAPI-Key': 'a8b7088685msh1fe701526c09100p137129jsnc3c189436649',
                        'X-RapidAPI-Host': 'netflix54.p.rapidapi.com'
                    }
                };
                
                $.ajax(settings).done(function (response) {
                    console.log(response);
                    //RESGATA MODELO E ATUALIZAR OS DADOS
                    var view = this.getView();
                    var model = view.getModel("APIFilmes");
                    var dados = model.getData();

                    //LIMPAR A LISTA
                    dados.titles = [];
                    dados.titles = response.titles;
                    model.refresh();
                }.bind(this));



            }
        });
    });
