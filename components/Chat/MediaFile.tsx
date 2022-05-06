import React from 'react'

const MediaFile: React.FC<{ url: string }> = ({ url }) => {
  const isAudio =
    (!url.startsWith('data:') && url.search(/.mp3|.m4a/) !== -1) ||
    url.startsWith('data:audio')
  const isVideo =
    (!url.startsWith('data:') &&
      url.search(/.mp4|.mkv|.avi|.flv|.mepg/) !== -1) ||
    url.startsWith('data:video')
  const isImage =
    (!url.startsWith('data:') &&
      url.search(/.jpeg|.jpg|.png|.ico|.svg/) !== -1) ||
    url.startsWith('data:image')
  // console.log(url.startsWith('data:audio'), url.search(/.mp3|.m4a/))
  console.log(isAudio, isVideo, isImage)
  console.log(url)
  if (isAudio) {
    return (
      <audio className="max-w-[250px]" controls={true}>
        <source src={url} type="audio/mpeg" />
        <source src={url} type="audio/mp3" />
        Your browser does
      </audio>
    )
  } else if (isVideo) {
    return (
      <video src={url} className="max-w-[278px]" controls={true} playsInline />
    )
  } else if (isImage) {
    return <img src={url} className="max-w-[250px]" />
  } else {
    return (
      <p className="text-bold max-w-[90%] text-red-500">Not a media File!</p>
    )
  }
}

export default MediaFile
