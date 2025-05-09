'use client';

import {useRouter} from 'next/navigation'; // 引入 useRouter 來進行路由導航
import {useEffect, useState} from 'react'; // 引入 useEffect 和 useState 來管理狀態和副作用

export default function TaskDetail({params}) {
    const router= useRouter(); // 使用 useRouter 來獲取路由對象
    const {id} = params; // 從路由參數中獲取 id
    const [title, setTitle] = useState(''); // 使用 useState 來管理任務標題
    const [description, setDescription] = useState(''); // 使用 useState 來管理任務描述

    const handleSave = () => {
        const savedTasks = JSON.parse(localStrorage.getItem('tasks')) || []; // 從 localStorage 獲取已保存的任務
        const updatedTasks = savedTasks.map((task) => 
            task.id === Number(id) ? {...task, title, description} : task
        ); // 更新任務列表
        localStorage.setItem('tasks', JSON.stringify(updatedTasks)); // 將更新後的任務列表保存到 localStorage
        router.push('/'); // 導航回首頁
    }
    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || []; // 從 localStorage 獲取已保存的任務
        const task = savedTasks.find((t) => t.id === Number(id)); // 根據 id 查找任務
        if (task) {
            setTitle(task.title); // 設置任務標題
            setDescription(task.description); // 設置任務描述
        }
    }, [id]); // 當 id 改變時重新執行
    // useEffect 依賴於 id，當 id 改變時重新執行

    return(
        <main className="p-4 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold">Task Detail</h1>
            <input
                className="border p-2 w-full mb-2"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
            />
            <textarea
                className="border p-2 w-full mb-2"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                row={4}
            />
            <button
                className="bg-green-500 text-white px-4 py-2"
                onClick={handleSave}
            >
                Save
            </button>
        </main>
    )
}