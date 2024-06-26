import {useEffect, useState} from "react";
import './Todos.css';
import Todo from "./Todo";
import ConfirmModal from './ConfirmModal';
import {getTodos, addTodo, delTodo, updateTodo, delTodoAll} from "../api/api";

// 새로운 컴포넌트를 정의합니다.
function Todos() {

    const [newContent, setNewContent] = useState('');
    const [newDescript, setNewDescript] = useState('');
    const [todos, setTodos] = useState([]);
    const [update, setUpdate] = useState(true);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        getTodos()
            .then(todos => {
                setTodos(todos);
            });
    }, [update]);
  
  

    const onClickAdd = () => {
        addTodo(newContent, newDescript, false)
            .then(todo => setUpdate(!update));
    }

    const onClickDelAll = () => {    
        setShowModal(true);
        if (window.confirm('정말 지우시겠습니까?')) {        
            delTodoAll()
            .then(todo => setUpdate(!update))
            .catch(error => console.error('Error deleting all todos:', error));
        }
    }

    const deleteTodo = (id) =>{
        delTodo(id)
            .then(todo => setUpdate(!update));
    }

    const setTodo = (todo)=> {
        console.log(todo);
        updateTodo(todo)
            .then(todo => setUpdate(!update));
    }

    const handleConfirm = () => {
        delTodoAll()
            .then(todo => setUpdate(!update))
            .catch(error => console.error('Error deleting all todos:', error))
            .finally(() => setShowModal(false));
    };

    const handleCancel = () => {
        setShowModal(false);
    };

    return (
        <div className="TodoListApp">
            <h1>TODOs</h1>
            <div className="TodoControl">
                <div className="InputSection">
                    <input
                        type="text"
                        placeholder="Todo"
                        onChange={(e) => setNewContent(e.target.value)}
                        value={newContent}
                        className="NewTodoEdit"
                    />

                    <input
                        type="text"
                        placeholder="Description"
                        onChange={(e) => setNewDescript(e.target.value)}
                        value={newDescript}
                        className="NewTodoDescription"
                    />
                </div>
                <div className="ButtonSection">
                    <button className = "TodoButton" onClick={onClickAdd}>추가</button>
                    <button className = "TodoButton2" onClick={onClickDelAll}>전체삭제</button>
                </div>
                 <ConfirmModal show={showModal} onConfirm={handleConfirm} onCancel={handleCancel} />                         
            </div>
            <div className="Todos">
                <ul className="TodoList">
                    { // todos 배열을 순회하며 각각의 요소를 <li> 태그를 사용하여 출력합니다.
                        todos.map(todo=><Todo
                            key={todo.id}
                            todo={todo}
                            setTodo={setTodo}
                            deleteTodo={deleteTodo}/>)
                    }
                </ul>
            </div>
        </div>
    );
}

// 정의한 컴포넌트를 외부에서 사용할 수 있또록 export 합니다.
export default Todos;
