from fastapi import APIRouter, Request, Form, Depends, HTTPException, status
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.templating import Jinja2Templates
from sqlalchemy import Column, Integer, String, Date, Text
from sqlalchemy.orm import Session
from datetime import datetime

# 匯入資料庫連線設定 (請依你的專案檔名修正，如 database.py 或 db.py)
from db import Base, get_db

# 設定模板目錄
templates = Jinja2Templates(directory="templates")

# 建立 Router
router = APIRouter(prefix="", tags=["Activity"])


# ==========================================
# 1. SQLAlchemy 資料庫模型 (Model)
# ==========================================
class Activity(Base):
    __tablename__ = "activities"

    activity_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    activity_name = Column(String(100), nullable=False)
    activity_date = Column(Date, nullable=False)
    description = Column(Text, nullable=True)


# ==========================================
# 2. 路由與業務邏輯 (Routes)
# ==========================================

# 【頁面】1. 活動清單首頁 (GET /)
@router.get("/", response_class=HTMLResponse)
def list_activities(request: Request, db: Session = Depends(get_db)):
    # 從資料庫撈出所有活動，依日期排序
    activities = db.query(Activity).order_by(Activity.activity_date.asc()).all()
    return templates.TemplateResponse(
        "index.html", 
        {"request": request, "activities": activities}
    )


# 【頁面】2. 顯示新增活動表單頁面 (GET /activities/add)
@router.get("/activities/add", response_class=HTMLResponse)
def add_activity_page(request: Request):
    return templates.TemplateResponse("add_activity.html", {"request": request})


# 【動作】3. 接收新增活動表單並寫入資料庫 (POST /activities/add)
@router.post("/activities/add")
def create_activity(
    activity_name: str = Form(...),
    activity_date: str = Form(...),
    description: str = Form(None),
    db: Session = Depends(get_db)
):
    # 轉換日期字串為 Python date 物件
    parsed_date = datetime.strptime(activity_date, "%Y-%m-%d").date()

    # 建立 Activity 物件
    new_activity = Activity(
        activity_name=activity_name,
        activity_date=parsed_date,
        description=description
    )

    # 存入資料庫
    db.add(new_activity)
    db.commit()

    # 新增完畢後，重導向回首頁活動清單
    return RedirectResponse(url="/", status_code=status.HTTP_303_SEE_OTHER)