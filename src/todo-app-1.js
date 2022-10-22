import { useEffect, useState } from 'react'
import './styles/todo-app-1.css'

const TodoApp1 = props => {
    const [todoList, updateList] = useState(new Map())
    const [todo, onSelect] = useState(Item())

    useEffect(() => {
        let tempList = new Map()
        props.initialTodo.forEach(todo => tempList.set(todo.id, todo))
        updateList(tempList)
    }, [props.initialTodo])

    const handleClick = (action, todo) => {
        let tempList = new Map(todoList)
        if (action === 'SET') {
            tempList.set(todo.id, todo)
            updateList(tempList)
        } else if (action === 'DELETE') {
            tempList.delete(todo.id)
            updateList(tempList)
        }
        onSelect(action === 'EDIT' ? todo : Item())
    }

    let listItems = []
    let index = 1
    for (const key of todoList.keys()) {
        let item = todoList.get(key)
        listItems.push(<ListItem key={key}
            todo={item}
            index={index++}
            onClick={handleClick}
            isActive={item.id === todo.id} />)
    }

    return (<div className='app1'>
        <label className='title'>xTodo App</label><br /><br />
        <Form onSubmit={handleClick} todo={todo} />
        <div className='Todo-list'>{listItems}</div>
    </div>)
}

const ListItem = props => (<div>
    <li className='List-item'>
        <label className={'Item-thumb' + (props.isActive ? ' Active-item' : '')}
            onClick={props.onClick}>
            {props.isActive ? '↩' : props.index}
        </label>
        <input type='text' className='Item-content'
            readOnly value={props.todo.value} />
        <div className='Item-controls'>
            <button className='Action-btn Edit'
                onClick={() => props.onClick('EDIT', props.todo)}>
                ✍🏻</button>
            <button className='Action-btn Delete'
                onClick={() => props.onClick('DELETE', props.todo)}>
                ✖</button>
        </div>
    </li>
</div>)

const Form = props => {
    const [action, setAction] = useState('ADD')
    const [input, setInput] = useState('')
    const [id, setId] = useState(0)

    const handleClick = event => {
        event.preventDefault()
        if (input !== '') {
            let xId = id
            if (action === 'ADD') {
                setId(id + 1)
            } else {
                xId = props.todo.id
            }
            props.onSubmit('SET', new Item(xId, input))
            setInput('')
        }
    }

    useEffect(() => {
        setInput(props.todo.value)
        setAction(props.todo.value === '' ? 'ADD' : 'UPDATE')
    }, [props.todo])

    return (<form className='Input-form'>
        <input className='Input-element'
            type='search' autoFocus
            placeholder='What to do...?'
            value={input}
            onChange={e => setInput(e.target.value)} />
        <div className='Item-controls'>
            <button className='Action-btn Add' onClick={handleClick}>
                {action}
            </button>
        </div>
    </form>)
}

const Item = (id = '', value = '') => ({ id, value })

export default function App1() {
    return (<TodoApp1 initialTodo={[
        new Item(1001, 'Submit ASP.NET assignment tonight before it due.'),
        new Item(1002, 'Watch recorded lecture videos.'),
        new Item(1003, 'Get milk from walmart.'),
        new Item(1004, 'Start Data Structure after dinner.'),
        new Item(1005, 'Delete node_modules after submitting assignment.')
    ]} />)
}
