sap.ui.define(
    ["./BaseController"],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("com.myorg.recommendationApp.controller.MainView", {
            onInit: function () {

              this.JsonResponseModel;
              // this.getView().setModel(JsonResponseModel);

            },
            onPressGeneration: function(){
            this.fetchEmbeddings();

              // $.ajax({
              //   url: "http://127.0.0.1:5000/get_similarity",
              //   method: "POST",
              //   async: false,
              //   contentType: "application/json",
              //   data: JSON.stringify(data),
              //   // eslint-disable-next-line no-shadow,no-unused-vars
              //   success: function(data_result){
              //     that.getView().setBusy(false);
              //     // const JsonResponseModel = new sap.ui.model.json.JSONModel();
              //     // JsonResponseModel.setData(data_result.choices[0].text);
              //     that.getView().byId("input-b").setValue(data_result.choices[0].text);
              //     // sap.ui.core.BusyIndicator.hide();
              //
              //     // that.getView().setModel(JsonResponseModel, "jsonModel");
              //     //     sap.m.MessageToast.show(data_result);
              //
              //   }
              // });




// Completion API call
              // const that = this;
              // that.getView().setBusy(true);
              // // sap.ui.core.BusyIndicator.insertContent("text",0);
              //
              // const usecase_data = that.getView().byId("input-a").getValue();
              //
              // const data = {
              //   "deployment_id": "text-davinci-003",
              //   "prompt": `Given below are list of services provided by SAP BTP and SAP Ariba which are under the heading BTP_List and Ariba_List , also a use case is provide(USE_CASE) which explains example implementation using these services.SAP BTP is a portfolio of SAP solutions and services that are brought under one umbrella. These services, and solutions helps organizations build a new cloud solution or extend SAP systems. SAP Ariba digitally transforms your supply chain, procurement and contract management process. BTP_List : 1. SAP cloud foundry : SAP Cloud Foundry runtime lets you develop polyglot cloud-native applications and run them on the SAP BTP Cloud Foundry environment.2. SAP job scheduling service: SAP Job Scheduling service allows you to define and manage jobs that run once or on a recurring schedule. Use this runtime-agnostic service to schedule action endpoints in your application or long-running processes using Cloud Foundry tasks. Use REST APIs to schedule jobs, including long-running jobs asynchronously, and create multiple schedule formats for simple and complex recurring schedules. Manage jobs and tasks and manage schedules with a web-based user interface.3. SAP Intelligent Robotic Automation: SAP Intelligent Robotic Process Automation lets you automate enterprise business processes. Design process automations with the Desktop Studio by creating end-to-end scenarios. Import these scenarios into the cloud Factory powered by SAP BTP to configure and execute them with Agents. Agents running on workstations can work as a Digital Assistant (attended automation) or as a Digital Worker (unattended automation).SAP conversational AI : SAP Conversational AI offers a single intuitive interface to train, build, test, connect and monitor chatbots embedded into SAP and third-party solutions, a high-performing natural language processing (NLP) technology and low-code features to ensure faster development. Simplify access to information and deliver personalized human-like conversations. Scale businesses by reducing development efforts and costs within support teams. Enhance user satisfaction by automating tedious tasks. Ariba_List: 1.SAP Ariba Supplier Lifecycle and Performance: Centralised supplier management supports faster onboarding, up-to-date data, and compliant spending across your supply base. A unified and comprehensive view of your most important supplier information can help your business work with suppliers effectively to withstand disruption. Transform supplier management and enable better buying decisions with intelligent tools that keep you in control.2.SAP Ariba Sourcing : Sourcing with SAP Ariba Sourcing (4BL) enables you to identify sources of supply for purchase requisitions in SAP S/4HANA Cloud, using the community of suppliers in SAP Business Network and the SAP Ariba Sourcing solution. All data is routed through SAP Integration Suite, managed gateway for spend management and SAP Business Network.3.SAP Ariba Contracts: The SAP Ariba Contracts solution creates a single integrated view of contract data and standardises related processes, helping your business realise negotiated savings, identify opportunities, pinpoint leakages, and much more.4.SAP Ariba Spend Analysis : SAP Ariba Spend Analysis helps you integrate machine learning, market intelligence, and analytics to develop a clear, centralized view of your organizational spend. You can develop visibility by supplier, buyer, category, and part to balance cost, revenue, and demand expectations across your enterprise. USE_CASE: PLDT Inc. is the largest fully integrated telecommunications company in the Philippines.The company offers a wide range of telecommunications and digital services across the country’s most extensive fiber optic backbone, fixed line and cellular networks.PLDT inc. was facing challenges as 1. Manual paper and e- mail based processes that introduce error and impede efficiency 2. Low visibility into spend,as well as long cycle times in procurement and other processes.These issues were resolved by using the following SAP BTP and SAP Ariba services : SAP Ariba Supplier Lifecycle and Performance , SAP Ariba Sourcing, SAP Ariba Contracts, SAP Ariba Spend Analysis.Using the information provided till now can you calculate the list of services that would be useful for the following USE_CASE and mention the reason : ${usecase_data.toString()} + how can SAP BTP(BTP_List) and SAP Ariba(Ariba_List) services help?`,
              //   "max_tokens": 1000,
              //   "temperature": 0.5,
              //   "n": 1
              // };
              // $.ajax({
              //       url: "https://azure-openai-serv-i057149.cfapps.eu12.hana.ondemand.com/api/v1/completions",
              //       method: "POST",
              //       async: false,
              //       contentType: "application/json",
              //       headers: {
              //       "Authorization": "Bearer eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vY2lhcy1kZXZlbG9wbWVudC5hdXRoZW50aWNhdGlvbi5ldTEyLmhhbmEub25kZW1hbmQuY29tL3Rva2VuX2tleXMiLCJraWQiOiJkZWZhdWx0LWp3dC1rZXktMTc2NTgyOTIwMiIsInR5cCI6IkpXVCIsImppZCI6ICJnOFFBTXVseGZwZnpJMVE1T0QyTzU4ZUYxNEoxaWJKYkJDbDd2NkM4eFZNPSJ9.eyJqdGkiOiJkMjIwMzM0MTMyNjI0MzYxYmI3OWQxMGU5YTkwYWI3MSIsImV4dF9hdHRyIjp7ImVuaGFuY2VyIjoiWFNVQUEiLCJzdWJhY2NvdW50aWQiOiI2OTNjZTAxYy0wODk5LTRlZjgtYTAyOS0xYjE4MjFiYTczNWUiLCJ6ZG4iOiJjaWFzLWRldmVsb3BtZW50Iiwic2VydmljZWluc3RhbmNlaWQiOiJlODZkMWRmNy0xMzFkLTQ1NTgtYmMwYy02YWNhYTVmMzJiMzEifSwic3ViIjoic2ItZTg2ZDFkZjctMTMxZC00NTU4LWJjMGMtNmFjYWE1ZjMyYjMxIWIxNjk5fGF6dXJlLW9wZW5haS1zZXJ2aWNlLWkwNTcxNDkteHMhYjcwMjMwIiwiYXV0aG9yaXRpZXMiOlsidWFhLnJlc291cmNlIl0sInNjb3BlIjpbInVhYS5yZXNvdXJjZSJdLCJjbGllbnRfaWQiOiJzYi1lODZkMWRmNy0xMzFkLTQ1NTgtYmMwYy02YWNhYTVmMzJiMzEhYjE2OTl8YXp1cmUtb3BlbmFpLXNlcnZpY2UtaTA1NzE0OS14cyFiNzAyMzAiLCJjaWQiOiJzYi1lODZkMWRmNy0xMzFkLTQ1NTgtYmMwYy02YWNhYTVmMzJiMzEhYjE2OTl8YXp1cmUtb3BlbmFpLXNlcnZpY2UtaTA1NzE0OS14cyFiNzAyMzAiLCJhenAiOiJzYi1lODZkMWRmNy0xMzFkLTQ1NTgtYmMwYy02YWNhYTVmMzJiMzEhYjE2OTl8YXp1cmUtb3BlbmFpLXNlcnZpY2UtaTA1NzE0OS14cyFiNzAyMzAiLCJncmFudF90eXBlIjoiY2xpZW50X2NyZWRlbnRpYWxzIiwicmV2X3NpZyI6ImE2YjY2Y2E5IiwiaWF0IjoxNjk1MTg0NTIzLCJleHAiOjE2OTUyMjc3MjMsImlzcyI6Imh0dHBzOi8vY2lhcy1kZXZlbG9wbWVudC5hdXRoZW50aWNhdGlvbi5ldTEyLmhhbmEub25kZW1hbmQuY29tL29hdXRoL3Rva2VuIiwiemlkIjoiMWM2MmM2YWYtOGQxZS00NTBhLTk1MTQtYThlNzMzZDYwNTliIiwiYXVkIjpbInVhYSIsInNiLWU4NmQxZGY3LTEzMWQtNDU1OC1iYzBjLTZhY2FhNWYzMmIzMSFiMTY5OXxhenVyZS1vcGVuYWktc2VydmljZS1pMDU3MTQ5LXhzIWI3MDIzMCJdfQ.FQtOfGFIVXDuKHzfENGQOg2Q89Hbp1SyZdjlObpqa4FhRHi5OCoyWjGirweLNmsYzyFA2_jKgKWC9wKRuzRAhB6KwA80ujptFfBz1H5q_KzR72UhMpM0DcGyH6POPu4UKelCTnfsSyA2Xshuxc77Qnv8LNJDM5ncWA5r0K80A2zBivvI8eqUb34r38qLZEH0T2GK3WuRAdm1twynuKvOaqh4Ci911VCbMKFvRs8RJFmE0qTCkHgu5sCqTLeSk3PzfjmHRsaluqnv6GRNAOOC4VNrxq13u7iSHeAJOi_6esUj8---WdYGECA-nEgoPHn9vOGnxONH3Nx6bGb-siv4eA",
              //       "Custom-Header": "Header-Value"
              //       },
              //       data: JSON.stringify(data),
              //     // eslint-disable-next-line no-shadow,no-unused-vars
              //       success: function(data_result){
              //         that.getView().setBusy(false);
              //         // const JsonResponseModel = new sap.ui.model.json.JSONModel();
              //         // JsonResponseModel.setData(data_result.choices[0].text);
              //         that.getView().byId("input-b").setValue(data_result.choices[0].text);
              //         // sap.ui.core.BusyIndicator.hide();
              //
              //         // that.getView().setModel(JsonResponseModel, "jsonModel");
              //         //     sap.m.MessageToast.show(data_result);
              //
              //            }
              //       });


            },
          fetchEmbeddings: function(){
            const that = this;
            // that.getView().setBusy(true);
            // sap.ui.core.BusyIndicator.insertContent("text",0);

            const usecase_data = that.getView().byId("input-a").getValue();
          // Embedding API call

            const data = {
              "deployment_id": "text-embedding-ada-002-v2",
              "input": usecase_data

            };
            $.ajax({
              url: "https://azure-openai-serv-i057149.cfapps.eu12.hana.ondemand.com/api/v1/embeddings",
              method: "POST",
              async: false,
              contentType: "application/json",
              headers: {
                "Authorization": "Bearer .eyJqdGkiOiI4MTgwMTc4ODBhMjI0MjU0YmJmNzc0OGZiYTIzNDk4ZSIsImV4dF9hdHRyIjp7ImVuaGFuY2VyIjoiWFNVQUEiLCJzdWJhY2NvdW50aWQiOiI2OTNjZTAxYy0wODk5LTRlZjgtYTAyOS0xYjE4MjFiYTczNWUiLCJ6ZG4iOiJjaWFzLWRldmVsb3BtZW50Iiwic2VydmljZWluc3RhbmNlaWQiOiJlODZkMWRmNy0xMzFkLTQ1NTgtYmMwYy02YWNhYTVmMzJiMzEifSwic3ViIjoic2ItZTg2ZDFkZjctMTMxZC00NTU4LWJjMGMtNmFjYWE1ZjMyYjMxIWIxNjk5fGF6dXJlLW9wZW5haS1zZXJ2aWNlLWkwNTcxNDkteHMhYjcwMjMwIiwiYXV0aG9yaXRpZXMiOlsidWFhLnJlc291cmNlIl0sInNjb3BlIjpbInVhYS5yZXNvdXJjZSJdLCJjbGllbnRfaWQiOiJzYi1lODZkMWRmNy0xMzFkLTQ1NTgtYmMwYy02YWNhYTVmMzJiMzEhYjE2OTl8YXp1cmUtb3BlbmFpLXNlcnZpY2UtaTA1NzE0OS14cyFiNzAyMzAiLCJjaWQiOiJzYi1lODZkMWRmNy0xMzFkLTQ1NTgtYmMwYy02YWNhYTVmMzJiMzEhYjE2OTl8YXp1cmUtb3BlbmFpLXNlcnZpY2UtaTA1NzE0OS14cyFiNzAyMzAiLCJhenAiOiJzYi1lODZkMWRmNy0xMzFkLTQ1NTgtYmMwYy02YWNhYTVmMzJiMzEhYjE2OTl8YXp1cmUtb3BlbmFpLXNlcnZpY2UtaTA1NzE0OS14cyFiNzAyMzAiLCJncmFudF90eXBlIjoiY2xpZW50X2NyZWRlbnRpYWxzIiwicmV2X3NpZyI6ImE2YjY2Y2E5IiwiaWF0IjoxNjk3MDg1ODk0LCJleHAiOjE2OTcxMjkwOTQsImlzcyI6Imh0dHBzOi8vY2lhcy1kZXZlbG9wbWVudC5hdXRoZW50aWNhdGlvbi5ldTEyLmhhbmEub25kZW1hbmQuY29tL29hdXRoL3Rva2VuIiwiemlkIjoiMWM2MmM2YWYtOGQxZS00NTBhLTk1MTQtYThlNzMzZDYwNTliIiwiYXVkIjpbInVhYSIsInNiLWU4NmQxZGY3LTEzMWQtNDU1OC1iYzBjLTZhY2FhNWYzMmIzMSFiMTY5OXxhenVyZS1vcGVuYWktc2VydmljZS1pMDU3MTQ5LXhzIWI3MDIzMCJdfQ.h75fZBLKQxnP1ydps8nPgyUj8zeJ86KIxZraWT2y6ftcpGDf0m6z1mWfz8xT3i3btmqfRRPRmiXy5vhp6LYjNBDysVSGx0lmVqiM5gwkI8OLJBaXmTgSQQ5oyWT0wkoJYzFwU6n4cWdEXk7e7BK_ALm-xlsnCQF2peulAGKLTdW8_eixqBr3FjXUPUsw3au3vwApxnGXwjZBuKkTvhtvyQ83qgYGP1yh3xynwWSZUUkBCDxeeqJBOAf7xDAJW4TW5W5kL2fUVIGUVhgTNpBd_l5RnabOnMGZ0yDcP04KBluAZEDZLbtJ3vbH2-ub4kuWWbjH7MHRrT0Jz6RttOBtxQ",
                'Custom-Header': "Header-Value"
              },
              data: JSON.stringify(data),
              // eslint-disable-next-line no-shadow,no-unused-vars
              success: function(data_result){
                that.handleVectorSearchCall(usecase_data, data_result.data[0].embedding);
                // that.getView().setBusy(false);
                // that.getView().byId("input-b").setValue(data_result.choices[0].text);
              }
            });
          },
          handleVectorSearchCall: function(usecase, vector){
            const that = this;
            const data = {
              "input_vector": vector
            };
            $.ajax({
              url: "http://127.0.0.1:5000/get_similarity",
              method: "POST",
              async: false,
              contentType: "application/json",
              data: JSON.stringify(data),
              // eslint-disable-next-line no-shadow,no-unused-vars
              success: function(data_result){
                that.completionCall(usecase, data_result);
              }
            });
          },
          completionCall: function(usecase_data, data_result) {
            const that = this;
            // that.getView().setBusy(true);
            // sap.ui.core.BusyIndicator.insertContent("text",0);
            const prompt_data = data_result.similarity_list;
            let vectorResultData;

            for (let i = 0; i < prompt_data.length; i++) {
              vectorResultData = vectorResultData + prompt_data[i].detailed_summary;
            }

              const totalLength = vectorResultData.length;
              const partLength = Math.ceil(totalLength / 4);

              const parts = [];
              for (let j = 0; j < 4; j++) {
                const start = j * partLength;
                const end = start + partLength;
                parts.push(vectorResultData.slice(start, end));
                let data;
                if (j === 3) {
                  data = {
                    "deployment_id": "text-davinci-003",
                    "prompt": `Given data is a combination of UseCases (USECASE_TAG) and services(SERVICE_TAG):${parts[j]} ; Using this data of USECASE_TAG and SERVICE_TAG provided till now Calculate the services to be  used using the list of services(SERVICE_TAG) and usecases(USECASE_TAG) for the following Customer_USE_CASE and mention the reason why each SERVICE_TAG suggested(suggest atleast 4 with reason why is it recommended for Customer_USE_CASE), Customer_USE_CASE :${usecase_data} ;Generate Result now [3/4] `,
                    "max_tokens": 1500,
                    "temperature": 0.5,
                    "n": 1
                  };
                } else {



                data = {
                  "deployment_id": "text-davinci-003",
                  "prompt": `Given data is a combination of UseCases (USECASE_TAG) and services(SERVICE_TAG):${parts[j]} ; Using this data of Use Case Title and SERVICE_TAG provided till now can you calculate the list of services(SERVICE_TAG) and usecases(USECASE_TAG) that would be useful for implementing the following Customer_USE_CASE and mention the reason, Customer_USE_CASE :${usecase_data}Dont answer yet , wait for rest part of prompt until it is [3/4] currently count is :` + `[${j}/4]`,
                  "max_tokens": 1000,
                  "temperature": 0.5,
                  "n": 1
                };
              }
                $.ajax({
                  url: "https://azure-openai-serv-i057149.cfapps.eu12.hana.ondemand.com/api/v1/completions",
                  method: "POST",
                  async: false,
                  contentType: "application/json",
                  headers: {
                    "Authorization": "Bearer eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vY2lhcy1kZXZlbG9wbWVudC5hdXRoZW50aWNhdGlvbi5ldTEyLmhhbmEub25kZW1hbmQuY29tL3Rva2VuX2tleXMiLCJraWQiOiJkZWZhdWx0LWp3dC1rZXktMTc2NTgyOTIwMiIsInR5cCI6IkpXVCIsImppZCI6ICJhYXBpdityZGV2WHdPUkViSGtPQUNKcXNaRjNBMU14K1l3VnBVVXBzZHlNPSJ9.eyJqdGkiOiJjMDk2MDM0MzQzZTU0MTE4YWQyYjM0NjAzN2YxZDRkNiIsImV4dF9hdHRyIjp7ImVuaGFuY2VyIjoiWFNVQUEiLCJzdWJhY2NvdW50aWQiOiI2OTNjZTAxYy0wODk5LTRlZjgtYTAyOS0xYjE4MjFiYTczNWUiLCJ6ZG4iOiJjaWFzLWRldmVsb3BtZW50Iiwic2VydmljZWluc3RhbmNlaWQiOiJlODZkMWRmNy0xMzFkLTQ1NTgtYmMwYy02YWNhYTVmMzJiMzEifSwic3ViIjoic2ItZTg2ZDFkZjctMTMxZC00NTU4LWJjMGMtNmFjYWE1ZjMyYjMxIWIxNjk5fGF6dXJlLW9wZW5haS1zZXJ2aWNlLWkwNTcxNDkteHMhYjcwMjMwIiwiYXV0aG9yaXRpZXMiOlsidWFhLnJlc291cmNlIl0sInNjb3BlIjpbInVhYS5yZXNvdXJjZSJdLCJjbGllbnRfaWQiOiJzYi1lODZkMWRmNy0xMzFkLTQ1NTgtYmMwYy02YWNhYTVmMzJiMzEhYjE2OTl8YXp1cmUtb3BlbmFpLXNlcnZpY2UtaTA1NzE0OS14cyFiNzAyMzAiLCJjaWQiOiJzYi1lODZkMWRmNy0xMzFkLTQ1NTgtYmMwYy02YWNhYTVmMzJiMzEhYjE2OTl8YXp1cmUtb3BlbmFpLXNlcnZpY2UtaTA1NzE0OS14cyFiNzAyMzAiLCJhenAiOiJzYi1lODZkMWRmNy0xMzFkLTQ1NTgtYmMwYy02YWNhYTVmMzJiMzEhYjE2OTl8YXp1cmUtb3BlbmFpLXNlcnZpY2UtaTA1NzE0OS14cyFiNzAyMzAiLCJncmFudF90eXBlIjoiY2xpZW50X2NyZWRlbnRpYWxzIiwicmV2X3NpZyI6ImE2YjY2Y2E5IiwiaWF0IjoxNjk3MDg5MTUyLCJleHAiOjE2OTcxMzIzNTIsImlzcyI6Imh0dHBzOi8vY2lhcy1kZXZlbG9wbWVudC5hdXRoZW50aWNhdGlvbi5ldTEyLmhhbmEub25kZW1hbmQuY29tL29hdXRoL3Rva2VuIiwiemlkIjoiMWM2MmM2YWYtOGQxZS00NTBhLTk1MTQtYThlNzMzZDYwNTliIiwiYXVkIjpbInVhYSIsInNiLWU4NmQxZGY3LTEzMWQtNDU1OC1iYzBjLTZhY2FhNWYzMmIzMSFiMTY5OXxhenVyZS1vcGVuYWktc2VydmljZS1pMDU3MTQ5LXhzIWI3MDIzMCJdfQ.ej8eVYMSNX-E0eOIt1gZq3h8Yh5CqtSZJg3ri6uH9jH0UrLasWhktErP2Wda8JQNThzib87b1K6mEZNOo_UKlEVZfltsC9m3ovkt1hLtZn6npemqyzjT_0N6RuQ1dfNzg8Rj4gDKo4YVxy6066S-5hLxLG-5YF3wSJX0ACpJs-y9WjKwZb-AjDF3deCqIkQ5xhWRV6PB12nnLhU5TsfEoj3z_sGCKj3S71gv6xpe_Xygw-KZIRTOIViSWEXALRUFJx5T7ljkPgOJOSLQucZ3qqj7qyp1v7gmE8NBIhSo5Dlf8aRtc2HD7OCkKXcqbY9Aq4SEWu4ie1Sc7vZPs9eKaw",
                    "Custom-Header": "Header-Value"
                  },
                  data: JSON.stringify(data),
                  // eslint-disable-next-line no-shadow,no-unused-vars
                  success: function (data_result) {
                    that.getView().setBusy(false);
                    // const JsonResponseModel = new sap.ui.model.json.JSONModel();
                    // JsonResponseModel.setData(data_result.choices[0].text);
                    that.getView().byId("input-b").setValue(data_result.choices[0].text);
                    // sap.ui.core.BusyIndicator.hide();

                    // that.getView().setModel(JsonResponseModel, "jsonModel");
                    //     sap.m.MessageToast.show(data_result);
                    that.JsonResponseModel = data_result.choices[0].text;
                  }
                });
              }

          },
          getHLD:function(){


          const that = this;
            setTimeout(function () {
              that.getView().byId("input-HLD").setValue("    ABC Company Use Case Architecture\n" +
                "\n" +
                "          +---------------------+  (1. Real-time Inventory Visibility)\n" +
                "          |                    |\n" +
                "          | SAP S/4HANA        |  (2. Automates Inventory Tracking and Replenishment)\n" +
                "          | (Inventory)        |\n" +
                "          |                    |\n" +
                "          +---------+----------+\n" +
                "                    |\n" +
                "                    |\n" +
                "          +---------v----------+\n" +
                "          |                    |\n" +
                "          | SAP Extended      |  (3. Warehouse Optimization)\n" +
                "          | Warehouse Mgmt     |\n" +
                "          |                    |\n" +
                "          +---------+----------+\n" +
                "                    |\n" +
                "                    |\n" +
                "          +---------v----------+\n" +
                "          |                    |\n" +
                "          | SAP Integration    |  (4. Seamless Data Exchange)\n" +
                "          | Suite              |\n" +
                "          |                    |\n" +
                "          +---------+----------+\n" +
                "                    |\n" +
                "                    |\n" +
                "          +---------v----------+\n" +
                "          |                    |\n" +
                "          | SAP Transport     |  (5. Transportation Optimization)\n" +
                "          | Management         |\n" +
                "          |                    |\n" +
                "          +---------+----------+\n" +
                "                    |\n" +
                "                    |\n" +
                "          +---------v----------+\n" +
                "          |                    |\n" +
                "          | Existing Systems   |  (6. Integration with Existing Systems)\n" +
                "          |                    |\n" +
                "          +---------------------+\n");
              // Code to execute after the delay
              // You can place your code here
            }, 3000);
              //  const  data_input =  `TRY TO USE THE SERVICES provided in prompt_data TO BUILD A DATA FLOW of USECASE(provided later) AND REPRESENT IT IN ASCII FORMAT  WITH COMMENTS ON EACH FLOW ;USECASE : ABC company needs a solution that provides real-time visibility into inventory levels, automates inventory tracking and replenishment, improves the accuracy of inventory data, and integrates with its existing systems.Try to represent it in  ASCII format.The prompt_data :${  that.JsonResponseModel}`;
              //
              //  const  data = {
              //    "deployment_id": "text-davinci-003",
              //    "prompt": data_input,
              //    "max_tokens": 1000,
              //    "temperature": 0.5,
              //    "n": 1
              //  };
              //
              // $.ajax({
              //   url: "https://azure-openai-serv-i057149.cfapps.eu12.hana.ondemand.com/api/v1/completions",
              //   method: "POST",
              //   async: false,
              //   contentType: "application/json",
              //   headers: {
              //     "Authorization": "Bearer eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vY2lhcy1kZXZlbG9wbWVudC5hdXRoZW50aWNhdGlvbi5ldTEyLmhhbmEub25kZW1hbmQuY29tL3Rva2VuX2tleXMiLCJraWQiOiJkZWZhdWx0LWp3dC1rZXktMTc2NTgyOTIwMiIsInR5cCI6IkpXVCIsImppZCI6ICJhYXBpdityZGV2WHdPUkViSGtPQUNKcXNaRjNBMU14K1l3VnBVVXBzZHlNPSJ9.eyJqdGkiOiJjMDk2MDM0MzQzZTU0MTE4YWQyYjM0NjAzN2YxZDRkNiIsImV4dF9hdHRyIjp7ImVuaGFuY2VyIjoiWFNVQUEiLCJzdWJhY2NvdW50aWQiOiI2OTNjZTAxYy0wODk5LTRlZjgtYTAyOS0xYjE4MjFiYTczNWUiLCJ6ZG4iOiJjaWFzLWRldmVsb3BtZW50Iiwic2VydmljZWluc3RhbmNlaWQiOiJlODZkMWRmNy0xMzFkLTQ1NTgtYmMwYy02YWNhYTVmMzJiMzEifSwic3ViIjoic2ItZTg2ZDFkZjctMTMxZC00NTU4LWJjMGMtNmFjYWE1ZjMyYjMxIWIxNjk5fGF6dXJlLW9wZW5haS1zZXJ2aWNlLWkwNTcxNDkteHMhYjcwMjMwIiwiYXV0aG9yaXRpZXMiOlsidWFhLnJlc291cmNlIl0sInNjb3BlIjpbInVhYS5yZXNvdXJjZSJdLCJjbGllbnRfaWQiOiJzYi1lODZkMWRmNy0xMzFkLTQ1NTgtYmMwYy02YWNhYTVmMzJiMzEhYjE2OTl8YXp1cmUtb3BlbmFpLXNlcnZpY2UtaTA1NzE0OS14cyFiNzAyMzAiLCJjaWQiOiJzYi1lODZkMWRmNy0xMzFkLTQ1NTgtYmMwYy02YWNhYTVmMzJiMzEhYjE2OTl8YXp1cmUtb3BlbmFpLXNlcnZpY2UtaTA1NzE0OS14cyFiNzAyMzAiLCJhenAiOiJzYi1lODZkMWRmNy0xMzFkLTQ1NTgtYmMwYy02YWNhYTVmMzJiMzEhYjE2OTl8YXp1cmUtb3BlbmFpLXNlcnZpY2UtaTA1NzE0OS14cyFiNzAyMzAiLCJncmFudF90eXBlIjoiY2xpZW50X2NyZWRlbnRpYWxzIiwicmV2X3NpZyI6ImE2YjY2Y2E5IiwiaWF0IjoxNjk3MDg5MTUyLCJleHAiOjE2OTcxMzIzNTIsImlzcyI6Imh0dHBzOi8vY2lhcy1kZXZlbG9wbWVudC5hdXRoZW50aWNhdGlvbi5ldTEyLmhhbmEub25kZW1hbmQuY29tL29hdXRoL3Rva2VuIiwiemlkIjoiMWM2MmM2YWYtOGQxZS00NTBhLTk1MTQtYThlNzMzZDYwNTliIiwiYXVkIjpbInVhYSIsInNiLWU4NmQxZGY3LTEzMWQtNDU1OC1iYzBjLTZhY2FhNWYzMmIzMSFiMTY5OXxhenVyZS1vcGVuYWktc2VydmljZS1pMDU3MTQ5LXhzIWI3MDIzMCJdfQ.ej8eVYMSNX-E0eOIt1gZq3h8Yh5CqtSZJg3ri6uH9jH0UrLasWhktErP2Wda8JQNThzib87b1K6mEZNOo_UKlEVZfltsC9m3ovkt1hLtZn6npemqyzjT_0N6RuQ1dfNzg8Rj4gDKo4YVxy6066S-5hLxLG-5YF3wSJX0ACpJs-y9WjKwZb-AjDF3deCqIkQ5xhWRV6PB12nnLhU5TsfEoj3z_sGCKj3S71gv6xpe_Xygw-KZIRTOIViSWEXALRUFJx5T7ljkPgOJOSLQucZ3qqj7qyp1v7gmE8NBIhSo5Dlf8aRtc2HD7OCkKXcqbY9Aq4SEWu4ie1Sc7vZPs9eKaw",
              //     "Custom-Header": "Header-Value"
              //   },
              //   data: JSON.stringify(data),
              //   // eslint-disable-next-line no-shadow,no-unused-vars
              //   success: function (data_result) {
              //     // that.getView().setBusy(false);
              //     // const JsonResponseModel = new sap.ui.model.json.JSONModel();
              //     // JsonResponseModel.setData(data_result.choices[0].text);

                  // sap.ui.core.BusyIndicator.hide();

                  // that.getView().setModel(JsonResponseModel, "jsonModel");
                  //     sap.m.MessageToast.show(data_result);
                  // this.getHLD(data_result.choices[0].text);
              //   }
              // });


          },
      getOwner:function(){
        this.getView().byId("input-HLD").setValue("1. SAP S/4HANA, Owner: XYZ, Price: 10 Euro/user\n" +
          "2. SAP Extended Warehouse Management, Owner: XYZ, Price: 10 Euro/user\n" +
          "3. SAP Integration Suite, Owner: XYZ, Price: 10 Euro/user\n" +
          "4. SAP Analytics Cloud, Owner: XYZ, Price: 10 Euro/user\n");
      },
          onLoginAsSMEPageNavigate: function(){
              this.getRouter().navTo("SMEInterface");
          },
          getRouter: function () {
            return this.getOwnerComponent().getRouter();
          }
        });
    },
);
