import { Fullscreen, FullscreenExit } from "@mui/icons-material"
import { DialogTitle, IconButton, Modal, ModalClose, ModalDialog, Snackbar } from "@mui/joy"
import React, { useEffect, useState } from "react"

/* 
    编辑器组件，主要包含2个部分：
    1. 对话框
    2. 保存结果提示框

    - 对话框，上中下3栏布局：
    1. 头部。左侧为编辑器标题，右侧是关闭按钮
    2. 主体。文本编辑框，溢出时滚动
    3. 底部。工具栏。左侧为常用操作，如全屏，收缩；右侧为保存按钮

    - 结果提示框 (3s自动消失)
    1. 成功
    2. 失败，错误信息

*/



export default function Editor(props) {
    const {title, data, setData, layout, setLayout, quit, save} = props
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

    const onSubmit = () => {
        save().then(res => {
            if (!res.data.success) {
                setNotif({
                    open:  true,
                    msg:   res.data.msg, 
                    color: 'danger',
                })
            } else {
                setNotif({
                    msg:   "Save successfully!",
                    open:  true,
                    color: 'success',
                })
            }
        })
    }

    const onClose = () => {
        resetNotif()
        setLayout(undefined) 
        quit()
    }

    const onKeyDown = (e) => {
        if (e.ctrlKey || e.metaKey) {
            console.log(e)
            if (e.key == 's') {
                e.preventDefault()
                onSubmit()
            }
        }
    }

    const changeLayout = () => {
        if (layout === undefined) return
        if (layout === 'center') {
            setLayout('full')
            return
        }
        setLayout('center')
    }

    useEffect(() => {
        if (layout === undefined) {
            document.removeEventListener("keydown", onKeyDown)
        } else {
            document.addEventListener("keydown", onKeyDown)
        }
        return () => {
            document.removeEventListener("keydown", onKeyDown)
        }
    }, [layout, data])

    return (
        <>
        <Modal open={!!layout} onClose={onClose}>
            <ModalDialog className="flex flex-col items-center px-2 min-w-80 w-1/2">
                { layout === 'center' &&  <DialogTitle >{title}</DialogTitle>}
                { layout === 'center' &&  <ModalClose />}

                <div className="w-full border rounded-lg border-gray-300 px-2 gap">
                    <textarea className="w-full h-full min-h-[300px] my-4 text-base resize-none overflow-x-hidden overflow-y-auto bg-transparent outline-none"
                        value={data} onChange={(e)=>setData(e.target.value)} />
                    <div className="flex justify-between items-center w-full border-t h-8 py-4">
                        <div className="flex">
                            <IconButton onClick={changeLayout}>
                                {layout === 'center' ? <Fullscreen /> : <FullscreenExit />}
                            </IconButton>
                        </div>
                        <div className="flex justify-end">
                            <button className="px-2 border rounded-xl border-green-300 bg-green-300 hover:bg-green-400" onClick={onSubmit} >save</button>
                        </div>
                    </div>
                </div>

            </ModalDialog>
        </Modal> 
        <Snackbar anchorOrigin={{vertical: 'top', horizontal:'center'}} open={notif.open} onClose={() => resetNotif()}
            color={notif.color} autoHideDuration={notif.duration}>{notif.msg}</Snackbar>
        </>
    )
}