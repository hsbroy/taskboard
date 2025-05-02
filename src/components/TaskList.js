// TaskList 組件：負責顯示任務列表
// 接收 tasks 陣列作為參數(props)
export default function TaskList({tasks}){
    return(
        // 創建一個無序列表，列表項之間有間距 (space-y-2)
        <ul className="space-y-2">
            {/* 使用 map 函數遍歷 tasks 陣列，為每個任務創建一個列表項 */}
            {tasks.map((task, index) => (
                // key 屬性幫助 React 追踪列表項
                // 為每個列表項添加邊框和圓角樣式
                <li key={index} className="border p-2 rounded">
                    {task}  {/* 顯示任務內容 */}
                </li>
            ))}
        </ul>
    )
}