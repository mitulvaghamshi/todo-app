import { useEffect, useState } from 'react'
import './styles/todo-app-2.css'

const TodoApp2 = props => {
  const [input, setInput] = useState('')
  const [todo, setTodo] = useState(Item())
  const [list, setList] = useState(new Map())

  useEffect(() => setInput(todo.value), [todo])

  useEffect(() => {
    let temp = new Map()
    props.defaults.forEach(value => {
      const id = getId()
      temp.set(id, Item(id, value))
    })
    setList(temp)
  }, [props.defaults])

  const deleteAll = event => {
    event.preventDefault()
    setList(new Map())
  }

  const onDelete = id => {
    let temp = new Map(list)
    temp.delete(id)
    setList(temp)
  }

  const onSave = event => {
    event.preventDefault()
    if (input !== '') {
      const temp = new Map(list)
      const id = todo && todo.value !== '' ? todo.id : getId()
      temp.set(id, Item(id, input))
      setList(temp)
      setTodo(Item())
    }
  }

  const items = []
  let index = 0
  for (const key of list.keys()) {
    const item = list.get(key)
    items.push(<li key={key}>
      <label className='btn'>{++index}</label>
      <label className='content'>{item.value}</label>
      <div className='inline'>
        <button className='btn'
          onClick={() => setTodo(item)}>Edit</button>
        <button className='btn'
          onClick={() => onDelete(key)}>Delete</button>
      </div>
    </li>)
  }

  return (<div className='app2'>
    <label className='title'>iTodo App</label><br /><br />
    <form>
      <input type='text' value={input} className='input'
        onChange={e => setInput(e.target.value)} />
      <button className='inline btn' onClick={onSave}>
        {todo.value === '' ? 'ADD' : 'SAVE'}</button>
      <button className='inline btn' onClick={deleteAll}>
        Delete All</button>
    </form>
    <div className='list'>{items}</div>
  </div>)
}

const Item = (id = '', value = '') => ({ id, value })

// Maximum 1000 unique items.
const getId = () => Math.round(Math.random() * 1000)

export default function App2() {
  return (<TodoApp2 defaults={[
    'Pay Credit Card Bill',
    'Goto LCBO this evening',
    'Comlete Netflix series',
    'Order Pizza from Dominos',
    'Continue JavaScript Youtube series',
  ]} />)
}
