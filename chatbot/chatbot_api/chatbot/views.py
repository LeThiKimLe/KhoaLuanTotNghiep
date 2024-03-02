from django.shortcuts import render

# Create your views here.
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import os
from llama_index.core import VectorStoreIndex, SimpleDirectoryReader, StorageContext, load_index_from_storage

os.environ["OPENAI_API_KEY"] = "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"

class Chatbot:
    def __init__(self):
        if os.path.exists("./storage") and len(os.listdir("./storage")) != 0:
            # rebuild storage context
            print('lấy data cũ')
            storage_context = StorageContext.from_defaults(persist_dir="./storage")
            # load index
            self.index = load_index_from_storage(storage_context)
        else:
            documents = SimpleDirectoryReader('data').load_data()
            self.index = VectorStoreIndex.from_documents(documents)
            self.index.storage_context.persist()

        self.query_engine = self.index.as_query_engine()

    def query(self, user_input):
        return self.query_engine.query(user_input).response

chatbot = Chatbot()

@csrf_exempt
def query(request):
    if request.method == "POST":
        data = request.POST
        user_input = data.get("question")
        if user_input:
            response = chatbot.query(user_input)
            return JsonResponse({"answer": response})
        else:
            return JsonResponse({"error": "Missing 'question' parameter."})
    else:
        return JsonResponse({"error": "Invalid request method."})