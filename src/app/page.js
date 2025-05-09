// 標示這是客戶端組件，表示這個組件會在瀏覽器中執行
'use client';

// 引入需要的 React 功能和組件
import Link from "next/link";  // 引入 Link 組件來進行路由導航
import { useState, useEffect } from "react";  // 引入 React 的 useState hook 來管理狀態
import TaskList from "../components/TaskList.js"; // 引入 TaskList 組件來顯示任務列表

// 定義首頁組件
export default function Home() {
  // 使用 useState 創建兩個狀態：
  // newTask: 存儲輸入框中的新任務文字
  // tasks: 存儲所有任務的陣列
  const [newTask, setNewTask] = useState('');
  const [nextId, setNextId]=useState(1); // 用於生成唯一的任務 ID

useEffect(()=>{
  const saveTasks = JSON.parse(localStorage.getItem('tasks')) || []; // 從 localStorage 獲取已保存的任務
  setTasks(saveTasks); // 將獲取的任務設置到 tasks 狀態中
  const maxId = saveTasks.reduce((max, task) => Math.max(max, task.id), 0); // 獲取任務中最大的 ID
  setNextId(maxId + 1); // 設置下一個任務的 ID
},[]); // 空依賴數組表示這個 effect 只在組件首次渲染時執行

  const [tasks, setTasks]=useState([]);

  // 定義添加任務的函數
  const addTask=()=>{
    // 檢查是否有輸入內容
    if(newTask.trim() === '') return;
    // 使用展開運算符 (...) 創建一個新的任務陣列，並加入新任務
    const updatedTasks= [...tasks, newTask];
    // 更新任務列表
    setTasks(updatedTasks);
    // 清空輸入框
    setNewTask('');

    setNextId(nextId + 1); // 更新下一個任務的 ID
    localStorage.setItem('tasks', JSON.stringify(updatedTasks)); // 將任務列表保存到 localStorage
  };

const newTaskObj = {
  id: nextId,
  title: newTask,
  description: '',
};
const updatedTasks = [...tasks, newTaskObj]; // 將新任務對象添加到任務列表中


  // 定義刪除任務的函數
  const handleDelete = (index)=>{
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
    localStorage.setItem('tasks', JSON.stringify(newTasks)); // 將更新後的任務列表保存到 localStorage
  }

  // 定義清除所有任務的函數
  const clearTasks = () => {
    // 將任務陣列設為空陣列，即清除所有任務
    setTasks([]);
  }

  // 渲染組件的 UI
  return (
    <main className="p-4 max-w-md mx-auto">
        <h1 className="text-2xl font-bold">Task Board</h1>

        {/* 輸入區域：包含輸入框和添加按鈕 */}
        <div className="flex gap-2 mb-4">
          <input
            className="border p-2 flex-1"
            placeholder="Enter a task"
            value={newTask}  // 輸入框的值由 newTask 狀態控制
            onChange= {(e)=> setNewTask(e.target.value)}  // 當輸入內容改變時更新 newTask
          />
          <button
            className="bg-blue-500 text-white px-4"
            onClick={addTask}  // 點擊按鈕時調用 addTask 函數
          >添加</button>
          <button
            className="bg-red-500 text-white px-4"
            onClick={clearTasks}  // 點擊按鈕時調用 clearTasks 函數
          >清除全部</button>
        </div>
        {/* 顯示任務列表組件，將 tasks 陣列作為屬性傳遞 */}
        <TaskList tasks={tasks} onDelete={handleDelete} /> {/* TaskList 可接受的變數tasks以及函數onDelete */}
    </main>
  );
}
