import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useState } from 'react';


let idEdit;
function App() {
  const [tasks, setTasks] = useState([ //khỏi tạo bảng ban đầu
    { id: 1, task: 'di hoc', isComplete: false },
    { id: 2, task: 'di chơi', isComplete: false },
    { id: 3, task: 'da bong', isComplete: false },
    { id: 4, task: 'choi ghita', isComplete: false }
  ]);

  const [newTask, setNewTask] = useState('') // nhập vào ô input với giá trị ban đầu
  const [editStatus, setEditStatus] = useState(false);

  const addTask = () => { // khai báo thêm mới vào 1 nội dung
    setTasks((preveTask) => [...preveTask, { id: preveTask[preveTask.length - 1].id + 1, task: newTask, isComplete: false }]);
    setNewTask('');
  }

  const deleteTask = (idDel) => { // lấy ra dữ liệu cần xóa
    const newTasks = tasks.filter((current) => current.id !== idDel)
    setTasks(newTasks)
  }

  const editTask = (taskUpdate, idEdit) => {
    console.log("taskUpdate", taskUpdate);
    let updateArr = []
    tasks.forEach((current) => {
      if (current.id === idEdit) {
        updateArr.push({ id: idEdit, task: taskUpdate, isComplete: false })
      } else {
        updateArr.push(current);
      }
    })
    setTasks(updateArr);
    setNewTask("");
    setEditStatus(false);
  }
  
  const completeTask = (idEdit) => {  
    let updateArr = [];
    tasks.forEach((current) => {
      if (current.id === idEdit) {
        updateArr.push({ id: idEdit, task: current.task, isComplete: true });
      } else {
        updateArr.push(current);
      }
    });
    setTasks(updateArr);
    setNewTask("");
    setEditStatus(false);
  };

  const handleEdit = (idE, taskEdit) => { // lấy giá trị nhập từ ô input 
    idEdit = idE;
    setEditStatus(true);
    setNewTask(taskEdit);
    setEditStatus(true);
  };

  const btn = editStatus ? (
    <button type='button' className='btn btn-primary mx-3' onClick={() => editTask(newTask, idEdit)}>Update</button>
  ) : (
    <button type='button' className='btn btn-primary mx-3' onClick={addTask}>Add</button>
  )

  return (
    <div className="App my-4">
      <div>
        <input type={'text'} value={newTask} onChange={(e) => setNewTask(e.target.value)} ></input>
        {btn}
      </div>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Task</th>
            <th>Status</th>
            <th colSpan="3">Action</th>

          </tr>
        </thead>
        <tbody>
          {tasks.map((current) =>
            <tr key={current.id}>
              <td>{current.id}</td>
              <td>{current.task}</td>
              <td>{current.isComplete ? (<i class="bi bi-check2-all"></i>) : (<i class="bi bi-hourglass"></i>)}</td>
              <td><button className='btn btn-primary' onClick={() => handleEdit(current.id, current.task)}>Edit</button></td>
              <td><button className='btn btn-danger' onClick={() => deleteTask(current.id)}>Delete</button></td>
              <td><button className='btn btn-success' onClick={() => completeTask(current.id)}>Complete</button></td>
            </tr>
          )}

        </tbody>
      </table>
    </div>
  );
}

export default App;
