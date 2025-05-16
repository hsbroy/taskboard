'use client';

import { useState, useEffect } from "react"; // 引入 React 的 useState 和 useEffect hook

export default function TodosPage() {
    const [todos, setTodos] = useState([]) // 宣告變數 todos是變數 setTodos是使用todos這個變數
    const [newTodo, setNewTodo] = useState('') // 宣告變數 newTodo是變數 setNewTodo是使用newTodo這個變數
    const [loading,setLoding] = useState(true) // 宣告變數 loading是變數 setLoading是使用loading這個變數

    useEffect(() => {
        async function fetchTodos() {
            try{
                const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=20'); // 使用 fetch API 獲取任務列表
                if(!res.ok) {
                    throw new Error('Failed to fetch'); // 如果響應不正常，則拋出錯誤
                }

                await new Promise((resolve) => setTimeout(resolve, 3000)); // 模擬延遲(單位:ms)3000ms=3秒

                const data = await res.json(); // 將響應轉換為 JSON 格式
                setTodos(data); // 將獲取的任務列表設置到 todos 狀態中 (白話文就是把data這個變數的值放進去todos這個變數)
            }catch(err) {
                console.log(err.message); // 捕獲錯誤並打印到控制台
            } finally {
                setLoding(false); // 無論成功還是失敗，都將 loading 設置為 false
            }
        } // 因為網頁不會等到所有圖片都載入完再渲染整個網頁，所以使用async搭配awit可以讓程式等await有結果後才會執行下一行。 
        fetchTodos(); // 調用 fetchTodos 函數來獲取任務列表
    },[]) // 迴呼函式(callback function) 會在組件渲染後執行

    return(
        <main className="p-4 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Todos</h1>
            
            {loading && <p>Loading...</p>} {/*if loading is true 就執行這行 */}
            {!loading && (
                <ul className = "space-y-2">
                    {todos.map((todo) => (
                        <li key={todo.id} className="border p-2 rounded">
                            <h2 className="font-semibold">
                                {todo.title}{todo.completed ? 'Done' : ''}
                            </h2>
                        </li>
                    ))}
                </ul>
            )}
        </main>
    );
};
// 在javascript中==和===的區別是 ==是比較值是否相等，===是比較值和型別是否相等