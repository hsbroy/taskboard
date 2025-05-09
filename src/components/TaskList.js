'use client'; // 引入 React 的 useState 和 useEffect hook
import Link from 'next/link'; // 引入 Link 組件來進行路由導航

// TaskList 組件：負責顯示任務列表
// 接收 tasks 陣列作為參數(props)
export default function TaskList({tasks,onDelete}){
    return(
        // 創建一個無序列表，列表項之間有間距 (space-y-2)
        <ul className="space-y-2">
            {/* 使用 map 函數遍歷 tasks 陣列，為每個任務創建一個列表項 */}
            {tasks.map((task) => (
                // key 屬性幫助 React 追踪列表項
                // 為每個列表項添加邊框和圓角樣式
                <li key={task.id} className="border p-2 rounded flex justify-between items-center">
                    <Link 
                        href={`/task/${task.id}`}
                        className="text-blue-500 hover:underline"
                    >
                        {task.title}
                    </Link> {/* 使用 Link 組件來導航到任務詳情頁 */}
                    <button
                        className="text-red-500"
                        onClick={() => onDelete(index)}
                    >
                        Delete
                    </button>
                </li>
                
            ))}
        </ul>
    )
}