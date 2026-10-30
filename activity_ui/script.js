// UI 展示版：資料只保存在目前瀏覽器的 localStorage，尚未連接資料庫。
const ACTIVITY_KEY = 'activity-demo-activities-v1';
const REGISTRATION_KEY = 'activity-demo-registrations-v1';
const sampleActivities = [
  {id:1,title:'校園桌球交流賽',date:'2026-11-15',description:'歡迎喜歡桌球的同學一起交流切磋！'},
  {id:2,title:'校園志工服務日',date:'2026-11-22',description:'一起參與校園服務活動，認識更多新朋友。'},
  {id:3,title:'Python 入門工作坊',date:'2026-12-05',description:'從零開始學習 Python 基礎程式設計。'}
];
function read(key,fallback){try{const raw=localStorage.getItem(key);return raw?JSON.parse(raw):fallback}catch{return fallback}}
let activities=read(ACTIVITY_KEY,sampleActivities);
let registrations=read(REGISTRATION_KEY,[]);
let selectedActivityId=null;
const $=id=>document.getElementById(id);
function save(){localStorage.setItem(ACTIVITY_KEY,JSON.stringify(activities));localStorage.setItem(REGISTRATION_KEY,JSON.stringify(registrations))}
function show(page){document.querySelectorAll('.page').forEach(el=>el.classList.toggle('active',el.id===page));document.querySelectorAll('.tab').forEach(el=>el.classList.toggle('active',el.dataset.page===page));$('message').textContent='';if(page==='list')renderActivities();if(page==='registrations')renderRegistrations()}
function make(tag,text,className){const el=document.createElement(tag);el.textContent=text;if(className)el.className=className;return el}
function renderActivities(){const box=$('activity-list');box.replaceChildren();if(!activities.length){box.append(make('p','目前沒有活動。','empty'));return}activities.forEach(a=>{const card=make('article','','card');card.append(make('div','活動日期｜'+a.date,'date'),make('h3',a.title),make('p',a.description));const btn=make('button','立即報名','primary');btn.addEventListener('click',()=>{selectedActivityId=a.id;$('register-title').textContent=a.title+'｜報名表';$('register-info').textContent='活動日期：'+a.date;show('register')});card.append(btn);box.append(card)})}
function renderRegistrations(){const select=$('activity-select');const previous=select.value;select.replaceChildren();activities.forEach(a=>{const opt=document.createElement('option');opt.value=a.id;opt.textContent=a.title;select.append(opt)});if(activities.some(a=>String(a.id)===previous))select.value=previous;renderRows()}
function renderRows(){const tbody=$('registration-rows');tbody.replaceChildren();const rows=registrations.filter(r=>String(r.activityId)===$('activity-select').value);if(!rows.length){const tr=document.createElement('tr');const td=make('td','目前沒有報名資料');td.colSpan=3;tr.append(td);tbody.append(tr);return}rows.forEach((r,i)=>{const tr=document.createElement('tr');[String(i+1),r.name,r.phone].forEach(v=>tr.append(make('td',v)));tbody.append(tr)})}
document.querySelectorAll('.tab').forEach(b=>b.addEventListener('click',()=>show(b.dataset.page)));
$('back').addEventListener('click',()=>show('list'));
$('activity-select').addEventListener('change',renderRows);
$('add-form').addEventListener('submit',e=>{e.preventDefault();const f=new FormData(e.currentTarget);activities.push({id:Date.now(),title:String(f.get('title')).trim(),date:String(f.get('date')),description:String(f.get('description')).trim()});save();e.currentTarget.reset();show('list');$('message').textContent='活動新增成功！'});
$('register-form').addEventListener('submit',e=>{e.preventDefault();if(!activities.some(a=>a.id===selectedActivityId))return;const f=new FormData(e.currentTarget);registrations.push({activityId:selectedActivityId,name:String(f.get('name')).trim(),phone:String(f.get('phone')).trim()});save();e.currentTarget.reset();show('list');$('message').textContent='報名成功！可至「報名名單」查看。'});
renderActivities();
