import React, { useState, useEffect, useRef } from 'react';

function TodoForm(props) {
  const [input, setInput] = useState(props.edit ? props.edit.value : '');
  const [name_of_Task, setName] = useState(props.edit ? props.edit.value : '');
  const [description, setDescription] = useState(props.edit ? props.edit.value : '');
  const [location, setLocation] = useState(props.edit ? props.edit.value : '');
  const [deadline, setDeadline] = useState(props.edit ? props.edit.value : '');

  const inputRef = useRef(null);
  const nameRef = useRef(null);
  const descrRref = useRef(null);
  const locationRef = useRef(null);
  const deadlineRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  const handleSubmit = e => {
    e.preventDefault();
    const input_variables = {
      input, 
    };
    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      text: input
    });
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className='todo-form'>
      {props.edit ? (
        <>
          <input
            placeholder='Edit task information'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            name='text'
            ref={inputRef}
            className='todo-input edit'
          />
          <button onClick={handleSubmit} className='todo-button edit'>
            Update
          </button>
        </>
      ) : (
        <>
          <input
            placeholder='Add task'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            name='text'
            className='todo-input'
            ref={inputRef}
          />

          <div></div>
          <input
            placeholder='Title'
            value={name_of_Task}
            onChange={(e) => setName(e.target.value)}
            name='title'
            className='todo-input'
            ref={nameRef}
          />
          <div></div>
          <input
            placeholder='Description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            name='description'
            className='todo-input'
            ref={descrRref}
          />
          <div></div>
          <input
            placeholder='Location'
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            name='location'
            className='todo-input'
            ref={locationRef}
          />
          <div></div>
          <input
            placeholder='Deadline'
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            name='deadline'
            className='todo-input'
            ref={deadlineRef}
          />
          <button onClick={handleSubmit} className='todo-button'>
            Add
          </button>
        </>
      )}
    </form>
  );
}

export default TodoForm;
