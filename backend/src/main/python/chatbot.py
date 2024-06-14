import os
from llama_index.core import VectorStoreIndex, SimpleDirectoryReader, StorageContext, load_index_from_storage
from dotenv import load_dotenv
from llama_index.core import Settings
load_dotenv()

Settings.chunk_size = 512
Settings.chunk_overlap = 50

os.environ["OPENAI_API_KEY"] = os.getenv("CHATBOT_API_KEY")

class Chatbot:
    def __init__(self):
        if os.path.exists("./storage") and len(os.listdir("./storage")) != 0:
            # rebuild storage context
            storage_context = StorageContext.from_defaults(persist_dir="./storage")
            # load index
            self.index = load_index_from_storage(storage_context)
        else:
            documents = SimpleDirectoryReader('data').load_data()
            self.index = VectorStoreIndex.from_documents(documents)
            self.index.storage_context.persist()
        self.query_engine = self.index.as_query_engine(similarity_top_k=4)
        print('Start chatbot')

    def query(self, user_input):
        return self.query_engine.query(user_input).response
    class Java:
        implements = ["com.example.QuanLyNhaXe.interfaces.Chatbot"]

from py4j.java_gateway import JavaGateway, CallbackServerParameters
chatbot = Chatbot()
gateway = JavaGateway(
    callback_server_parameters=CallbackServerParameters(),
    python_server_entry_point=chatbot)