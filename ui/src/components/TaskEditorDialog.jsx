import { useState } from "react"
import { Button, ButtonGroup, DialogTitle, Input, Modal, ModalClose, ModalDialog, Snackbar, Textarea } from "@mui/joy"
import { HourglassBottom, HourglassTop } from "@mui/icons-material"
import { useTaskEdit } from "./TaskEditContext"

function TaskContent({task, setTask}) {
    return (
        <Input required autoFocus type="text" className="w-full p-1 border rounded"  placeholder="title"
        value={task.content} onChange={(e) => setTask({...task, content:e.target.value})} />
    )
}

function TaskTime({task, setTask}) {
    return (
        <div className="w-full flex justify-between gap-2">
            <Input type="number" value={task.est} onChange={(e) => setTask({...task, est: parseInt(e.target.value)})}
            startDecorator={<HourglassTop />}
            endDecorator={"Minutes"} />
            <Input type="number" value={task.act} onChange={(e) => setTask({...task, act: parseInt(e.target.value)})}
            startDecorator={<HourglassBottom />}
            endDecorator={"Minutes"} />
        </div>
    )
}

function TaskStatus({task, setTask}) {
    const status = ["TODO", "DONE", "DISCARD"]
    return (
        <ButtonGroup aria-label="outlined button group" className="w-full">
        {
            status.map(s => (
                <Button key={s} onClick={() => setTask({...task,status: s})}
                color={s === task.status ? 'success' : ''}
                >
                    {s}
                </Button>
            ))
        }
        </ButtonGroup>
    )
}

function TaskComments({task, setTask}) {
    return (
        <Textarea className="w-full" value={task.comments}  placeholder="comments"
        onChange={(e) => setTask({...task, comments: e.target.value})} minRows={10} />
    )
}


export default function TaskEditorDialog({task, setTask, layout, setLayout, save}) {
    const [edit, setEdit] = useTaskEdit()
    const [notif, setNotif] = useState({
        open: false,
        msg: "",
        color: "primary",
        duration: 3000,
    })
    const resetNotif = () => {
        setNotif({
            open: false,
            msg: "",
            color: "primary",
            duration: 3000,
        })
    }

    const close = () => { 
        resetNotif()
        setLayout(false)
    }
    const submit = (e) => {
        e.preventDefault()

        save().then(res => {
            if (res.data.success) {
                setNotif({
                    msg:   "Save successfully!",
                    open:  true,
                    color: 'success',
                    duration: 3000,
                })
                setEdit(edit + 1)
                setLayout(false)
            } else {
                setNotif({
                    open:  true,
                    msg:   res.data.msg, 
                    color: 'danger',
                    duration: 5000,
                })
            }
        })
        console.log(typeof(setday))
    }

    return (
        <div>
            <Modal open={layout} onClose={close}>
                <ModalDialog>
                    <DialogTitle >{task.day}</DialogTitle>
                    <ModalClose />
                    <form className="px-4 flex flex-col gap-2 items-center" onSubmit={submit} >
                        <TaskContent task={task} setTask={setTask} />
                        <TaskTime  task={task} setTask={setTask} />
                        <TaskStatus task={task} setTask={setTask} />
                        <TaskComments task={task} setTask={setTask} />
                        <Button className="w-full bg-blue-400 hover:bg-blue-500 rounded-lg" type='submit' >save</Button>
                    </form>
                </ModalDialog>
            </Modal>

            <Snackbar anchorOrigin={{vertical:'top', horizontal:'center'}} open={notif.open} onClose={() => resetNotif()}
                color={notif.color} autoHideDuration={notif.duration}
            >
                {notif.msg}
            </Snackbar>
        </div>
    )
}