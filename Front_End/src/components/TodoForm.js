import React, { useState, useEffect, useRef } from 'react';

function TodoForm(props) {
  const [input, setInput] = useState(props.edit ? props.edit.value : '');
  const [description, setDescription] = useState(props.edit ? props.edit.value : '');
  const [location, setLocation] = useState(props.edit ? props.edit.value : '');
  const [deadline, setDeadline] = useState(props.edit ? props.edit.value : '');

  const inputRef = useRef(null);
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
      description,
      location,
      deadline
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
          <form action="/action_page.php">
          <input
            type="text"
            placeholder='Task Title'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            name='title'
            className='todo-input mr-20'
            ref={inputRef}
          />

          
          <input
            type="text"
            placeholder='Description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            name='description'
            className='todo-input mr-20'
            ref={descrRref}
          />
          </form>
          <div></div>
          <input
            type="text"
            placeholder='Location'
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            name='location'
            className='todo-input mr-20'
            ref={locationRef}
          />
          <div></div>
          <input
            type="datetime-local"
            placeholder='Deadline'
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            name='deadline'
            className='todo-input mr-5'
            ref={deadlineRef}
          />
          
          <button type="submit" onClick={handleSubmit} className='todo-button'>
            Add
          </button>
        </>
      )}
    </form>
  );
}

export default TodoForm;
