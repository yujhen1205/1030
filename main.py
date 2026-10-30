from fastapi import FastAPI
import activity  # 引入你剛寫好的活動模組

app = FastAPI()

#aaaaa
# 將 activity.py 裡的路由掛載進來
app.include_router(activity.router)