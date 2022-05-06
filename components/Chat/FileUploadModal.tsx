import { addDoc, collection } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import React, { ChangeEvent, useRef, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { currentChatState, uploadModalState, userState } from '../../atoms'
import { storage } from '../../firebase.config'
import { FilesState } from '../../types'
import { sendMessage } from '../../utils/chats'
import MediaFile from './MediaFile'

const FileUploadModal = () => {
  const initialState = {
    files: [],
    previews: [],
  }
  const [selectedFiles, setSelectedFiles] = useState<FilesState>(initialState)
  const [showUploadModal, setShowUploadModal] = useRecoilState(uploadModalState)
  const inputRef = useRef<HTMLInputElement>(null)
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      files.forEach((file) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = function (this: FileReader, e) {
          setSelectedFiles((p) => ({
            files: [...p.files, file],
            previews: this.result
              ? [...p.previews, this.result.toString()]
              : [...p.previews],
          }))
        }
      })
    }
  }

  const currentChat = useRecoilValue(currentChatState)
  const user = useRecoilValue(userState)

  const uploadToStogare = async () => {
    if (!selectedFiles.files.length) return alert('Please select files')
    let urls: string[] = []
    for (const file of selectedFiles.files) {
      const storageRef = ref(storage, `${currentChat?.id}/${file.name}`)
      const snapshot = await uploadBytes(storageRef, file)
      const url = await getDownloadURL(snapshot.ref)
      urls.push(url)
    }

    if (currentChat && user?.email) {
      await sendMessage(currentChat.id, user, `Sent you files`, urls)
    }
  }
  return (
    <div className="flex-col-between box-shadow absolute max-h-[50vh] min-h-[40%] min-w-[80%] max-w-md space-y-4 rounded-lg bg-white p-3">
      FileUploadModal
      <div className="flex-row-center max-h-[30vh] gap-2 space-x-3 overflow-x-auto flex-wrap scrollbar-none">
        {selectedFiles?.previews.map((p, idx) => (
          <MediaFile key={idx} url={p} />
        ))}
      </div>
      <input
        type="file"
        hidden
        ref={inputRef}
        className=" outline-none before:bg-black after:bg-slate-900"
        multiple
        onChange={handleFileChange}
      />
      <div className="flex-col-center w-full items-end space-y-2">
        <div className="flex-row-around w-full">
          <button
            className="button bg-red-500"
            onClick={() => {
              setSelectedFiles(initialState)
              setShowUploadModal(false)
            }}
          >
            Cancel
          </button>
          <button
            className="button bg-purple-500"
            onClick={() => setSelectedFiles(initialState)}
          >
            Clear All
          </button>
          <button
            className="button"
            onClick={(e) => {
              e.preventDefault()
              inputRef && inputRef?.current?.click()
            }}
          >
            {selectedFiles.files.length > 1 ? 'Add More Files' : 'Select Files'}
          </button>
        </div>
        <button
          className="button bg-emerald-500 text-base"
          onClick={uploadToStogare}
        >
          Upload
        </button>
      </div>
    </div>
  )
}

export default FileUploadModal
