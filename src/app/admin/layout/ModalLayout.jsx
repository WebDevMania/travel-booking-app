import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'

const ModalLayout = ({
    isCreating = false,
    document,
    handleHideModal,
    children
}) => {
    return (
        <div className="z-9999 fixed backdrop-blur top-0 left-0 min-h-full w-full shadow-2xl">
            <div className="bg-slate-100 w-1/4 rounded-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pb-8">
                <div className="p-4 border-b border-slate-500 flex items-center justify-between">
                    <h3 className="font-semibold text-2xl">
                        {isCreating ? "Create " : "Update "}
                        {document}
                    </h3>
                    <AiOutlineClose
                        onClick={handleHideModal}
                        className="cursor-pointer"
                        size={20}
                    />
                </div>
                <>
                    {children}
                </>
            </div>
        </div>
    )
}

export default ModalLayout