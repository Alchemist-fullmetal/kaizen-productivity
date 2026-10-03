import { useMemo, useState } from 'react'

type Task = { id: number; title: string; done: boolean; tag: string }

const initial: Task[] = [
  { id: 1, title: 'Solve two DSA problems', done: false, tag: 'Coding' },
  { id: 2, title: 'Review project architecture notes', done: true, tag: 'Build' },
  { id: 3, title: 'Read 20 minutes', done: false, tag: 'Learn' },
]

export default function App() {
  const [tasks, setTasks] = useState(initial)
  const [title, setTitle] = useState('')
  const [minutes, setMinutes] = useState(25)
  const [coach, setCoach] = useState('Pick one meaningful task and make it smaller than your resistance.')

  const completed = useMemo(() => tasks.filter(t => t.done).length, [tasks])

  function addTask(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) return
    setTasks([{id:Date.now(),title:title.trim(),done:false,tag:'Focus'}, ...tasks])
    setTitle('')
  }

  function toggle(id:number){
    setTasks(tasks.map(t => t.id===id ? {...t,done:!t.done}:t))
  }

  function generateCoach(){
    const remaining = tasks.filter(t => !t.done)
    setCoach(
      remaining.length
        ? `Start with “${remaining[0].title}”. Work for ${minutes} minutes, then decide whether to continue.`
        : 'Everything on the list is complete. Capture what worked before adding more.'
    )
  }

  return (
    <main>
      <aside>
        <div className="brand">KAIZEN</div>
        <nav><button className="active">Today</button><button>Tasks</button><button>Focus</button><button>Insights</button></nav>
        <div className="quote">Small improvements compound.</div>
      </aside>
      <section className="content">
        <header>
          <div><span className="muted">Personal productivity workspace</span><h1>Make today lighter.</h1></div>
          <div className="progress"><strong>{completed}/{tasks.length}</strong><span>completed</span></div>
        </header>

        <div className="grid">
          <section className="panel tasks">
            <div className="panelhead"><h2>Today</h2><span>{tasks.length} tasks</span></div>
            <form onSubmit={addTask} className="add">
              <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Add a focused task..." />
              <button>Add</button>
            </form>
            <div className="tasklist">
              {tasks.map(t => <button key={t.id} className={`task ${t.done?'done':''}`} onClick={()=>toggle(t.id)}>
                <span className="check">{t.done?'✓':''}</span>
                <span className="taskcopy"><strong>{t.title}</strong><small>{t.tag}</small></span>
              </button>)}
            </div>
          </section>

          <section className="panel focus">
            <div className="panelhead"><h2>Focus timer</h2><span>deep work</span></div>
            <div className="timer">{minutes}:00</div>
            <input type="range" min="10" max="60" step="5" value={minutes} onChange={e=>setMinutes(Number(e.target.value))}/>
            <div className="rangeLabels"><span>10m</span><span>60m</span></div>
          </section>

          <section className="panel coach">
            <div className="panelhead"><h2>AI-style coach</h2><span>local demo</span></div>
            <p>{coach}</p>
            <button onClick={generateCoach}>Generate next step</button>
          </section>
        </div>
      </section>
    </main>
  )
}
