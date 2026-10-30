from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def root():
    return {"message": "成功啟動"}