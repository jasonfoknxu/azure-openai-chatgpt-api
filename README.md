# Azure OpenAI GPT-4 / ChatGPT API

A simple RESTful API of GPT-4 / ChatGPT with Azure OpenAI Service, build with TypeScript and Node.js Express

:warning: Design for testing and internal use only. :warning:

## Features
- Base on Azure OpenAI Service REST API
- One endpoint for simple usage
- Flexible and easily extensible for future development
- Logit bias & function call are not supported yet
- RESTful API structure
- Ready for use with PM2
- Build with TypeScript, Node.js, Express

---

## Config

| Config Name | Required? | Default Value | Description |
| --- | --- | --- | --- |
| HTTP_PORT | :heavy_check_mark: | 80 | The HTTP port number of API |
| HTTPS_PORT | :white_check_mark: | 443 | The HTTPS port number of API *(if ENABLE_SSL=true)* |
| ENABLE_SSL | :white_check_mark: | false | Use HTTPS or not |
| SSL_CERT | :white_check_mark: | N/A | The SSL certificate file path *(if ENABLE_SSL=true)* |
| SSL_KEY | :white_check_mark: | N/A | The SSL private key file path *(if ENABLE_SSL=true)* |
| ENDPOINT | :heavy_check_mark: | N/A | The Azure OpenAI Service endpoint URL |
| DEPLOYMENT_NAME | :heavy_check_mark: | N/A | The deployment name of Azure OpenAI Service |
| API_VERSION | :heavy_check_mark: | N/A | The API version of Azure OpenAI Service |
| KEY | :heavy_check_mark: | N/A | The API key for accessing the Azure OpenAI Service |
| temperature | :x: | 1 *(A)* | The default sampling temperature value for GPT model output |
| top_p | :x: | N/A | The default top_p value for GPT model output |
| n | :x: | 1 *(A)* | The default number of chat completion choices to generate for GPT model output |
| stream | :x: | false *(A)* | The default boolean value indicating whether to stream GPT model output |
| stop | :x: | null *(A)* | The default sequences where the GPT model stop output |
| max_tokens | :x: | inf *(A)* | The default maximum number of tokens allowed for GPT model output |
| presence_penalty | :x: | 0 *(A)* | The default presence penalty number for GPT model output |
| frequency_penalty | :x: | 0 *(A)* | The default frequency penalty number for GPT model output |
| user | :x: | N/A | The unique identifier of user for Azure OpenAI |

\**(A)*: Azure OpenAI Default value (may be changed by Azure OpenAI Service)

\*\*For the details of GPT options, you may refer to the [API doc](#api-doc) below or the [Official document](#reference)

---

## API doc

### Chat Completions
- Request Method: `POST`
- API Endpoint: `/v1/gpt/chat`

#### Request Body

> Only prompt/userPrompt is required, all other params are optional.

| Param Name | Type | Default Value | Description |
| --- | --- | --- | --- |
| `prompt` | string | N/A | Alias of `userPrompt` |
| `userPrompt` | string | N/A | User prompt input for chat completions |
| `systemPrompt` | string | N/A | System prompt to instruct or set the behavior of the assistant |
| `assistantPrompt` | string | N/A | Assistant prompt provides responses to system-instructed, user-prompted input |
| `temperature` | number | 1 *(A)* | What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.\nWe generally recommend altering this or `top_p` but not both. |
| `top_p` | number | 1 *(A)* | An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered. We generally recommend altering this or temperature but not both. |
| `n` | integer | 1 *(A)* | How many chat completion choices to generate for each input message. |
| `stream` | boolean | false *(A)* | If set, partial message deltas will be sent, like in ChatGPT. Tokens will be sent as data-only server-sent events as they become available, with the stream terminated by a `data: [DONE]` message." |
| `stop` | string / array | null *(A)* | Up to 4 sequences where the API will stop generating further tokens. |
| `max_tokens` | integer | inf *(A)* | The maximum number of tokens allowed for the generated answer. By default, the number of tokens the model can return will be (4096 - prompt tokens). |
| `presence_penalty` | number | 0 *(A)* | Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics. |
| `frequency_penalty` | number | 0 *(A)* | Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim. |
| `user` | string | N/A | A unique identifier representing your end-user, which can help Azure OpenAI to monitor and detect abuse. |

---

## Build & Start
1. You must have enabled the Azure AI services - Azure OpenAI of your Azure account first
2. `git clone https://github.com/jasonfoknxu/azure-openai-chatgpt-api` to download the source code 
3. `yarn` or `npm install` to install all the dependencies
4. Copy the `sample.env` file and rename as `.env`
5. Edit the config in the `.env` file
6. `yarn run build` or `npm run build` to compile the scripts
7. `yarn start` or `npm start` to start the API server

---

## Reference
<https://learn.microsoft.com/en-us/azure/ai-services/openai/reference>
